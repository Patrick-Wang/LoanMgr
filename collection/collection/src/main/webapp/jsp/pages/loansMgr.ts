///<reference path="pages.ts"/>
///<reference path="../pageSidebar.ts"/>
module pages{
    import Authority = collection.Authority;
    export class LoansMgr extends PageImpl{
        static ins = new LoansMgr(PageType.loansMgr);
        private ecType:collection.protocol.EntrustedCaseType;
        private ecs:collection.protocol.EC[];
       // requestEvent:route.Event;
        private tableAssist:JQTable.JQGridAssistant;
        private isAssigner:boolean = false;
        private isOwner:boolean = false;
        private isManager:boolean = false;
        private wwjgs:string[] = [];
        private usrs:collection.protocol.User[] = [];
        private pageSize:number = 10;
        private pageNum:number = 0;
        private searchOpt:collection.protocol.QueryOption;
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

            this.find("#lm-search-Btn").click(()=>{
                this.refresh();
            });

            this.find(".dowebok:eq(1) input").click(()=>{
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
            let assid : any = this.qOpt("qYwy");
            opt.assignee = assid ? parseInt(assid) : undefined ;
            let id = this.find(".dowebok:eq(1) input:checked").attr("myid");
            if (id == 0 ){
                opt.assignToMe = true;
            }else if (id == 1){
                opt.myOwn = true;
            }
            opt.pageNum = this.pageNum;
            opt.pageSize = this.pageSize;
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
            this.searchOpt = this.getQOpt();

            collection.EntrustedCase.getWwjgs(ecType).done((wwjgs:string[])=>{
                this.wwjgs = wwjgs;
                this.updateWwjgs();
            });

            if (authority.ping("/ec/answer") || authority.ping("/user/manager")){
                collection.Account.getUsers().done((usrs:collection.protocol.User[])=>{
                    this.usrs = usrs;
                    this.updateUsrs();
                });
            }else{
                this.find("#qYwy").parent().parent().remove();
            }

            collection.EntrustedCase.search(ecType, this.searchOpt).done((ecs:collection.protocol.EC[])=> {
                this.ecs = ecs;
                this.ecType = ecType;
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

        getEcByRid(rid:string):number{
            for (let i = 0; i < this.ecs.length; ++i){
               if (this.ecs[i].loan[0] == rid){
                   return i;
               }
            }
            return undefined;
        }

        onClickLink(rid:string){
            let index = this.getEcByRid(rid);
            route.router.to(PageUtil.getPageId(PageType.loansDetail)).send(route.MSG.EC_DETAIL_ECINFO, {
                ecs : this.ecs,
                index : index,
                ec : this.ecs[index],
                ecType : this.ecType,
                searchOpt : this.searchOpt
            });
            sidebar.switchPage(PageType.loansDetail);
        }



        private refreshLoans(type:any):void {
            this.tableAssist = pages.JQGridAssistantFactory.createTableAssist("lm-table", type);
            let isLinked:any = {};

            let tbData : JQTable.TableData = null;
            if (this.ecs.length > 0){
                tbData  = {
                    records :  this.ecs[0].records,
                    page : this.ecs[0].pageNum + 1,
                    total : this.ecs[0].pageCount,
                    rows : []
                }
            }

            for (let i = 0; i < this.ecs.length; ++i) {
                let r : JQTable.TableRow = {
                    id : this.ecs[i].loan[0],
                    cell : this.ecs[i].loan.slice(1)
                }
                tbData.rows.push(r);
                if (this.isManager ||
                    this.isOwner && this.ecs[i].owner == context.userName ||
                    this.isAssigner && this.ecs[i].assignee == context.userName){
                    isLinked[this.ecs[i].loan[0]] = this.ecs[i].loan[1];
                }
            }

            let base = authority.ping("/ec/export") ? 1 : 0;

            this.find("#lm-tableTable").jqGrid(
                this.tableAssist.decorate({
                    datatype: (postdata:JQTable.SortData) => {
                        this.pageSize = postdata.rows;
                        this.pageNum = postdata.page - 1;
                        this.refresh();
                    },
                    drag: false,
                    resize: false,
                    autowidth: true,
                    viewrecords: true,
                    sortable: true,
                    height: '100%',
                    shrinkToFit: false,
                    rowNum: this.pageSize,
                    rowList:[10,20,50,100],
                    autoScroll: true,
                    multiselect: base > 0,
                    pager: '#lm-tablePager'
                }));

            if (this.ecs.length > 0) {
                this.tableAssist.addTableData(tbData);
            }

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

        private updateUsrs():void {
            let val = this.find("#qYwy").val();
            this.find("#qYwy").empty();
            this.find("#qYwy").append('<option value="none" />');
            $(this.usrs).each((i, e:collection.protocol.User)=>{
                if (e.roles.indexOf(collection.protocol.RoleEN.OUTSIDE) >= 0){
                    if (val == e.id){
                        this.find("#qYwy").append('<option value="' + e.id + '" selected="selected">' + e.name + '</option>');
                    }else{
                        this.find("#qYwy").append('<option value="' + e.id + '" >' + e.name + '</option>');
                    }
                }
            });
        }
    }
}