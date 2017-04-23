///<reference path="pages.ts"/>
///<reference path="../pageSidebar.ts"/>
///<reference path="../sdk/route/route.ts"/>
///<reference path="importLoans.ts"/>
module pages {
    import EntrustedCase = collection.EntrustedCase;
    import QueryOption = collection.protocol.QueryOption;
    import EntrustedCaseType = collection.protocol.EntrustedCaseType;
    import EC = collection.protocol.EC;
    import Message = collection.Message;
    import UnreadMessage = collection.protocol.UnreadMessage;


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
        ecs:EC<any>[];
        ecType:EntrustedCaseType;
        umsgs:UnreadMessage[];

        constructor(page:pages.PageType) {
            super(page);
            $("#" + PageUtil.getPageId(this.page) + " .dowebok input").labelauty();
            $("#" + PageUtil.getPageId(this.page) + " #myTab11 a").click(()=> {
                setTimeout(()=>{
                    this.doTabRefresh();
                }, 0);
            });

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
            let type = $(".dowebok input:checked").attr("myid");
            let opt:QueryOption = {};
            EntrustedCase.search(type, opt).done((ecs:EC<any>[])=> {
                this.ecs = ecs;
                this.ecType = type;
                this.doTabRefresh();
            });
            Message.getUnreadMessages().done((umsgs:UnreadMessage[])=> {
                this.umsgs = umsgs;
                this.doTabRefresh();
            });

        }

        doTabRefresh() {
            if (this.ecs != undefined) {
                if ($("#notAssigned").hasClass("active")) {
                    this.refreshNotAssigned(this.ecType);
                }
                if ($("#allLoans").hasClass("active")) {
                    this.refreshAllLoans(this.ecType);
                }
                if ($("#notRepliedMsg").hasClass("active")) {
                    this.refreshNotRepliedMsg();
                }
            }
        }


        private refreshNotAssigned(type:any):void {
            let tableAssist:JQTable.JQGridAssistant = this.createTableAssist("tbNotAssigned", type);

            let loans = [];
            for (let i = 0; i < this.ecs.length; ++i) {
                if (undefined == this.ecs[i].assignee || "" == this.ecs[i].assignee) {
                    let row = [];
                    for (let key in this.ecs[i].loan) {
                        row.push(this.ecs[i].loan[key]);
                    }
                    loans.push(row);
                }
            }

            $("#tbNotAssignedTable").jqGrid(
                tableAssist.decorate({
                    // url: "TestTable/WGDD_load.do",
                    // datatype: "json",
                    data: tableAssist.getData(loans),
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
                    pager: '#tbNotAssignedPager'
                }));

        }

        private refreshNotRepliedMsg():void {

            var parent = $("#tbNotRepliedMsg");
            parent.empty();
            parent.append("<table id='tbNotRepliedMsgTable'></table><div id='tbNotRepliedMsgPager'></div>");
            let data = [];
            for (let i = 0; i < this.umsgs.length; ++i) {
                let row = [];
                row.push(this.umsgs[i].fromName);
                row.push(this.umsgs[i].title);
                row.push(this.umsgs[i].content);
                row.push(this.umsgs[i].sendTime);
                data.push(row);
            }

            let tableAssist:JQTable.JQGridAssistant = JQGridAssistantFactory.createTable("tbNotRepliedMsgTable", ["发送人", "标题", "内容", "发送时间"], 0);
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
                    //                    cellsubmit: 'clientArray',
                    //                    cellEdit: true,
                    height: '100%',
                    //  width:  $("#allLoans").width() - 30,
                    shrinkToFit: true,
                    rowNum: 10,
                    autoScroll: true,
                    pager: '#tbNotRepliedMsgPager'
                }));
        }

        private refreshAllLoans(type:any):void {
            let tableAssist:JQTable.JQGridAssistant = this.createTableAssist("tbAll", type);
            let loans = [];
            for (let i = 0; i < this.ecs.length; ++i) {
                let row = [];
                for (let key in this.ecs[i].loan) {
                    row.push(this.ecs[i].loan[key]);
                }
                loans.push(row);
            }

            $("#tbAllTable").jqGrid(
                tableAssist.decorate({
                    // url: "TestTable/WGDD_load.do",
                    // datatype: "json",
                    data: tableAssist.getData(loans),
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
                    pager: '#tbAllPager'
                }));
        }
    }
}