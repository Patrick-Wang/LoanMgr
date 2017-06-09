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
            this.isManager = false;
            this.wwjgs = [];
            this.usrs = [];
            this.pageSize = 10;
            this.pageNum = 0;
            this.find(".dowebok input").labelauty();
            route.router.register(new route.Receiver(pages.PageUtil.getPageId(this.page), function (e) {
                switch (e.id) {
                    case route.MSG.CONSOLE_ASSIGNER_UNRESPMSGS:
                        _this.isAssigner = true;
                        _this.find(".dowebok:eq(1) input:eq(0)").prop("checked", true).parent().show();
                        _this.find(".dowebok:eq(1) input:eq(2)").parent().show();
                        break;
                    case route.MSG.CONSOLE_OWNER_UNREADMSGS:
                        _this.find(".dowebok:eq(1) input:eq(1)").prop("checked", true).parent().show();
                        _this.find(".dowebok:eq(1) input:eq(2)").parent().show();
                        _this.isOwner = true;
                        break;
                    case route.MSG.CONSOLE_IS_MANAGER:
                        _this.find(".dowebok:eq(1) input:eq(2)").prop("checked", true);
                        _this.isManager = true;
                    case route.MSG.LOANMGR_GET_QOPT:
                        return _this.getQOpt();
                    case route.MSG.LOANMGR_GET_SELECTED:
                        return {
                            type: _this.ecType,
                            ids: _this.find("#lm-tableTable").jqGrid('getGridParam', 'selarrrow')
                        };
                    case route.MSG.LOANMGR_GET_TYPE:
                        return _this.find(".dowebok:eq(0) input:checked").attr("myid");
                }
            }));
            this.find(".dowebok:eq(0) input").click(function () {
                var ecType = _this.find(".dowebok:eq(0) input:checked").attr("myid");
                switch (parseInt(ecType)) {
                    case collection.protocol.EntrustedCaseType.carLoan:
                        _this.find("#qCode").prev().text("车牌号");
                        break;
                    case collection.protocol.EntrustedCaseType.creditCard:
                        _this.find("#qCode").prev().text("卡号");
                        break;
                    case collection.protocol.EntrustedCaseType.creditLoan:
                        _this.find("#qCode").prev().text("客户号");
                        break;
                }
                _this.refresh();
            });
            this.find("#lm-search-Btn").click(function () {
                _this.refresh();
            });
            this.find(".dowebok:eq(1) input").click(function () {
                _this.refresh();
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
            var assid = this.qOpt("qYwy");
            opt.assignee = assid ? parseInt(assid) : undefined;
            var id = this.find(".dowebok:eq(1) input:checked").attr("myid");
            if (id == 0) {
                opt.assignToMe = true;
            }
            else if (id == 1) {
                opt.myOwn = true;
            }
            opt.pageNum = this.pageNum;
            opt.pageSize = this.pageSize;
            return opt;
        };
        LoansMgr.prototype.onRefresh = function () {
            //if (this.requestEvent){
            //    this.find(".buttons-preview").hide();
            //    this.find(".buttons-preview:eq(1)").show();
            //}else{
            //    this.find(".buttons-preview").hide();
            //    this.find(".buttons-preview:eq(0)").show();
            //}
            var _this = this;
            var ecType = this.find(".dowebok:eq(0) input:checked").attr("myid");
            var opt = this.getQOpt();
            collection.EntrustedCase.getWwjgs(ecType).done(function (wwjgs) {
                _this.wwjgs = wwjgs;
                _this.updateWwjgs();
            });
            if (authority.ping("/ec/answer") || authority.ping("/user/manager")) {
                collection.Account.getUsers().done(function (usrs) {
                    _this.usrs = usrs;
                    _this.updateUsrs();
                });
            }
            else {
                this.find("#qYwy").parent().parent().remove();
            }
            collection.EntrustedCase.search(ecType, opt).done(function (ecs) {
                _this.ecs = ecs;
                _this.ecType = ecType;
                _this.refreshLoans(_this.ecType);
            });
        };
        LoansMgr.prototype.onShown = function () {
            //if (this.requestEvent){
            //    this.find(".buttons-preview").hide();
            //    this.find(".buttons-preview:eq(1)").show();
            //}else{
            //    this.find(".buttons-preview").hide();
            //    this.find(".buttons-preview:eq(0)").show();
            //}
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
            var _this = this;
            this.tableAssist = pages.JQGridAssistantFactory.createTableAssist("lm-table", type);
            var isLinked = {};
            var tbData = null;
            if (this.ecs.length > 0) {
                tbData = {
                    records: this.ecs[0].records,
                    page: this.ecs[0].pageNum + 1,
                    total: this.ecs[0].pageCount,
                    rows: []
                };
            }
            for (var i = 0; i < this.ecs.length; ++i) {
                var r = {
                    id: this.ecs[i].loan[0],
                    cell: this.ecs[i].loan.slice(1)
                };
                tbData.rows.push(r);
                if (this.isManager ||
                    this.isOwner && this.ecs[i].owner == context.userName ||
                    this.isAssigner && this.ecs[i].assignee == context.userName) {
                    isLinked[this.ecs[i].loan[0]] = this.ecs[i].loan[1];
                }
            }
            var base = authority.ping("/ec/export") ? 1 : 0;
            this.find("#lm-tableTable").jqGrid(this.tableAssist.decorate({
                datatype: function (postdata) {
                    _this.pageSize = postdata.rows;
                    _this.pageNum = postdata.page - 1;
                    _this.refresh();
                },
                drag: false,
                resize: false,
                autowidth: true,
                viewrecords: true,
                sortable: true,
                height: '100%',
                shrinkToFit: false,
                rowNum: this.pageSize,
                rowList: [10, 20, 50, 100],
                autoScroll: true,
                multiselect: base > 0,
                pager: '#lm-tablePager'
            }));
            if (this.ecs.length > 0) {
                this.tableAssist.addTableData(tbData);
            }
            var rids = this.find("#lm-tableTable").getDataIDs();
            for (var i = 0; i < rids.length; ++i) {
                if (undefined != isLinked[rids[i]]) {
                    this.find("#lm-tableTable").setCell(rids[i], base, "<div style='color:blue;cursor:pointer' " +
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
        LoansMgr.prototype.updateWwjgs = function () {
            var _this = this;
            var val = this.find("#qWwjg").val();
            this.find("#qWwjg").empty();
            this.find("#qWwjg").append('<option value="none" />');
            $(this.wwjgs).each(function (i, e) {
                if (val == e) {
                    _this.find("#qWwjg").append('<option value="' + e + '" selected="selected">' + e + '</option>');
                }
                else {
                    _this.find("#qWwjg").append('<option value="' + e + '" >' + e + '</option>');
                }
            });
        };
        LoansMgr.prototype.updateUsrs = function () {
            var _this = this;
            var val = this.find("#qYwy").val();
            this.find("#qYwy").empty();
            this.find("#qYwy").append('<option value="none" />');
            $(this.usrs).each(function (i, e) {
                if (e.roles.indexOf(collection.protocol.RoleEN.OUTSIDE) >= 0) {
                    if (val == e.id) {
                        _this.find("#qYwy").append('<option value="' + e.id + '" selected="selected">' + e.name + '</option>');
                    }
                    else {
                        _this.find("#qYwy").append('<option value="' + e.id + '" >' + e.name + '</option>');
                    }
                }
            });
        };
        LoansMgr.ins = new LoansMgr(pages.PageType.loansMgr);
        return LoansMgr;
    })(pages.PageImpl);
    pages.LoansMgr = LoansMgr;
})(pages || (pages = {}));
