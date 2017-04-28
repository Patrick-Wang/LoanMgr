var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
///<reference path="pages.ts"/>
///<reference path="../pageSidebar.ts"/>
var pages;
(function (pages) {
    var EntrustedCase = collection.EntrustedCase;
    var Account = collection.Account;
    var EntrustedCaseManager = collection.EntrustedCaseManager;
    var AssignLoans = (function (_super) {
        __extends(AssignLoans, _super);
        function AssignLoans(page) {
            var _this = this;
            _super.call(this, page);
            this.selAll = false;
            $("#" + pages.PageUtil.getPageId(this.page) + " .dowebok input").labelauty();
            $('#al-WiredWizard').wizard();
            $('#al-WiredWizard').on('change', function (evt, data) {
                if (data.direction == 'next') {
                    if (data.step == 1) {
                        _this.selectedEcs = _this.getSelectedEC();
                        if (_this.selectedEcs.length == 0) {
                            Notify('请选择要分配的委案', 'top-right', '5000', 'warning', 'fa-warning', true);
                            evt.preventDefault();
                        }
                    }
                    else if (data.step == 2) {
                        var opts = $('#treeOrg').tree("selectedItems");
                        if (opts.length == 0) {
                            Notify('请选指定接收人', 'top-right', '5000', 'warning', 'fa-warning', true);
                            evt.preventDefault();
                        }
                    }
                }
            });
            $('#al-WiredWizard').on('changed', function (evt) {
                if ($('#al-WiredWizard').wizard('selectedItem').step == 3) {
                    _this.onStep3();
                }
            });
            $('#al-WiredWizard').on('finished.fu.wizard', function (evt, data) {
                _this.updateAssignee();
            });
        }
        AssignLoans.prototype.onStep3 = function () {
            //PageUtil.jqPage(this.page).find(".btn-next").text("修改");
            var opt = $('#treeOrg').tree("selectedItems")[0];
            for (var i = 0; i < this.usrs.length; ++i) {
                if (opt.additionalParameters.id == this.usrs[i].id) {
                    this.selectedUser = this.usrs[i];
                    break;
                }
            }
            $("#alwiredstep3 .alert").text("共计将如下 " + this.selectedEcs.length + " 条委案分配给 " + this.selectedUser.orgName + " 业务员 " + this.selectedUser.name + "。");
            var tableAssist = pages.JQGridAssistantFactory.createTableAssist("al-ensure", this.ecType);
            var loans = [];
            for (var i = 0; i < this.selectedEcs.length; ++i) {
                loans.push(this.selectedEcs[i].loan);
            }
            $("#al-ensureTable").jqGrid(tableAssist.decorate({
                data: tableAssist.getDataWithId(loans),
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
                multiselect: false,
                pager: '#al-ensurePager'
            }));
            if ($("#al-ensure-outer").parent().width() != $("##al-ensure-outer").width()) {
                $("#al-ensureTable").setGridWidth($("#al-ensure-outer").parent().width());
            }
        };
        AssignLoans.prototype.goStep1 = function () {
            var step = $('#al-WiredWizard').wizard('selectedItem').step;
            while (step > 1) {
                --step;
                $('#al-WiredWizard').wizard("previous");
            }
        };
        AssignLoans.prototype.getTree = function (usrs, orgs, pOrg) {
            var tree = [];
            if (orgs != undefined) {
                for (var i = 0; i < orgs.length; ++i) {
                    tree.push({
                        name: orgs[i].name + '<div class="tree-actions"></div>',
                        type: 'folder',
                        additionalParameters: { id: orgs[i].id }
                    });
                }
            }
            if (pOrg != undefined) {
                for (var j = 0; j < usrs.length; ++j) {
                    if (usrs[j].orgId == pOrg.id) {
                        tree.push({
                            name: '<i class="fa fa-user gold"></i> ' + usrs[j].name,
                            type: 'item',
                            additionalParameters: { id: usrs[j].id }
                        });
                    }
                }
            }
            return tree;
        };
        AssignLoans.prototype.onRefresh = function () {
            var _this = this;
            this.goStep1();
            var type = pages.PageUtil.jqPage(this.page).find(".dowebok input:checked").attr("myid");
            var opt = {};
            EntrustedCase.search(type, opt).done(function (ecs) {
                _this.ecs = [];
                _this.ecType = type;
                for (var i = 0; i < ecs.length; ++i) {
                    if (ecs[i].owner == context.userName) {
                        _this.ecs.push(ecs[i]);
                    }
                }
                _this.doRefresh();
            });
            $.when(Account.getUsers(["/ec/ask"]), Account.getOrgs())
                .done(function (usrs, orgs) {
                _this.usrs = usrs;
                _this.orgs = orgs;
                var treeDataSource = {
                    data: function (options, callback) {
                        if (options.additionalParameters == undefined) {
                            callback({ data: _this.getTree(usrs, orgs) });
                        }
                        else {
                            for (var i = 0; i < orgs.length; ++i) {
                                if (orgs[i].id == options.additionalParameters.id) {
                                    callback({ data: _this.getTree(usrs, orgs[i].subOrgs, orgs[i]) });
                                    break;
                                }
                            }
                        }
                    }
                };
                $('#treeOrg').tree({
                    dataSource: treeDataSource,
                    multiSelect: false,
                    loadingHTML: '<div class="tree-loading"><i class="fa fa-rotate-right fa-spin"></i></div>'
                });
            });
        };
        AssignLoans.prototype.onShown = function () {
            this.adjustStep1Width();
        };
        AssignLoans.prototype.adjustStep1Width = function () {
            if ($("#allLoans").width() != $("#allLoans").children().eq(0).width()) {
                $("#tbAllLoansTable").setGridWidth($("#allLoans").width());
            }
        };
        AssignLoans.prototype.indexOf = function (arr, val) {
            for (var i = 0; i < arr.length; i++) {
                if (arr[i] == val) {
                    return i;
                }
            }
            return -1;
        };
        AssignLoans.prototype.getSelectedEC = function () {
            if (this.selAll) {
                return this.ecs;
            }
            else {
                var ids = [].concat($("#tbAllLoansTable").jqGrid('getGridParam', 'selarrrow'));
                var ret = [];
                for (var i = 0; i < this.ecs.length; ++i) {
                    var index = this.indexOf(ids, this.ecs[i].loan[0]);
                    if (index >= 0) {
                        ids.splice(index, 1);
                        ret.push(this.ecs[i]);
                    }
                }
                return ret;
            }
        };
        AssignLoans.prototype.doRefresh = function () {
            var _this = this;
            var tableAssist = pages.JQGridAssistantFactory.createTableAssist("tbAllLoans", this.ecType, ["指派人", "完成人"]);
            var loans = [];
            for (var i = 0; i < this.ecs.length; ++i) {
                loans.push([this.ecs[i].loan[0], this.ecs[i].owner, this.ecs[i].assignee].concat(this.ecs[i].loan.slice(1)));
            }
            $("#tbAllLoansTable").jqGrid(tableAssist.decorate({
                data: tableAssist.getDataWithId(loans),
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
                multiselect: true,
                onSelectAll: function (rowids, state) {
                    _this.selAll = state;
                },
                pager: '#tbAllLoansPager'
            }));
            this.adjustStep1Width();
        };
        AssignLoans.prototype.updateAssignee = function () {
            var _this = this;
            var ecmis = [];
            for (var i = 0; i < this.selectedEcs.length; ++i) {
                ecmis.push({
                    id: this.selectedEcs[i].managerId,
                    assigneeId: this.selectedUser.id
                });
            }
            EntrustedCaseManager.update(ecmis).done(function (ret) {
                if (ret.code == 0) {
                    Notify('委案分配成功', 'top-right', '5000', 'success', 'fa-check', true);
                    _this.refresh();
                }
            });
        };
        AssignLoans.ins = new AssignLoans(pages.PageType.assignLoans);
        return AssignLoans;
    })(pages.PageImpl);
})(pages || (pages = {}));
