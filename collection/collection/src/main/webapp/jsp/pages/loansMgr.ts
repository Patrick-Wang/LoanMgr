///<reference path="pages.ts"/>
///<reference path="../pageSidebar.ts"/>
module pages{
    class LoansMgr extends PageImpl{
        static ins = new LoansMgr(PageType.loansMgr);
        ecType:collection.protocol.EntrustedCaseType;
        ecs:collection.protocol.EC[];
        private isAssigner:boolean = false;
        private isOwner:boolean = false;
        constructor(page:pages.PageType) {
            super(page);
            this.find(".dowebok input").labelauty();
            route.router.register(new route.Receiver("loansMgr", (e:route.Event)=> {
                switch (e.id) {
                    case route.MSG.CONSOLE_ASSIGNER_UNRESPMSGS:
                        this.isAssigner = true;
                        break;
                    case route.MSG.CONSOLE_OWNER_UNREADMSGS:
                        this.isOwner = true;
                        break;
                    case route.MSG.LOANMGR_GET_QOPT:
                        return this.getQOpt();
                        break;
                    case route.MSG.LOANMGR_GET_TYPE:
                        return this.find(".dowebok input:checked").attr("myid");
                }
            }));
        }

        private qOpt(id:string):string{
            let optVal : string =  this.find("#" + id).val();
            if (optVal != undefined && optVal != "" && optVal != "none" && optVal.indexOf("____") < 0){
                return optVal;
            }
            return undefined;
        }

        private getQOpt(){
            let opt:collection.protocol.QueryOption = {};
            opt.name = this.qOpt("qName");
            opt.code = this.qOpt("qCode");
            opt.PIN = this.qOpt("qPIN");
            opt.wwjg = this.qOpt("qWwjg");
            opt.wwrq = this.qOpt("qDate");
            opt.wwzt = this.qOpt("qStatus");
            return opt;
        }

        protected onRefresh():void {
            let ecType = this.find(".dowebok input:checked").attr("myid");
            let opt:collection.protocol.QueryOption = this.getQOpt();

            collection.EntrustedCase.search(ecType, opt).done((ecs:collection.protocol.EC[])=> {
                this.ecs = ecs;
                this.ecType = ecType;
                this.refreshLoans(this.ecType);
            });
        }

        protected onShown(){
            this.adjustWidth("lm-table", this.find("#lm-tableTable"));
        }

        private refreshLoans(type:any):void {
            let tableAssist:JQTable.JQGridAssistant = pages.JQGridAssistantFactory.createTableAssist("lm-table", type);
            let loans = [];
            let isLinked:any = {};
            for (let i = 0; i < this.ecs.length; ++i) {
                if (this.ecs[i].loan[2] != "" && this.ecs[i].loan[2] != null){
                    if (this.isOwner && this.ecs[i].owner == context.userName ||
                        this.isAssigner && this.ecs[i].assignee == context.userName){
                        isLinked[this.ecs[i].loan[0]] = this.ecs[i].loan[2];
                    }
                }
                loans.push(this.ecs[i].loan);
            }
            let lastSel;
            this.find("#lm-tableTable").jqGrid(
                tableAssist.decorate({
                    data: tableAssist.getDataWithId(loans),
                    datatype: "local",
                    multiselect: true,
                    drag: false,
                    resize: false,
                    autowidth: true,
                    viewrecords: true,
                    sortable: true,
                    height: '100%',
                    shrinkToFit: false,
                    rowNum: 10,
                    autoScroll: true,
                    pager: '#lm-tablePager',
                    onCellSelect:(rowid,iCol,cellcontent,e)=>{
                        if (iCol == 1){
                            if (isLinked[rowid]){
                                alert(rowid + " " +  iCol);
                            }
                        }
                    },
                    onSelectRow: (id)=>{
                        if(id && id!==lastSel){
                            let ids = [].concat(this.find("#lm-tableTable").jqGrid('getGridParam', 'selarrrow'));
                            if (ids.indexOf(lastSel) >= 0){
                                this.find("#lm-tableTable").setSelection(lastSel);
                            }
                            lastSel=id;
                        }
                    },
                    onSortCol:(index,iCol,sortorder)=>{
                        setTimeout(()=>{
                            let rids = $("#lm-tableTable").getDataIDs();
                            for (let i =0; i < rids.length; ++i){
                                if (undefined != isLinked[rids[i]]) {
                                    $("#lm-tableTable").setCell(rids[i], 1, "<div style='color:blue;cursor:pointer' >" + isLinked[rids[i]] + "</div>");
                                }
                            }
                        }, 0);
                    },
                    onPaging:(btn)=>{
                        setTimeout(()=>{
                            let rids = $("#lm-tableTable").getDataIDs();
                            for (let i =0; i < rids.length; ++i){
                                if (undefined != isLinked[rids[i]]) {
                                    $("#lm-tableTable").setCell(rids[i], 1, "<div style='color:blue;cursor:pointer' >" + isLinked[rids[i]] + "</div>");
                                }
                            }
                        }, 0)
                        lastSel = undefined;
                    }
                }));
            this.find("th input[role='checkbox']").hide();
            let rids = this.find("#lm-tableTable").getDataIDs();
            for (let i =0; i < rids.length; ++i){
                if (undefined != isLinked[rids[i]]) {
                    this.find("#lm-tableTable").setCell(rids[i], 1, "<div style='color:blue;cursor:pointer' >" + isLinked[rids[i]] + "</div>");
                }
            }
            this.adjustWidth("lm-table", this.find("#lm-tableTable"));
        }

        private adjustWidth(name:string, jqgrid:any){
            if (this.find("#" + name).width() != this.find("#" + name).children().eq(0).width()){
                jqgrid.setGridWidth(this.find("#" + name).width() );
            }
        }
    }
}