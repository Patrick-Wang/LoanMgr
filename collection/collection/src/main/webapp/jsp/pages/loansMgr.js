var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
///<reference path="pages.ts"/>
///<reference path="../pageSidebar.ts"/>
var pages;
(function (pages) {
    var LoansMgr = (function (_super) {
        __extends(LoansMgr, _super);
        function LoansMgr(page) {
            var _this = this;
            _super.call(this, page);
            this.isAssigner = false;
            this.isOwner = false;
            this.find(".dowebok input").labelauty();
            route.router.register(new route.Receiver("loansMgr", function (e) {
                switch (e.id) {
                    case route.MSG.CONSOLE_ASSIGNER_UNRESPMSGS:
                        _this.isAssigner = true;
                        break;
                    case route.MSG.CONSOLE_OWNER_UNREADMSGS:
                        _this.isOwner = true;
                        break;
                    case route.MSG.LOANMGR_GET_QOPT:
                        return _this.getQOpt();
                        break;
                    case route.MSG.LOANMGR_GET_TYPE:
                        return _this.find(".dowebok input:checked").attr("myid");
                }
            }));
        }
        LoansMgr.prototype.qOpt = function (id) {
            var optVal = this.find("#" + id).val();
            if (optVal != undefined && optVal != "" && optVal != "none" && optVal.indexOf("____") < 0) {
                return optVal;
            }
            return undefined;
        };
        LoansMgr.prototype.getQOpt = function () {
            var opt = {};
            opt.name = this.qOpt("qName");
            opt.code = this.qOpt("qCode");
            opt.PIN = this.qOpt("qPIN");
            opt.wwjg = this.qOpt("qWwjg");
            opt.wwrq = this.qOpt("qDate");
            opt.wwzt = this.qOpt("qStatus");
            return opt;
        };
        LoansMgr.prototype.onRefresh = function () {
            var _this = this;
            var ecType = this.find(".dowebok input:checked").attr("myid");
            var opt = this.getQOpt();
            collection.EntrustedCase.search(ecType, opt).done(function (ecs) {
                _this.ecs = ecs;
                _this.ecType = ecType;
                _this.refreshLoans(_this.ecType);
            });
        };
        LoansMgr.prototype.onShown = function () {
            this.adjustWidth("lm-table", this.find("#lm-tableTable"));
        };
        LoansMgr.prototype.refreshLoans = function (type) {
            var _this = this;
            var tableAssist = pages.JQGridAssistantFactory.createTableAssist("lm-table", type);
            var loans = [];
            var isLinked = {};
            for (var i = 0; i < this.ecs.length; ++i) {
                if (this.ecs[i].loan[2] != "" && this.ecs[i].loan[2] != null) {
                    if (this.isOwner && this.ecs[i].owner == context.userName ||
                        this.isAssigner && this.ecs[i].assignee == context.userName) {
                        isLinked[this.ecs[i].loan[0]] = this.ecs[i].loan[2];
                    }
                }
                loans.push(this.ecs[i].loan);
            }
            var lastSel;
            this.find("#lm-tableTable").jqGrid(tableAssist.decorate({
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
                onCellSelect: function (rowid, iCol, cellcontent, e) {
                    if (iCol == 1) {
                        if (isLinked[rowid]) {
                            alert(rowid + " " + iCol);
                        }
                    }
                },
                onSelectRow: function (id) {
                    if (id && id !== lastSel) {
                        var ids = [].concat(_this.find("#lm-tableTable").jqGrid('getGridParam', 'selarrrow'));
                        if (ids.indexOf(lastSel) >= 0) {
                            _this.find("#lm-tableTable").setSelection(lastSel);
                        }
                        lastSel = id;
                    }
                },
                onSortCol: function (index, iCol, sortorder) {
                    setTimeout(function () {
                        var rids = $("#lm-tableTable").getDataIDs();
                        for (var i = 0; i < rids.length; ++i) {
                            if (undefined != isLinked[rids[i]]) {
                                $("#lm-tableTable").setCell(rids[i], 1, "<div style='color:blue;cursor:pointer' >" + isLinked[rids[i]] + "</div>");
                            }
                        }
                    }, 0);
                },
                onPaging: function (btn) {
                    setTimeout(function () {
                        var rids = $("#lm-tableTable").getDataIDs();
                        for (var i = 0; i < rids.length; ++i) {
                            if (undefined != isLinked[rids[i]]) {
                                $("#lm-tableTable").setCell(rids[i], 1, "<div style='color:blue;cursor:pointer' >" + isLinked[rids[i]] + "</div>");
                            }
                        }
                    }, 0);
                    lastSel = undefined;
                }
            }));
            this.find("th input[role='checkbox']").hide();
            var rids = this.find("#lm-tableTable").getDataIDs();
            for (var i = 0; i < rids.length; ++i) {
                if (undefined != isLinked[rids[i]]) {
                    this.find("#lm-tableTable").setCell(rids[i], 1, "<div style='color:blue;cursor:pointer' >" + isLinked[rids[i]] + "</div>");
                }
            }
            this.adjustWidth("lm-table", this.find("#lm-tableTable"));
        };
        LoansMgr.prototype.adjustWidth = function (name, jqgrid) {
            if (this.find("#" + name).width() != this.find("#" + name).children().eq(0).width()) {
                jqgrid.setGridWidth(this.find("#" + name).width());
            }
        };
        LoansMgr.ins = new LoansMgr(pages.PageType.loansMgr);
        return LoansMgr;
    })(pages.PageImpl);
})(pages || (pages = {}));
