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
            this.find(".dowebok:eq(1) input").click(function () {
                var id = _this.find(".dowebok:eq(1) input:checked").attr("myid");
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
            collection.EntrustedCase.search(ecType, opt).done(function (ecs) {
                _this.ecs = ecs;
                _this.ecType = ecType;
                var index = collection.protocol.getTitles(_this.ecType).indexOf("委外机构");
                var wwjgChanged = false;
                $(_this.ecs).each(function (i, e) {
                    if (e.loan[index + 1] && _this.wwjgs.indexOf(e.loan[index + 1]) < 0) {
                        _this.wwjgs.push(e.loan[index + 1]);
                        wwjgChanged = true;
                    }
                });
                if (wwjgChanged) {
                    _this.updateWwjgs();
                }
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
            this.tableAssist = pages.JQGridAssistantFactory.createTableAssist("lm-table", type);
            var loans = [];
            var isLinked = {};
            var id = this.find(".dowebok:eq(1) input:checked").attr("myid");
            for (var i = 0; i < this.ecs.length; ++i) {
                if (this.ecs[i].loan[1]) {
                    if (this.isManager ||
                        this.isOwner && this.ecs[i].owner == context.userName ||
                        this.isAssigner && this.ecs[i].assignee == context.userName) {
                        isLinked[this.ecs[i].loan[0]] = this.ecs[i].loan[1];
                    }
                }
                if (id == 0) {
                    if (this.ecs[i].assignee == context.userName) {
                        loans.push(this.ecs[i].loan);
                    }
                }
                else if (id == 1) {
                    if (this.ecs[i].owner == context.userName) {
                        loans.push(this.ecs[i].loan);
                    }
                }
                else {
                    loans.push(this.ecs[i].loan);
                }
            }
            var base = this.find("#lm-export-Btn").length > 0 ? 1 : 0;
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
                rowList: [10, 20, 50],
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
                onSortCol: function (index, iCol, sortorder) {
                    setTimeout(function () {
                        var rids = $("#lm-tableTable").getDataIDs();
                        for (var i = 0; i < rids.length; ++i) {
                            if (undefined != isLinked[rids[i]]) {
                                $("#lm-tableTable").setCell(rids[i], base, "<div style='color:blue;cursor:pointer' " +
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
                                $("#lm-tableTable").setCell(rids[i], base, "<div style='color:blue;cursor:pointer' " +
                                    "onclick='pages.LoansMgr.ins.onClickLink(" + rids[i] + ")'>" + isLinked[rids[i]] + "</div>");
                            }
                        }
                    }, 0);
                }
            }));
            //this.find("th input[role='checkbox']").hide();
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
        LoansMgr.ins = new LoansMgr(pages.PageType.loansMgr);
        return LoansMgr;
    })(pages.PageImpl);
    pages.LoansMgr = LoansMgr;
})(pages || (pages = {}));
