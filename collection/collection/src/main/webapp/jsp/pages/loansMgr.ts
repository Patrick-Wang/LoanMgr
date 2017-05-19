///<reference path="pages.ts"/>
///<reference path="../pageSidebar.ts"/>
module pages{
    export class LoansMgr extends PageImpl{
        static ins = new LoansMgr(PageType.loansMgr);
        ecType:collection.protocol.EntrustedCaseType;
        ecs:collection.protocol.EC[];
       // requestEvent:route.Event;
        tableAssist:JQTable.JQGridAssistant;
        private isAssigner:boolean = false;
        private isOwner:boolean = false;
        private isManager:boolean = false;
        private wwjgs:string[] = [];
        constructor(page:pages.PageType) {
            super(page);
            this.find(".dowebok input").labelauty();
            route.router.register(new route.Receiver(PageUtil.getPageId(this.page), (e:route.Event)=> {
                switch (e.id) {
                    case route.MSG.CONSOLE_ASSIGNER_UNRESPMSGS:
                        this.isAssigner = true;
                        this.find(".dowebok:eq(1) input:eq(0)").prop("checked", true).parent().show();
                        this.find(".dowebok:eq(1) input:eq(2)").parent().show();
                        break;
                    case route.MSG.CONSOLE_OWNER_UNREADMSGS:
                        this.find(".dowebok:eq(1) input:eq(1)").prop("checked", true).parent().show();
                        this.find(".dowebok:eq(1) input:eq(2)").parent().show();
                        this.isOwner = true;
                        break;
                    case route.MSG.CONSOLE_IS_MANAGER:
                        this.find(".dowebok:eq(1) input:eq(2)").prop("checked", true);
                        this.isManager = true;
                    case route.MSG.LOANMGR_GET_QOPT:
                        return this.getQOpt();
                    case route.MSG.LOANMGR_GET_SELECTED:
                       return {
                           type:this.ecType,
                           ids:this.find("#lm-tableTable").jqGrid('getGridParam', 'selarrrow')
                       };
                    case route.MSG.LOANMGR_GET_TYPE:
                        return this.find(".dowebok:eq(0) input:checked").attr("myid");
                    //case route.MSG.EC_SELECT_REQUEST:
                    //    this.requestEvent = e;
                    //    break;
                }
            }));

            this.find(".dowebok:eq(0) input").click(()=>{
                let ecType = this.find(".dowebok:eq(0) input:checked").attr("myid");
                switch(parseInt(ecType)){
                    case collection.protocol.EntrustedCaseType.carLoan:
                        this.find("#qCode").prev().text("车牌号");
                        break;
                    case collection.protocol.EntrustedCaseType.creditCard:
                        this.find("#qCode").prev().text("卡号");
                        break;
                    case collection.protocol.EntrustedCaseType.creditLoan:
                        this.find("#qCode").prev().text("客户号");
                        break;
                }
                this.refresh();
            });

            this.find(".dowebok:eq(1) input").click(()=>{
                let id = this.find(".dowebok:eq(1) input:checked").attr("myid");
                this.refresh();
            });

            //this.find(".buttons-preview:eq(1) a:eq(0)").click(()=>{
            //    let ids = [].concat(this.find("#lm-tableTable").jqGrid('getGridParam', 'selarrrow'));
            //    if (ids.length == 0){
            //        Toast.warning("请选择委案");
            //    }else{
            //        $(this.ecs).each((i, e)=>{
            //            if (e.loan[0] == ids[0]){
            //                route.router.from(PageUtil.getPageId(this.page)).to(this.requestEvent.from).send(route.MSG.EC_SELECT_RESPONSE, e.managerId);
            //                this.requestEvent = undefined;
            //                return false;
            //            }
            //        });
            //    }
            //    return false;
            //});


            //this.find(".buttons-preview:eq(1) a:eq(1)").click(()=>{
            //    route.router.from(PageUtil.getPageId(this.page)).to(this.requestEvent.from).send(route.MSG.EC_SELECT_RESPONSE);
            //    return false;
            //});
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
            //if (this.requestEvent){
            //    this.find(".buttons-preview").hide();
            //    this.find(".buttons-preview:eq(1)").show();
            //}else{
            //    this.find(".buttons-preview").hide();
            //    this.find(".buttons-preview:eq(0)").show();
            //}

            let ecType = this.find(".dowebok:eq(0) input:checked").attr("myid");
            let opt:collection.protocol.QueryOption = this.getQOpt();

            collection.EntrustedCase.search(ecType, opt).done((ecs:collection.protocol.EC[])=> {
                this.ecs = ecs;
                this.ecType = ecType;


                let index = collection.protocol.getTitles(this.ecType).indexOf("委外机构");
                let wwjgChanged = false;
                $(this.ecs).each((i, e:collection.protocol.EC) =>{
                    if (e.loan[index + 1] && this.wwjgs.indexOf(e.loan[index + 1]) < 0){
                        this.wwjgs.push(e.loan[index + 1]);
                        wwjgChanged = true;
                    }
                });

                if (wwjgChanged){
                    this.updateWwjgs();
                }

                this.refreshLoans(this.ecType);
            });
        }

