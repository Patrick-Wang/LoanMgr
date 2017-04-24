///<reference path="pages.ts"/>
///<reference path="../pageSidebar.ts"/>
///<reference path="../sdk/route/route.ts"/>
///<reference path="importLoans.ts"/>
///<reference path="askSth.ts"/>
module pages {
    import EntrustedCase = collection.EntrustedCase;
    import QueryOption = collection.protocol.QueryOption;
    import EntrustedCaseType = collection.protocol.EntrustedCaseType;
    import EC = collection.protocol.EC;
    import Message = collection.Message;
    import AnonymousReceiver = route.AnonymousReceiver;

    class JQGridAssistantFactory {
        public static createTable(gridName:string, titles:string[], width:number = 80):JQTable.JQGridAssistant {
            let nodes = [];
            for (let i = 0; i < titles.length; ++i) {
                nodes.push(JQTable.Node.create({
                    name: titles[i],
                    width: width,
                    isSortable: true
                }));
            }
            return new JQTable.JQGridAssistant(nodes, gridName);
        }
    }

    export class Console extends PageImpl {
        private static ins = new Console(PageType.console);
        ecs:EC[];
        ecType:EntrustedCaseType;
        unReadMsgs:collection.protocol.Message[];
        unRespMsgs:collection.protocol.Message[];
        isAssigner:boolean = false;
        isOwner:boolean = false;
        constructor(page:pages.PageType) {
            super(page);
            $("#" + PageUtil.getPageId(this.page) + " .dowebok input").labelauty();
            $("#" + PageUtil.getPageId(this.page) + " #myTab11 a").click(()=> {
                setTimeout(()=>{
                    this.doTabRefresh();
                }, 0);
            });
            route.router.register(new AnonymousReceiver((e:route.Event)=> {
                switch (e.id) {
                    case route.MSG.CONSOLE_ASSIGNER_UNRESPMSGS:
                        this.unRespMsgs = e.data;
                        this.isAssigner = true;
                        this.doTabRefresh();
                        break;
                    case route.MSG.CONSOLE_OWNER_UNREADMSGS:
                        this.unReadMsgs = e.data
                        this.isOwner = true;;
                        this.doTabRefresh();
                        break;
                }
            }));
        }

        private createTableAssist(pName:string, type:any):any {
            var parent = $("#" + pName);
            parent.empty();
            parent.append("<table id='" + pName + "Table'></table><div id='" + pName + "Pager'></div>");
            let tableAssist:JQTable.JQGridAssistant = null;
            if (type == collection.protocol.EntrustedCaseType.carLoan) {
                tableAssist = JQGridAssistantFactory.createTable(pName + "Table", collection.protocol.carLoanTitle);
            } else if (type == collection.protocol.EntrustedCaseType.creditCard) {
                tableAssist = JQGridAssistantFactory.createTable(pName + "Table", collection.protocol.creditCardTitle);
            } else {
                tableAssist = JQGridAssistantFactory.createTable(pName + "Table", collection.protocol.creditLoanTitle);
            }
            return tableAssist;
        }

        protected onRefresh():void {
            $("#" + PageUtil.getPageId(this.page) + " #myTab11 a").unbind("click");

            let type = $(".dowebok input:checked").attr("myid");
            let opt:QueryOption = {};
            EntrustedCase.search(type, opt).done((ecs:EC[])=> {
                this.ecs = ecs;
                this.ecType = type;
                $("#" + PageUtil.getPageId(this.page) + " #myTab11 a").click(()=> {
                    setTimeout(()=>{
                        this.doTabRefresh();
                    }, 0);
                });
                this.doTabRefresh();
            });
        }

        doTabRefresh() {
            if (this.ecs != undefined) {
                if ($("#allLoans").hasClass("active")) {
                    this.refreshAllLoans(this.ecType);
                }
                if ($("#notAssigned").hasClass("active")) {
                    this.refreshNotAssigned(this.ecType);
                }
                if ($("#notRepliedMsg").hasClass("active")) {
                    this.refreshNotRepliedMsg();
                }
                if ($("#waitRepliedMsg").hasClass("active")) {
                    this.refreshWaitRepliedMsg();
                }
            }
        }


