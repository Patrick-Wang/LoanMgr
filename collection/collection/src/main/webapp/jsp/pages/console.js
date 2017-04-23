var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
///<reference path="pages.ts"/>
///<reference path="../pageSidebar.ts"/>
///<reference path="../sdk/route/route.ts"/>
///<reference path="importLoans.ts"/>
var pages;
(function (pages) {
    var EntrustedCase = collection.EntrustedCase;
    var Message = collection.Message;
    var JQGridAssistantFactory = (function () {
        function JQGridAssistantFactory() {
        }
        JQGridAssistantFactory.createTable = function (gridName, titles, width) {
            if (width === void 0) { width = 80; }
            var nodes = [];
            for (var i = 0; i < titles.length; ++i) {
                nodes.push(JQTable.Node.create({
                    name: titles[i],
                    width: width,
                    isSortable: true
                }));
            }
            return new JQTable.JQGridAssistant(nodes, gridName);
        };
        return JQGridAssistantFactory;
    })();
    var Console = (function (_super) {
        __extends(Console, _super);
        function Console(page) {
            var _this = this;
            _super.call(this, page);
            $("#" + pages.PageUtil.getPageId(this.page) + " .dowebok input").labelauty();
            $("#" + pages.PageUtil.getPageId(this.page) + " #myTab11 a").click(function () {
                setTimeout(function () {
                    _this.doTabRefresh();
                }, 0);
            });
        }
        
        Console.prototype.createTableAssist = function (pName, type) {
            var parent = $("#" + pName);
            parent.empty();
            parent.append("<table id='" + pName + "Table'></table><div id='" + pName + "Pager'></div>");
            var tableAssist = null;
            if (type == collection.protocol.EntrustedCaseType.carLoan) {
                tableAssist = JQGridAssistantFactory.createTable(pName + "Table", collection.protocol.carLoanTitle);
            }
            else if (type == collection.protocol.EntrustedCaseType.creditCard) {
                tableAssist = JQGridAssistantFactory.createTable(pName + "Table", collection.protocol.creditCardTitle);
            }
            else {
                tableAssist = JQGridAssistantFactory.createTable(pName + "Table", collection.protocol.creditLoanTitle);
            }
            return tableAssist;
        };
        Console.prototype.onRefresh = function () {
            var _this = this;
            var type = $(".dowebok input:checked").attr("myid");
            var opt = {};
            EntrustedCase.search(type, opt).done(function (ecs) {
                _this.ecs = ecs;
                _this.ecType = type;
                _this.doTabRefresh();
            });
            Message.getUnreadMessages().done(function (umsgs) {
                _this.umsgs = umsgs;
                _this.doTabRefresh();
            });
        };
        Console.prototype.doTabRefresh = function () {
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
        };
        Console.prototype.refreshNotAssigned = function (type) {
            var tableAssist = this.createTableAssist("tbNotAssigned", type);
            var loans = [];
            for (var i = 0; i < this.ecs.length; ++i) {
                if (undefined == this.ecs[i].assignee || "" == this.ecs[i].assignee) {
                    var row = [];
                    for (var key in this.ecs[i].loan) {
                        row.push(this.ecs[i].loan[key]);
                    }
                    loans.push(row);
                }
            }
            $("#tbNotAssignedTable").jqGrid(tableAssist.decorate({
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
        };
        Console.prototype.refreshNotRepliedMsg = function () {
            var parent = $("#tbNotRepliedMsg");
            parent.empty();
            parent.append("<table id='tbNotRepliedMsgTable'></table><div id='tbNotRepliedMsgPager'></div>");
            var data = [];
            for (var i = 0; i < this.umsgs.length; ++i) {
                var row = [];
                row.push(this.umsgs[i].fromName);
                row.push(this.umsgs[i].title);
                row.push(this.umsgs[i].content);
                row.push(this.umsgs[i].sendTime);
                data.push(row);
            }
            var tableAssist = JQGridAssistantFactory.createTable("tbNotRepliedMsgTable", ["发送人", "标题", "内容", "发送时间"], 0);
            $("#tbNotRepliedMsgTable").jqGrid(tableAssist.decorate({
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
        };
        Console.prototype.refreshAllLoans = function (type) {
            var tableAssist = this.createTableAssist("tbAll", type);
            var loans = [];
            for (var i = 0; i < this.ecs.length; ++i) {
                var row = [];
                for (var key in this.ecs[i].loan) {
                    row.push(this.ecs[i].loan[key]);
                }
                loans.push(row);
            }
            $("#tbAllTable").jqGrid(tableAssist.decorate({
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
        };
        Console.ins = new Console(pages.PageType.console);
        return Console;
    })(pages.PageImpl);
    pages.Console = Console;
})(pages || (pages = {}));
