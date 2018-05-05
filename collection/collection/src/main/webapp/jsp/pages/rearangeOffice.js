var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
///<reference path="pages.ts"/>
///<reference path="../pageSidebar.ts"/>
var pages;
(function (pages) {
    var EntrustedCase = collection.EntrustedCase;
    var Account = collection.Account;
    var EntrustedCaseManager = collection.EntrustedCaseManager;
    var RearangeOffice = (function (_super) {
        __extends(RearangeOffice, _super);
        function RearangeOffice(page) {
            var _this = _super.call(this, page) || this;
            _this.selAll = false;
            $("#" + pages.PageUtil.getPageId(_this.page) + " .dowebok input").labelauty();
            $('#ro-WiredWizard').wizard();
            $('#ro-WiredWizard').on('change', function (evt, data) {
                if (data.direction == 'next') {
                    if (data.step == 1) {
                        _this.selectedEcs = _this.getSelectedEC();
                        if (_this.selectedEcs.length == 0) {
                            pages.Toast.warning('请选择要分配的委案');
                            evt.preventDefault();
                        }
                    }
                    else if (data.step == 2) {
                        var opts = _this.find('#ro-treeOrg').tree("selectedItems");
                        if (opts.length == 0) {
                            pages.Toast.warning('请选指定接收人');
                            evt.preventDefault();
                        }
                    }
                }
            });
            _this.find(".dowebok input").on("click", function () {
                var type = _this.find(".dowebok input:checked").attr("myid");
                if (type != _this.ecType) {
                    _this.refresh();
                }
            });
            $('#ro-WiredWizard').on('changed', function (evt) {
                if ($('#ro-WiredWizard').wizard('selectedItem').step == 3) {
                    _this.onStep3();
                }
            });
            $('#ro-WiredWizard').on('finished.fu.wizard', function (evt, data) {
                _this.updateOwner();
            });
            return _this;
        }
        RearangeOffice.prototype.onStep3 = function () {
            var opt = this.find('#ro-treeOrg').tree("selectedItems")[0];
            for (var i = 0; i < this.usrs.length; ++i) {
                if (opt.additionalParameters.id == this.usrs[i].id) {
                    this.selectedUser = this.usrs[i];
                    break;
                }
            }
            this.find("#ro-wiredstep3 .alert").text("共计将如下 " + this.selectedEcs.length + " 条委案分配给 " + this.selectedUser.orgName + " 内勤人员 " + this.selectedUser.name + "。");
            var tableAssist = pages.JQGridAssistantFactory.createTableAssist("ro-ensure", this.ecType);
            var loans = [];
            for (var i = 0; i < this.selectedEcs.length; ++i) {
                loans.push(this.selectedEcs[i].loan);
            }
            $("#ro-ensureTable").jqGrid(tableAssist.decorate({
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
                rowList: [10, 20, 50, 100],
                autoScroll: true,
                multiselect: false,
                pager: '#ro-ensurePager'
            }));
            //if ($("#ro-ensure-outer").parent().width() != $("#ro-ensure-outer" ).width()) {
            //    $("#ro-ensureTable").setGridWidth($("#ro-ensure-outer").parent().width());
            //}
        };
        RearangeOffice.prototype.goStep1 = function () {
            var step = this.find('#ro-WiredWizard').wizard('selectedItem').step;
            while (step > 1) {
                --step;
                this.find('#ro-WiredWizard').wizard("previous");
            }
        };
        RearangeOffice.prototype.getTree = function (usrs, orgs, pOrg) {
            var tree = [];
            if (orgs != undefined) {
                for (var i = 0; i < orgs.length; ++i) {
                    tree.push({
                        name: orgs[i].name + '<div class="tree-actions"></div>',
                        type: 'folder',
                        additionalParameters: { org: orgs[i] }
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
        RearangeOffice.prototype.onRefresh = function () {
            var _this = this;
            this.goStep1();
            var type = this.find(".dowebok input:checked").attr("myid");
            var opt = {};
            EntrustedCase.search(type, opt).done(function (ecs) {
                _this.ecs = ecs;
                _this.ecType = type;
                _this.doRefresh();
            });
            $.when(Account.getUsers(["/ec/answer"]), Account.getOrgs())
                .done(function (usrs, orgs) {
                _this.usrs = usrs;
                _this.orgs = orgs;
                var treeDataSource = {
                    data: function (options, callback) {
                        if (options.additionalParameters == undefined) {
                            callback({ data: _this.getTree(usrs, orgs) });
                        }
                        else {
                            callback({ data: _this.getTree(usrs, options.additionalParameters.org.subOrgs, options.additionalParameters.org) });
                        }
                    }
                };
                _this.find('#ro-treeOrg').tree({
                    dataSource: treeDataSource,
                    multiSelect: false,
                    loadingHTML: '<div class="tree-loading"><i class="fa fa-rotate-right fa-spin"></i></div>'
                });
            });
        };
        RearangeOffice.prototype.onShown = function () {
            this.adjustStep1Width();
        };
        RearangeOffice.prototype.adjustStep1Width = function () {
            if ($("#ro-allLoans").width() != $("#ro-allLoans").children().eq(0).width()) {
                $("#ro-tbAllLoansTable").setGridWidth($("#ro-allLoans").width());
            }
        };
        RearangeOffice.prototype.indexOf = function (arr, val) {
            for (var i = 0; i < arr.length; i++) {
                if (arr[i] == val) {
                    return i;
                }
            }
            return -1;
        };
        RearangeOffice.prototype.getSelectedEC = function () {
            if (this.selAll) {
                return this.ecs;
            }
            else {
                var ids = [].concat($("#ro-tbAllLoansTable").jqGrid('getGridParam', 'selarrrow'));
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
        RearangeOffice.prototype.doRefresh = function () {
            var _this = this;
            var tableAssist = pages.JQGridAssistantFactory.createTableAssist("ro-tbAllLoans", this.ecType, ["内勤人员"]);
            var loans = [];
            for (var i = 0; i < this.ecs.length; ++i) {
                loans.push([this.ecs[i].loan[0], this.ecs[i].owner].concat(this.ecs[i].loan.slice(1)));
            }
            $("#ro-tbAllLoansTable").jqGrid(tableAssist.decorate({
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
                rowList: [10, 20, 50, 100],
                autoScroll: true,
                multiselect: true,
                onSelectAll: function (rowids, state) {
                    _this.selAll = state;
                },
                pager: '#ro-tbAllLoansPager'
            }));
            this.adjustStep1Width();
        };
        RearangeOffice.prototype.updateOwner = function () {
            var _this = this;
            var ecmis = [];
            for (var i = 0; i < this.selectedEcs.length; ++i) {
                ecmis.push({
                    id: this.selectedEcs[i].managerId,
                    ownerId: this.selectedUser.id
                });
            }
            EntrustedCaseManager.update(ecmis).done(function (ret) {
                if (ret.code == 0) {
                    pages.Toast.success('内勤人员调整成功');
                    _this.refresh();
                }
            });
        };
        RearangeOffice.ins = new RearangeOffice(pages.PageType.rearangeOffice);
        return RearangeOffice;
    }(pages.PageImpl));
})(pages || (pages = {}));