        protected onShown(){
            //if (this.requestEvent){
            //    this.find(".buttons-preview").hide();
            //    this.find(".buttons-preview:eq(1)").show();
            //}else{
            //    this.find(".buttons-preview").hide();
            //    this.find(".buttons-preview:eq(0)").show();
            //}
            this.adjustWidth("lm-table", this.find("#lm-tableTable"));
        }

        getEcByRid(rid:string):collection.protocol.EC{
            for (let i = 0; i < this.ecs.length; ++i){
               if (this.ecs[i].loan[0] == rid){
                   return this.ecs[i];
               }
            }
            return undefined;
        }

        onClickLink(rid:string){
            let ec = this.getEcByRid(rid);
            route.router.to(PageUtil.getPageId(PageType.loansDetail)).send(route.MSG.EC_DETAIL_ECINFO, {
                ec : ec,
                ecType : this.ecType
            });
            sidebar.switchPage(PageType.loansDetail);
        }

        private refreshLoans(type:any):void {
            this.tableAssist = pages.JQGridAssistantFactory.createTableAssist("lm-table", type);
            let loans = [];
            let isLinked:any = {};
            let id = this.find(".dowebok:eq(1) input:checked").attr("myid");
            for (let i = 0; i < this.ecs.length; ++i) {
                if (this.ecs[i].loan[1]){
                    if (this.isManager ||
                        this.isOwner && this.ecs[i].owner == context.userName ||
                        this.isAssigner && this.ecs[i].assignee == context.userName){
                        isLinked[this.ecs[i].loan[0]] = this.ecs[i].loan[1];
                    }
                }
                if (id == 0){
                    if (this.ecs[i].assignee == context.userName){
                        loans.push(this.ecs[i].loan);
                    }
                }else if (id == 1){
                    if (this.ecs[i].owner == context.userName){
                        loans.push(this.ecs[i].loan);
                    }
                }else{
                    loans.push(this.ecs[i].loan);
                }
            }

            let base = this.find("#lm-export-Btn").length > 0 ? 1 : 0;

            this.find("#lm-tableTable").jqGrid(
                this.tableAssist.decorate({
                    data: this.tableAssist.getDataWithId(loans),
                    datatype: "local",
                    drag: false,
                    resize: false,
                    autowidth: true,
                    viewrecords: true,
                    sortable: true,
                    height: '100%',
                    shrinkToFit: false,
                    rowNum: 10,
                    rowList:[10,20,50],
                    autoScroll: true,
                    multiselect: base > 0,
                    pager: '#lm-tablePager',
                    //onCellSelect:(rowid,iCol,cellcontent,e)=>{
                    //    if (iCol == 1){
                    //        if (isLinked[rowid]){
                    //            alert(rowid + " " +  iCol);
                    //        }
                    //    }
                    //},
                    onSortCol:(index,iCol,sortorder)=>{
                        setTimeout(()=>{
                            let rids = $("#lm-tableTable").getDataIDs();
                            for (let i =0; i < rids.length; ++i){
                                if (undefined != isLinked[rids[i]]) {
                                    $("#lm-tableTable").setCell(rids[i], base, "<div style='color:blue;cursor:pointer' " +
                                        "onclick='pages.LoansMgr.ins.onClickLink(" + rids[i] + ")'>" + isLinked[rids[i]] + "</div>");
                                }
                            }
                        }, 0);
                    },
                    onPaging:(btn)=>{
                        setTimeout(()=>{
                            let rids = $("#lm-tableTable").getDataIDs();
                            for (let i =0; i < rids.length; ++i){
                                if (undefined != isLinked[rids[i]]) {
                                    $("#lm-tableTable").setCell(rids[i], base, "<div style='color:blue;cursor:pointer' " +
                                        "onclick='pages.LoansMgr.ins.onClickLink(" + rids[i] + ")'>" + isLinked[rids[i]] + "</div>");
                                }
                            }
                        }, 0)
                    }
                }));
            //this.find("th input[role='checkbox']").hide();
            let rids = this.find("#lm-tableTable").getDataIDs();
            for (let i =0; i < rids.length; ++i){
                if (undefined != isLinked[rids[i]]) {
                    this.find("#lm-tableTable").setCell(rids[i], base, "<div style='color:blue;cursor:pointer' " +
                        "onclick='pages.LoansMgr.ins.onClickLink(" + rids[i] + ")'>" + isLinked[rids[i]] + "</div>");
                }
            }
            this.adjustWidth("lm-table", this.find("#lm-tableTable"));
        }

        private adjustWidth(name:string, jqgrid:any){
            if (this.find("#" + name).width() != this.find("#" + name).children().eq(0).width()){
                jqgrid.setGridWidth(this.find("#" + name).width() );
            }
        }

        private updateWwjgs():void {
            let val = this.find("#qWwjg").val();
            this.find("#qWwjg").empty();
            this.find("#qWwjg").append('<option value="none" />');
            $(this.wwjgs).each((i, e)=>{
                if (val == e){
                    this.find("#qWwjg").append('<option value="' + e + '" selected="selected">' + e + '</option>');
                }else{
                    this.find("#qWwjg").append('<option value="' + e + '" >' + e + '</option>');
                }
            });
        }
    }
}