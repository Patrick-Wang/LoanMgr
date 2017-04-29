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

            route.router.register(new route.AnonymousReceiver((e:route.Event)=> {
                switch (e.id) {
                    case route.MSG.CONSOLE_ASSIGNER_UNRESPMSGS:
                        this.isAssigner = true;
                        break;
                    case route.MSG.CONSOLE_OWNER_UNREADMSGS:
                        this.isOwner = true;
                        break;
                }
            }));
        }

        protected onRefresh():void {
            let ecType = this.find(".dowebok input:checked").attr("myid");
            let opt:collection.protocol.QueryOption = {};
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

            this.find("#lm-tableTable").jqGrid(
                tableAssist.decorate({
                    data: tableAssist.getDataWithId(loans),
                    datatype: "local",
                    multiselect: false,
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
                        }, 0);
                    }
                }));
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