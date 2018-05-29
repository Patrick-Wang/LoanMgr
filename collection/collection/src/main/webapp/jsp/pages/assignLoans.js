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
    var AssignLoans = /** @class */ (function (_super) {
        __extends(AssignLoans, _super);
        function AssignLoans(page) {
            var _this = _super.call(this, page) || this;
            _this.selAll = false;
            _this.pageSize = 10;
            _this.pageNum = 0;
            $("#" + pages.PageUtil.getPageId(_this.page) + " .dowebok input").labelauty();
            $('#al-WiredWizard').wizard();
            $('#al-WiredWizard').on('change', function (evt, data) {
                if (data.direction == 'next') {
                    if (data.step == 1) {
                        _this.selectedEcs = _this.getSelectedEC();
                        if (_this.selectedEcs.length == 0) {
                            pages.Toast.warning('请选择要分配的委案');
                            evt.preventDefault();
                        }
                    }
                    else if (data.step == 2) {
                        var opts = $('#treeOrg').tree("selectedItems");
                        if (opts.length == 0) {
                            pages.Toast.warning('请选指定接收人');
                            evt.preventDefault();
                        }
                    }
                }
            });
            _this.find(".dowebok input").click(function () {
                _this.refresh();
            });
            $('#al-WiredWizard').on('changed', function (evt) {
                if ($('#al-WiredWizard').wizard('selectedItem').step == 3) {
                    _this.onStep3();
                }
            });
            _this.find("#qYqts").on("change", function () {
                _this.refresh();
            });
            _this.find("#assign-search-Btn").on("click", function () {
                _this.refresh();
            });
            $('#al-WiredWizard').on('finished.fu.wizard', function (evt, data) {
                _this.updateAssignee();
            });
            collection.EntrustedCase.getPch().done(function (pchs) {
                _this.find("#pch").empty();
                _this.find("#pch").append('<option value="none" selected="selected">----批次号----</option>');
                $(pchs).each(function (i, e) {
                    _this.find("#pch").append('<option value="' + e + '">' + e + '</option>');
                });
            });
            return _this;
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
                rowList: [10, 20, 50, 100],
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
        AssignLoans.prototype.parseYqts = function (opt) {
            opt.pageNum = this.pageNum;
            opt.pageSize = this.pageSize;
            var val = this.find("#qYqts").val();
            if ("none" == val) {
                return;
            }
            else if ("1" == val) {
                opt.yqtsEndClose = 90;
            }
            else if ("2" == val) {
                opt.yqtsStartOpen = 90;
                opt.yqtsEndClose = 120;
            }
            else if ("3" == val) {
                opt.yqtsStartOpen = 120;
                opt.yqtsEndClose = 180;
            }
            else if ("4" == val) {
                opt.yqtsStartOpen = 180;
                opt.yqtsEndClose = 240;
            }
            else if ("5" == val) {
                opt.yqtsStartOpen = 240;
                opt.yqtsEndClose = 360;
            }
            else if ("6" == val) {
                opt.yqtsStartOpen = 360;
            }
        };
        AssignLoans.prototype.onRefresh = function () {
            var _this = this;
            this.goStep1();
            var type = pages.PageUtil.jqPage(this.page).find(".dowebok input:checked").attr("myid");
            var opt = { myOwn: true };
            var val = this.find("#qWwjg").val();
            if (val && val != 'none') {
                opt.wwjg = val;
            }
            val = this.find("#pch").val();
            if (val && val != 'none') {
                opt.pch = val;
            }
            var opt = { myOwn: true, shuffle: true };
            this.parseYqts(opt);
            EntrustedCase.search(type, opt)
                .done(function (ecs) {
                _this.ecs = ecs;
                _this.ecType = type;
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
                            callback({ data: _this.getTree(usrs, options.additionalParameters.org.subOrgs, options.additionalParameters.org) });
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
            //if (this.selAll) {
            //    return this.ecs;
            //} else {
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
            //}
        };
        AssignLoans.prototype.doRefresh = function () {
            var _this = this;
            collection.EntrustedCase.getWwjgs(this.ecType).done(function (wwjgs) {
                var val = _this.find("#qWwjg").val();
                _this.find("#qWwjg").empty();
                _this.find("#qWwjg").append('<option value="none" selected="selected">----委外机构----</option>');
                $(wwjgs).each(function (i, e) {
                    if (val == e) {
                        _this.find("#qWwjg").append('<option value="' + e + '" selected="selected">' + e + '</option>');
                    }
                    else {
                        _this.find("#qWwjg").append('<option value="' + e + '" >' + e + '</option>');
                    }
                });
            });
            var tableAssist = pages.JQGridAssistantFactory.createTableAssist("tbAllLoans", this.ecType, ["内勤人员", "业务员"]);
            var loans = [];
            for (var i = 0; i < this.ecs.length; ++i) {
                if (!this.ecs[i].assignee) {
                    loans.push({
                        id: this.ecs[i].loan[0],
                        cell: [this.ecs[i].owner, this.ecs[i].assignee].concat(this.ecs[i].loan.slice(1))
                    });
                }
            }
            var tbData = null;
            if (this.ecs.length > 0) {
                tbData = {
                    records: this.ecs[0].records,
                    page: this.ecs[0].pageNum + 1,
                    total: this.ecs[0].pageCount,
                    rows: loans
                };
            }
            // PageUtil.shuffle(loans);
            $("#tbAllLoansTable").jqGrid(tableAssist.decorate({
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
                rowNum: 10,
                rowList: [10, 20, 50, 100],
                autoScroll: true,
                multiselect: true,
                onSelectAll: function (rowids, state) {
                    _this.selAll = state;
                },
                pager: '#tbAllLoansPager'
            }));
            if (this.ecs.length > 0) {
                tableAssist.addTableData(tbData);
            }
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
                    pages.Toast.success('委案分配成功');
                    _this.refresh();
                }
            });
        };
        AssignLoans.ins = new AssignLoans(pages.PageType.assignLoans);
        return AssignLoans;
    }(pages.PageImpl));
})(pages || (pages = {}));
