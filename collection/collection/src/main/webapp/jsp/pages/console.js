var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
///<reference path="pages.ts"/>
///<reference path="../pageSidebar.ts"/>
///<reference path="../sdk/route/route.ts"/>
///<reference path="importLoans.ts"/>
///<reference path="askSth.ts"/>
var pages;
(function (pages) {
    var EntrustedCase = collection.EntrustedCase;
    var AnonymousReceiver = route.AnonymousReceiver;
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
            this.isAssigner = false;
            this.isOwner = false;
            $("#" + pages.PageUtil.getPageId(this.page) + " .dowebok input").labelauty();
            $("#" + pages.PageUtil.getPageId(this.page) + " #myTab11 a").click(function () {
                setTimeout(function () {
                    _this.doTabRefresh();
                }, 0);
            });
            route.router.register(new AnonymousReceiver(function (e) {
                switch (e.id) {
                    case route.MSG.CONSOLE_ASSIGNER_UNRESPMSGS:
                        _this.unRespMsgs = e.data;
                        _this.isAssigner = true;
                        _this.doTabRefresh();
                        break;
                    case route.MSG.CONSOLE_OWNER_UNREADMSGS:
                        _this.unReadMsgs = e.data;
                        _this.isOwner = true;
                        ;
                        _this.doTabRefresh();
                        break;
                }
            }));
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
            $("#" + pages.PageUtil.getPageId(this.page) + " #myTab11 a").unbind("click");
            var type = $(".dowebok input:checked").attr("myid");
            var opt = {};
            EntrustedCase.search(type, opt).done(function (ecs) {
                _this.ecs = ecs;
                _this.ecType = type;
                $("#" + pages.PageUtil.getPageId(_this.page) + " #myTab11 a").click(function () {
                    setTimeout(function () {
                        _this.doTabRefresh();
                    }, 0);
                });
                _this.doTabRefresh();
            });
        };
        Console.prototype.doTabRefresh = function () {
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
        };
        Console.prototype.refreshNotAssigned = function (type) {
            var tableAssist = this.createTableAssist("tbNotAssigned", type);
            var loans = [];
            var isLinked = [];
            for (var i = 0; i < this.ecs.length; ++i) {
                if (undefined == this.ecs[i].assignee || "" == this.ecs[i].assignee) {
                    if (this.ecs[i].loan[2] != "" && this.ecs[i].loan[2] != null) {
                        if (this.isOwner && this.ecs[i].owner == context.userName) {
                            isLinked.push([this.ecs[i].loan[0], this.ecs[i].loan[2]]);
                        }
                        else {
                            isLinked.push(null);
                        }
                    }
                    else {
                        isLinked.push(null);
                    }
                    loans.push(this.ecs[i].loan);
                }
            }
            $("#tbNotAssignedTable").jqGrid(tableAssist.decorate({
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
                onCellSelect: function (rowid, iCol, cellcontent, e) {
                    if (iCol == 1) {
                        alert(rowid + " " + iCol);
                    }
                },
                onPaging: function (btn) {
                    setTimeout(function () {
                        var curPg = $("#tbNotAssignedTable").jqGrid("getGridParam", "page");
                        var rowNum = $("#tbNotAssignedTable").jqGrid("getGridParam", 'rowNum');
                        for (var i = (curPg - 1) * rowNum; i < curPg * rowNum; ++i) {
                            if (null != isLinked[i]) {
                                $("#tbNotAssignedTable").setCell(isLinked[i][0], 1, "<div style='color:blue;cursor:pointer' >" + isLinked[i][1] + "</div>");
                            }
                        }
                    }, 0);
                }
            }));
            for (var i = 0; i < isLinked.length; ++i) {
                if (null != isLinked[i]) {
                    $("#tbNotAssignedTable").setCell(isLinked[i][0], 1, "<div style='color:blue;cursor:pointer' >" + isLinked[i][1] + "</div>");
                }
            }
            this.adjustWidth("tbNotAssigned", $("#tbNotAssignedTable"));
        };
        Console.prototype.refreshNotRepliedMsg = function () {
            var parent = $("#tbNotRepliedMsg");
            parent.empty();
            parent.append("<table id='tbNotRepliedMsgTable'></table><div id='tbNotRepliedMsgPager'></div>");
            var data = [];
            for (var i = 0; i < this.unReadMsgs.length; ++i) {
                var row = [];
                row.push(this.unReadMsgs[i].ecCode);
                row.push(this.unReadMsgs[i].fromName);
                row.push(this.unReadMsgs[i].title);
                row.push(this.unReadMsgs[i].content);
                row.push(this.unReadMsgs[i].sendTime);
                data.push(row);
            }
            var tableAssist = JQGridAssistantFactory.createTable("tbNotRepliedMsgTable", ["委案编码", "发送人", "标题", "内容", "发送时间"], 0);
            $("#tbNotRepliedMsgTable").jqGrid(tableAssist.decorate({
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
        };
        Console.prototype.adjustWidth = function (name, jqgrid) {
            if ($("#" + name).width() != $("#" + name).children().eq(0).width()) {
                jqgrid.setGridWidth($("#" + name).width());
            }
        };
        Console.prototype.refreshAllLoans = function (type) {
            var tableAssist = this.createTableAssist("tbAll", type);
            var loans = [];
            var isLinked = [];
            for (var i = 0; i < this.ecs.length; ++i) {
                if (this.ecs[i].loan[2] != "" && this.ecs[i].loan[2] != null) {
                    if (this.isOwner && this.ecs[i].owner == context.userName) {
                        isLinked.push([this.ecs[i].loan[0], this.ecs[i].loan[2]]);
                    }
                    else if (this.isAssigner && this.ecs[i].assignee == context.userName) {
                        isLinked.push([this.ecs[i].loan[0], this.ecs[i].loan[2]]);
                    }
                    else {
                        isLinked.push(null);
                    }
                }
                else {
                    isLinked.push(null);
                }
                loans.push(this.ecs[i].loan);
            }
            $("#tbAllTable").jqGrid(tableAssist.decorate({
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
                onCellSelect: function (rowid, iCol, cellcontent, e) {
                    if (iCol == 1) {
                        alert(rowid + " " + iCol);
                    }
                },
                onPaging: function (btn) {
                    setTimeout(function () {
                        var curPg = $("#tbAllTable").jqGrid("getGridParam", "page");
                        var rowNum = $("#tbAllTable").jqGrid("getGridParam", 'rowNum');
                        for (var i = (curPg - 1) * rowNum; i < curPg * rowNum; ++i) {
                            if (null != isLinked[i]) {
                                $("#tbAllTable").setCell(isLinked[i][0], 1, "<div style='color:blue;cursor:pointer' >" + isLinked[i][1] + "</div>");
                            }
                        }
                    }, 0);
                }
            }));
            for (var i = 0; i < isLinked.length; ++i) {
                if (null != isLinked[i]) {
                    $("#tbAllTable").setCell(isLinked[i][0], 1, "<div style='color:blue;cursor:pointer' >" + isLinked[i][1] + "</div>");
                }
            }
            this.adjustWidth("tbAll", $("#tbAllTable"));
        };
        Console.prototype.refreshWaitRepliedMsg = function () {
            var parent = $("#tbWaitRepliedMsg");
            parent.empty();
            parent.append("<table id='tbWaitRepliedMsgTable'></table><div id='tbWaitRepliedMsgPager'></div>");
            var data = [];
            for (var i = 0; i < this.unRespMsgs.length; ++i) {
                var row = [];
                row.push(this.unRespMsgs[i].ecCode);
                row.push(this.unRespMsgs[i].toName);
                row.push(this.unRespMsgs[i].title);
                row.push(this.unRespMsgs[i].content);
                row.push(this.unRespMsgs[i].sendTime);
                data.push(row);
            }
            var tableAssist = JQGridAssistantFactory.createTable("tbNotRepliedMsgTable", ["委案编码", "回复人", "标题", "内容", "发送时间"], 0);
            $("#tbWaitRepliedMsgTable").jqGrid(tableAssist.decorate({
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
        };
        Console.ins = new Console(pages.PageType.console);
        return Console;
    })(pages.PageImpl);
    pages.Console = Console;
})(pages || (pages = {}));