        private refreshNotAssigned(type:any):void {
            let tableAssist:JQTable.JQGridAssistant = this.createTableAssist("tbNotAssigned", type);
            let loans = [];
            let isLinked:any[] = [];
            for (let i = 0; i < this.ecs.length; ++i) {
                if (undefined == this.ecs[i].assignee || "" == this.ecs[i].assignee) {
                    if (this.ecs[i].loan[2] != "" && this.ecs[i].loan[2] != null){
                        if (this.isOwner && this.ecs[i].owner == context.userName){
                            isLinked.push([this.ecs[i].loan[0], this.ecs[i].loan[2]]);
                        } else{
                            isLinked.push(null);
                        }
                    }else{
                        isLinked.push(null);
                    }

                    loans.push(this.ecs[i].loan);
                }
            }

            $("#tbNotAssignedTable").jqGrid(
                tableAssist.decorate({
                    // url: "TestTable/WGDD_load.do",
                    // datatype: "json",
                    data: tableAssist.getDataWithId(loans),
                    datatype: "local",
                    multiselect: false,
                    drag: false,
                    resize: false,
                    autowidth: true,
                    viewrecords: true,
                    sortable: true,
                    //                    cellsubmit: 'clientArray',
                    //                    cellEdit: true,
                    height: '100%',
                    //  width:  $("#allLoans").width() - 30,
                    shrinkToFit: false,
                    rowNum: 10,
                    autoScroll: true,
                    pager: '#tbNotAssignedPager',
                    onCellSelect:(rowid,iCol,cellcontent,e)=>{
                        if (iCol == 1){
                            alert(rowid + " " +  iCol);
                        }
                    },
                    onPaging:(btn)=>{
                        setTimeout(()=>{
                            let curPg = $("#tbNotAssignedTable").jqGrid("getGridParam","page");
                            let rowNum= $("#tbNotAssignedTable").jqGrid("getGridParam",'rowNum');
                            for (let i = (curPg - 1) * rowNum; i < curPg * rowNum; ++i){
                                if (null != isLinked[i]) {
                                    $("#tbNotAssignedTable").setCell(isLinked[i][0], 1, "<div style='color:blue;cursor:pointer' >" + isLinked[i][1] + "</div>");
                                }
                            }
                        }, 0);
                    }
                }));

            for (let i =0; i < isLinked.length; ++i){
                if (null != isLinked[i]) {
                    $("#tbNotAssignedTable").setCell(isLinked[i][0], 1, "<div style='color:blue;cursor:pointer' >" + isLinked[i][1] + "</div>");
                }
            }
            this.adjustWidth("tbNotAssigned", $("#tbNotAssignedTable"));
        }

        private refreshNotRepliedMsg():void {

            var parent = $("#tbNotRepliedMsg");
            parent.empty();
            parent.append("<table id='tbNotRepliedMsgTable'></table><div id='tbNotRepliedMsgPager'></div>");
            let data = [];
            for (let i = 0; i < this.unReadMsgs.length; ++i) {
                let row = [];
                row.push(this.unReadMsgs[i].ecCode);
                row.push(this.unReadMsgs[i].fromName);
                row.push(this.unReadMsgs[i].title);
                row.push(this.unReadMsgs[i].content);
                row.push(this.unReadMsgs[i].sendTime);
                data.push(row);
            }

            let tableAssist:JQTable.JQGridAssistant = JQGridAssistantFactory.createTable("tbNotRepliedMsgTable", ["委案编码", "发送人", "标题", "内容", "发送时间"], 0);
            $("#tbNotRepliedMsgTable").jqGrid(
                tableAssist.decorate({
                    data: tableAssist.getData(data),
                    datatype: "local",
                    multiselect: false,
                    drag: false,
                    resize: false,
                    autowidth: true,
                    viewrecords: true,
                    sortable: true,
                    height: '100%',
                    //  width:  $("#allLoans").width() - 30,
                    shrinkToFit: true,
                    rowNum: 10,
                    autoScroll: true,
                    pager: '#tbNotRepliedMsgPager'
                }));
            this.adjustWidth("tbNotRepliedMsg", $("#tbNotRepliedMsgTable"));
        }

        private adjustWidth(name:string, jqgrid:any){
            if ($("#" + name).width() != $("#" + name).children().eq(0).width()){
                jqgrid.setGridWidth($("#" + name).width() );
            }
        }

