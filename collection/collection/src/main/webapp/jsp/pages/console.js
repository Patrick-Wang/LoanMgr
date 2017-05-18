var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
///<reference path="pages.ts"/>
///<reference path="../pageSidebar.ts"/>
///<reference path="../sdk/route/route.ts"/>
///<reference path="importLoans.ts"/>
///<reference path="askSth.tsx"/>
var pages;
(function (pages) {
    var EntrustedCase = collection.EntrustedCase;
    var AnonymousReceiver = route.AnonymousReceiver;
    var Console = (function (_super) {
        __extends(Console, _super);
        function Console(page) {
            var _this = this;
            _super.call(this, page);
            this.isAssigner = false;
            this.isOwner = false;
            //  $("#" + PageUtil.getPageId(this.page) + " .dowebok input[checked='checked']").prop("checked", true);
            this.find(".dowebok input").labelauty();
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
                        $("#" + pages.PageUtil.getPageId(_this.page) + " #myTab11 a").unbind("click");
                        $("#" + pages.PageUtil.getPageId(_this.page) + " #myTab11 a").click(function () {
                            setTimeout(function () {
                                _this.doTabRefresh();
                            }, 0);
                        });
                        _this.doTabRefresh();
                        break;
                    case route.MSG.CONSOLE_OWNER_UNREADMSGS:
                        _this.unReadMsgs = e.data;
                        _this.isOwner = true;
                        $("#" + pages.PageUtil.getPageId(_this.page) + " #myTab11 a").unbind("click");
                        $("#" + pages.PageUtil.getPageId(_this.page) + " #myTab11 a").click(function () {
                            setTimeout(function () {
                                _this.doTabRefresh();
                            }, 0);
                        });
                        _this.doTabRefresh();
                        break;
                }
            }));
        }
        Console.prototype.onRefresh = function () {
            var _this = this;
            var type = this.find(".dowebok input:checked").attr("myid");
            var opt = {};
            EntrustedCase.search(type, opt).done(function (ecs) {
                _this.ecs = ecs;
                _this.ecType = type;
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
            }
            if ($("#notRepliedMsg").hasClass("active")) {
                this.refreshNotRepliedMsg();
            }
            if ($("#waitRepliedMsg").hasClass("active")) {
                this.refreshWaitRepliedMsg();
            }
        };
        Console.prototype.onShown = function () {
            // this.doTabRefresh();
        };
        Console.prototype.refreshNotAssigned = function (type) {
            var tableAssist = pages.JQGridAssistantFactory.createTableAssist("tbNotAssigned", type);
            var loans = [];
            var isLinked = {};
            for (var i = 0; i < this.ecs.length; ++i) {
                if (undefined == this.ecs[i].assignee || "" == this.ecs[i].assignee) {
                    if (this.ecs[i].loan[2] != "" && this.ecs[i].loan[2] != null) {
                        if (this.isOwner && this.ecs[i].owner == context.userName) {
                            isLinked[this.ecs[i].loan[0]] = this.ecs[i].loan[2];
                        }
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
                rowList: [10, 20, 50],
                autoScroll: true,
                pager: '#tbNotAssignedPager',
                //onCellSelect:(rowid,iCol,cellcontent,e)=>{
                //    if (iCol == 1 &&  isLinked[rowid]){
                //        alert(rowid + " " +  iCol);
                //    }
                //},
                onSortCol: function (index, iCol, sortorder) {
                    setTimeout(function () {
                        var rids = $("#tbNotAssignedTable").getDataIDs();
                        for (var i = 0; i < rids.length; ++i) {
                            if (undefined != isLinked[rids[i]]) {
                                $("#tbNotAssignedTable").setCell(rids[i], 1, "<div style='color:blue;cursor:pointer' " +
                                    "onclick='pages.Console.ins.onClickLink(" + rids[i] + ")'>" + isLinked[rids[i]] + "</div>");
                            }
                        }
                    }, 0);
                },
                onPaging: function (btn) {
                    setTimeout(function () {
                        var rids = $("#tbNotAssignedTable").getDataIDs();
                        for (var i = 0; i < rids.length; ++i) {
                            if (undefined != isLinked[rids[i]]) {
                                $("#tbNotAssignedTable").setCell(rids[i], 1, "<div style='color:blue;cursor:pointer' " +
                                    "onclick='pages.Console.ins.onClickLink(" + rids[i] + ")'>" + isLinked[rids[i]] + "</div>");
                            }
                        }
                    }, 0);
                }
            }));
            var rids = $("#tbNotAssignedTable").getDataIDs();
            for (var i = 0; i < rids.length; ++i) {
                if (undefined != isLinked[rids[i]]) {
                    $("#tbNotAssignedTable").setCell(rids[i], 1, "<div style='color:blue;cursor:pointer' " +
                        "onclick='pages.Console.ins.onClickLink(" + rids[i] + ")'>" + isLinked[rids[i]] + "</div>");
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
            var tableAssist = pages.JQGridAssistantFactory.createTable("tbNotRepliedMsgTable", ["委案编码", "发送人", "标题", "内容", "发送时间"], 0);
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
                rowList: [10, 20, 50],
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
        Console.prototype.getEcByRid = function (rid) {
            for (var i = 0; i < this.ecs.length; ++i) {
                if (this.ecs[i].loan[0] == rid) {
                    return this.ecs[i];
                }
            }
            return undefined;
        };
        Console.prototype.onClickLink = function (rid) {
            var ec = this.getEcByRid(rid);
            route.router.to(pages.PageUtil.getPageId(pages.PageType.loansDetail)).send(route.MSG.EC_DETAIL_ECINFO, {
                ec: ec,
                ecType: this.ecType
            });
            sidebar.switchPage(pages.PageType.loansDetail);
        };
        Console.prototype.refreshAllLoans = function (type) {
            var tableAssist = pages.JQGridAssistantFactory.createTableAssist("tbAll", type);
            var loans = [];
            var isLinked = {};
            for (var i = 0; i < this.ecs.length; ++i) {
                if (this.ecs[i].loan[1]) {
                    if (this.isOwner && this.ecs[i].owner == context.userName) {
                        isLinked[this.ecs[i].loan[0]] = this.ecs[i].loan[1];
                    }
                    else if (this.isAssigner && this.ecs[i].assignee == context.userName) {
                        isLinked[this.ecs[i].loan[0]] = this.ecs[i].loan[1];
                    }
                }
                loans.push(this.ecs[i].loan);
            }
            $("#tbAllTable").jqGrid(tableAssist.decorate({
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
                rowList: [10, 20, 50],
                autoScroll: true,
                pager: '#tbAllPager',
                //onCellSelect:(rowid,iCol,cellcontent,e)=>{
                //    if (iCol == 1){
                //        alert(rowid + " " +  iCol);
                //    }
                //},
                onSortCol: function (index, iCol, sortorder) {
                    setTimeout(function () {
                        var rids = $("#tbAllTable").getDataIDs();
                        for (var i = 0; i < rids.length; ++i) {
                            if (undefined != isLinked[rids[i]]) {
                                $("#tbAllTable").setCell(rids[i], 0, "<div style='color:blue;cursor:pointer' " +
                                    "onclick='pages.Console.ins.onClickLink(" + rids[i] + ")'>" + isLinked[rids[i]] + "</div>");
                            }
                        }
                    }, 0);
                },
                onPaging: function (btn) {
                    setTimeout(function () {
                        var rids = $("#tbAllTable").getDataIDs();
                        for (var i = 0; i < rids.length; ++i) {
                            if (undefined != isLinked[rids[i]]) {
                                $("#tbAllTable").setCell(rids[i], 0, "<div style='color:blue;cursor:pointer' " +
                                    "onclick='pages.Console.ins.onClickLink(" + rids[i] + ")'>" + isLinked[rids[i]] + "</div>");
                            }
                        }
                    }, 0);
                }
            }));
            var rids = $("#tbAllTable").getDataIDs();
            for (var i = 0; i < rids.length; ++i) {
                if (undefined != isLinked[rids[i]]) {
                    $("#tbAllTable").setCell(rids[i], 0, "<div style='color:blue;cursor:pointer' " +
                        "onclick='pages.Console.ins.onClickLink(" + rids[i] + ")'>" + isLinked[rids[i]] + "</div>");
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
            var tableAssist = pages.JQGridAssistantFactory.createTable("tbNotRepliedMsgTable", ["委案编码", "回复人", "标题", "内容", "发送时间"], 0);
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
                rowList: [10, 20, 50],
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
