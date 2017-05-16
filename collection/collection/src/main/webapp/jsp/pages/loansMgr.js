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
            route.router.register(new route.Receiver(pages.PageUtil.getPageId(this.page), function (e) {
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
                    case route.MSG.EC_SELECT_REQUEST:
                        _this.requestEvent = e;
                        break;
                }
            }));
            this.find(".dowebok input").click(function () {
                var ecType = _this.find(".dowebok input:checked").attr("myid");
                switch (parseInt(ecType)) {
                    case collection.protocol.EntrustedCaseType.carLoan:
                        _this.find("#qCode").prev().text("卡号");
                        break;
                    case collection.protocol.EntrustedCaseType.creditCard:
                        _this.find("#qCode").prev().text("客户号");
                        break;
                    case collection.protocol.EntrustedCaseType.creditLoan:
                        _this.find("#qCode").prev().text("车牌号");
                        break;
                }
            });
            this.find(".buttons-preview:eq(1) a:eq(0)").click(function () {
                var ids = [].concat(_this.find("#lm-tableTable").jqGrid('getGridParam', 'selarrrow'));
                if (ids.length == 0) {
                    pages.Toast.warning("请选择委案");
                }
                else {
                    $(_this.ecs).each(function (i, e) {
                        if (e.loan[0] == ids[0]) {
                            route.router.from(pages.PageUtil.getPageId(_this.page)).to(_this.requestEvent.from).send(route.MSG.EC_SELECT_RESPONSE, e.managerId);
                            _this.requestEvent = undefined;
                            return false;
                        }
                    });
                }
                return false;
            });
            this.find(".buttons-preview:eq(1) a:eq(1)").click(function () {
                route.router.from(pages.PageUtil.getPageId(_this.page)).to(_this.requestEvent.from).send(route.MSG.EC_SELECT_RESPONSE);
                return false;
            });
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
            if (this.requestEvent) {
                this.find(".buttons-preview").hide();
                this.find(".buttons-preview:eq(1)").show();
            }
            else {
                this.find(".buttons-preview").hide();
                this.find(".buttons-preview:eq(0)").show();
            }
            var ecType = this.find(".dowebok input:checked").attr("myid");
            var opt = this.getQOpt();
            collection.EntrustedCase.search(ecType, opt).done(function (ecs) {
                _this.ecs = ecs;
                _this.ecType = ecType;
                _this.refreshLoans(_this.ecType);
            });
        };
        LoansMgr.prototype.onShown = function () {
            if (this.requestEvent) {
                this.find(".buttons-preview").hide();
                this.find(".buttons-preview:eq(1)").show();
            }
            else {
                this.find(".buttons-preview").hide();
                this.find(".buttons-preview:eq(0)").show();
            }
            this.adjustWidth("lm-table", this.find("#lm-tableTable"));
        };
        LoansMgr.prototype.getEcByRid = function (rid) {
            for (var i = 0; i < this.ecs.length; ++i) {
                if (this.ecs[i].loan[0] == rid) {
                    return this.ecs[i];
                }
            }
            return undefined;
        };
        LoansMgr.prototype.onClickLink = function (rid) {
            var ec = this.getEcByRid(rid);
            route.router.to(pages.PageUtil.getPageId(pages.PageType.loansDetail)).send(route.MSG.EC_DETAIL_ECINFO, {
                ec: ec,
                ecType: this.ecType
            });
            sidebar.switchPage(pages.PageType.loansDetail);
        };
        LoansMgr.prototype.refreshLoans = function (type) {
            this.tableAssist = pages.JQGridAssistantFactory.createTableAssist("lm-table", type);
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
            this.find("#lm-tableTable").jqGrid(this.tableAssist.decorate({
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
                autoScroll: true,
                singleselect: true,
                pager: '#lm-tablePager',
                //onCellSelect:(rowid,iCol,cellcontent,e)=>{
                //    if (iCol == 1){
                //        if (isLinked[rowid]){
                //            alert(rowid + " " +  iCol);
                //        }
                //    }
                //},
                onSortCol: function (index, iCol, sortorder) {
                    setTimeout(function () {
                        var rids = $("#lm-tableTable").getDataIDs();
                        for (var i = 0; i < rids.length; ++i) {
                            if (undefined != isLinked[rids[i]]) {
                                $("#lm-tableTable").setCell(rids[i], 1, "<div style='color:blue;cursor:pointer' " +
                                    "onclick='pages.LoansMgr.ins.onClickLink(" + rids[i] + ")'>" + isLinked[rids[i]] + "</div>");
                            }
                        }
                    }, 0);
                },
                onPaging: function (btn) {
                    setTimeout(function () {
                        var rids = $("#lm-tableTable").getDataIDs();
                        for (var i = 0; i < rids.length; ++i) {
                            if (undefined != isLinked[rids[i]]) {
                                $("#lm-tableTable").setCell(rids[i], 1, "<div style='color:blue;cursor:pointer' " +
                                    "onclick='pages.LoansMgr.ins.onClickLink(" + rids[i] + ")'>" + isLinked[rids[i]] + "</div>");
                            }
                        }
                    }, 0);
                }
            }));
            this.find("th input[role='checkbox']").hide();
            var rids = this.find("#lm-tableTable").getDataIDs();
            for (var i = 0; i < rids.length; ++i) {
                if (undefined != isLinked[rids[i]]) {
                    this.find("#lm-tableTable").setCell(rids[i], 1, "<div style='color:blue;cursor:pointer' " +
                        "onclick='pages.LoansMgr.ins.onClickLink(" + rids[i] + ")'>" + isLinked[rids[i]] + "</div>");
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
    pages.LoansMgr = LoansMgr;
})(pages || (pages = {}));