        private refreshAllLoans(type:any):void {
            let tableAssist:JQTable.JQGridAssistant = this.createTableAssist("tbAll", type);
            let loans = [];
            let isLinked:any[] = [];
            for (let i = 0; i < this.ecs.length; ++i) {
                if (this.ecs[i].loan[2] != "" && this.ecs[i].loan[2] != null){
                    if (this.isOwner && this.ecs[i].owner == context.userName){
                        isLinked.push([this.ecs[i].loan[0], this.ecs[i].loan[2]]);
                    } else if (this.isAssigner && this.ecs[i].assignee == context.userName){
                        isLinked.push([this.ecs[i].loan[0], this.ecs[i].loan[2]]);
                    } else{
                        isLinked.push(null);
                    }
                }else{
                    isLinked.push(null);
                }
                loans.push(this.ecs[i].loan);
            }

            $("#tbAllTable").jqGrid(
                tableAssist.decorate({
                    // url: "TestTable/WGDD_load.do",
                    // datatype: "json",
                    data: tableAssist.getDataWithId(loans),
                    datatype: "local",
                    multiselect: false,
                    drag: false,
                    resize: false,
                    autowidth: true,
                    viewrecords: true,
                    sortable: true,
                    //                    cellsubmit: 'clientArray',
                    //                    cellEdit: true,
                    height: '100%',
                    //  width:  $("#allLoans").width() - 30,
                    shrinkToFit: false,
                    rowNum: 10,
                    autoScroll: true,
                    pager: '#tbAllPager',
                    onCellSelect:(rowid,iCol,cellcontent,e)=>{
                        if (iCol == 1){
                            alert(rowid + " " +  iCol);
                        }
                    },
                    onPaging:(btn)=>{
                        setTimeout(()=>{
                            let curPg = $("#tbAllTable").jqGrid("getGridParam","page");
                            let rowNum= $("#tbAllTable").jqGrid("getGridParam",'rowNum');
                            for (let i = (curPg - 1) * rowNum; i < curPg * rowNum; ++i){
                                if (null != isLinked[i]) {
                                    $("#tbAllTable").setCell(isLinked[i][0], 1, "<div style='color:blue;cursor:pointer' >" + isLinked[i][1] + "</div>");
                                }
                            }
                        }, 0);
                    }
                }));

            for (let i =0; i < isLinked.length; ++i){
                if (null != isLinked[i]) {
                    $("#tbAllTable").setCell(isLinked[i][0], 1, "<div style='color:blue;cursor:pointer' >" + isLinked[i][1] + "</div>");
                }
            }
            this.adjustWidth("tbAll",  $("#tbAllTable"));
        }

        private refreshWaitRepliedMsg():void {
            var parent = $("#tbWaitRepliedMsg");
            parent.empty();
            parent.append("<table id='tbWaitRepliedMsgTable'></table><div id='tbWaitRepliedMsgPager'></div>");
            let data = [];
            for (let i = 0; i < this.unRespMsgs.length; ++i) {
                let row = [];
                row.push(this.unRespMsgs[i].ecCode);
                row.push(this.unRespMsgs[i].toName);
                row.push(this.unRespMsgs[i].title);
                row.push(this.unRespMsgs[i].content);
                row.push(this.unRespMsgs[i].sendTime);
                data.push(row);
            }

            let tableAssist:JQTable.JQGridAssistant = JQGridAssistantFactory.createTable("tbNotRepliedMsgTable", ["委案编码", "回复人", "标题", "内容", "发送时间"], 0);
            $("#tbWaitRepliedMsgTable").jqGrid(
                tableAssist.decorate({
                    data: tableAssist.getData(data),
                    datatype: "local",
                    multiselect: false,
                    drag: false,
                    resize: false,
                    autowidth: true,
                    viewrecords: true,
                    sortable: true,
                    height: '100%',
                    //  width:  $("#allLoans").width() - 30,
                    shrinkToFit: true,
                    rowNum: 10,
                    autoScroll: true,
                    pager: '#tbWaitRepliedMsgPager'
                }));
            this.adjustWidth("tbWaitRepliedMsg", $("#tbWaitRepliedMsgTable"));
        }
    }
}