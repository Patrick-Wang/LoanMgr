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
    var AssignLoans = (function (_super) {
        __extends(AssignLoans, _super);
        function AssignLoans(page) {
            var _this = this;
            _super.call(this, page);
            this.selAll = false;
            $("#" + pages.PageUtil.getPageId(this.page) + " .dowebok input").labelauty();
            pages.PageUtil.jqPage(this.page).find(".btn-prev").click(function () {
                if (_this.getCurrentStep() == 2) {
                    pages.PageUtil.jqPage(_this.page).find("#wiredstep2").removeClass("active");
                    pages.PageUtil.jqPage(_this.page).find("#wiredstep1").addClass("active");
                    pages.PageUtil.jqPage(_this.page).find(".steps li:eq(1)").removeClass("active");
                }
                else if (_this.getCurrentStep() == 3) {
                    pages.PageUtil.jqPage(_this.page).find("#wiredstep3").removeClass("active");
                    pages.PageUtil.jqPage(_this.page).find("#wiredstep2").addClass("active");
                    pages.PageUtil.jqPage(_this.page).find(".steps li:eq(2)").removeClass("active");
                }
            });
            pages.PageUtil.jqPage(this.page).find(".btn-next").click(function () {
                if (_this.getCurrentStep() == 1) {
                    pages.PageUtil.jqPage(_this.page).find("#wiredstep1").removeClass("active");
                    pages.PageUtil.jqPage(_this.page).find("#wiredstep2").addClass("active");
                    pages.PageUtil.jqPage(_this.page).find(".steps li:eq(1)").addClass("active");
                }
                else if (_this.getCurrentStep() == 2) {
                    pages.PageUtil.jqPage(_this.page).find("#wiredstep2").removeClass("active");
                    pages.PageUtil.jqPage(_this.page).find("#wiredstep3").addClass("active");
                    pages.PageUtil.jqPage(_this.page).find(".steps li:eq(2)").addClass("active");
                }
            });
        }
        AssignLoans.prototype.getCurrentStep = function () {
            if (pages.PageUtil.jqPage(this.page).find("#wiredstep1").hasClass("active")) {
                return 1;
            }
            if (pages.PageUtil.jqPage(this.page).find("#wiredstep2").hasClass("active")) {
                return 2;
            }
            if (pages.PageUtil.jqPage(this.page).find("#wiredstep3").hasClass("active")) {
                return 3;
            }
        };
        AssignLoans.prototype.getTree = function (usrs, orgs) {
            var tree = {};
            for (var i = 0; i < orgs.length; ++i) {
                var treeItem = {
                    name: orgs[i].name + '<div class="tree-actions"></div>',
                    type: 'folder',
                    additionalParameters: { id: orgs[i].id }
                };
                //if (orgs[i].subOrgs != undefined && orgs[i].subOrgs.length > 0){
                //    treeItem.additionalParameters.children = this.getTree(usrs, orgs[i].subOrgs);
                //}
                //if (treeItem.nodes == undefined){
                //    treeItem.nodes = [];
                //}
                for (var j = 0; j < usrs.length; ++j) {
                    if (usrs[j].orgId == orgs[i].id) {
                        treeItem.nodes.push({
                            text: '<i class="fa fa-user gold"></i> ' + usrs[j].name,
                            type: 'item',
                            additionalParameters: { id: usrs[j].id }
                        });
                    }
                }
                tree.push(treeItem);
            }
            return tree;
        };
        AssignLoans.prototype.onRefresh = function () {
            var _this = this;
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
            $.when(Account.getUsers(), Account.getOrgs())
                .done(function (usrs, orgs) {
                var DataSourceTree = function (options) {
                    this._data = options.data;
                    this._delay = options.delay;
                };
                DataSourceTree.prototype = {
                    data: function (options, callback) {
                        var self = this;
                        setTimeout(function () {
                            var data = $.extend(true, [], self._data);
                            callback({ data: data });
                        }, this._delay);
                    }
                };
                var treeDataSource = { data: function (options, callback) {
                        if (options.additionalParameters == undefined) {
                            callback({ data: _this.getTree(usrs, orgs) });
                        }
                        else {
                            for (var i = 0; i < orgs.length; ++i) {
                                if (orgs[i].id == options.additionalParameters.id) {
                                    if (orgs[i].subOrgs != undefined && orgs[i].subOrgs.length > 0) {
                                        data: _this.getTree(usrs, orgs[i].subOrgs);
                                    }
                                    break;
                                }
                            }
                        }
                    } };
                $('#tbOrgs').tree({
                    dataSource: treeDataSource,
                    multiSelect: false,
                    loadingHTML: '<div class="tree-loading"><i class="fa fa-rotate-right fa-spin"></i></div>'
                });
            });
        };
        AssignLoans.prototype.onShown = function () {
            this.adjustWidth("allLoans", $("#tbAllLoansTable"));
        };
        AssignLoans.prototype.adjustWidth = function (name, jqgrid) {
            if ($("#" + name).width() != $("#" + name).children().eq(0).width()) {
                jqgrid.setGridWidth($("#" + name).width());
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
                var ids = $("#tbAllLoansTable").jqGrid('getGridParam', 'selarrrow');
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
            var tableAssist = pages.JQGridAssistantFactory.createTableAssist("tbAllLoans", this.ecType);
            var loans = [];
            for (var i = 0; i < this.ecs.length; ++i) {
                loans.push(this.ecs[i].loan);
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
            this.adjustWidth("allLoans", $("#tbAllLoansTable"));
        };
        AssignLoans.ins = new AssignLoans(pages.PageType.assignLoans);
        return AssignLoans;
    })(pages.PageImpl);
})(pages || (pages = {}));
