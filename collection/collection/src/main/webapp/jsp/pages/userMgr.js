var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
///<reference path="pages.ts"/>
var pages;
(function (pages) {
    var UserMgr = (function (_super) {
        __extends(UserMgr, _super);
        function UserMgr(page) {
            var _this = this;
            _super.call(this, page);
            this.find("#um-createUser").click(function () {
                _this.onclickCreateUser();
                return false;
            });
            this.find("#um-editUser").click(function () {
                _this.onclickEditUser();
                return false;
            });
            this.find("#um-Orgs").append("<select id='um-org-sel' class='col-xs-12 col-md-12'></select>");
            collection.Account.getOrgs()
                .done(function (orgs) {
                _this.orgs = orgs;
                _this.bindTree(_this.orgs);
            });
        }
        UserMgr.prototype.bindTree = function (orgs) {
            if (orgs != undefined) {
                for (var i = 0; i < orgs.length; ++i) {
                    this.find("#um-org-sel").append("<option value='" + orgs[i].id + "'><div style='font-weight: bold'>" + orgs[i].name + "</div></option>");
                    this.bindTree(orgs[i].subOrgs);
                }
            }
        };
        UserMgr.prototype.onRefresh = function () {
            var _this = this;
            collection.Account.getUsers()
                .done(function (usrs) {
                _this.updateUserTable(usrs);
            });
        };
        UserMgr.prototype.checkUserInfo = function () {
            var cu = {
                name: $("#um-msgCU #um-userame").val(),
                password: $("#um-msgCU #um-password").val(),
                position: $("#um-msgCU #um-position").val(),
                orgId: parseInt($("#um-msgCU #um-org-sel").val()),
                roles: []
            };
            $("#um-msgCU .form-group input[type=checkbox]:checked").each(function (e, item) {
                cu.roles.push(parseInt($(item).val()));
            });
            if (cu.name == "") {
                pages.Toast.warning("请填写用户名");
                return null;
            }
            if (cu.password == "") {
                pages.Toast.warning("请填写密码");
                return null;
            }
            if (cu.password != $("#um-msgCU #um-confirmPassword").val()) {
                pages.Toast.warning("密码与确认密码不一致");
                return null;
            }
            if (cu.position == "") {
                pages.Toast.warning("请填写职位信息");
                return null;
            }
            if (cu.roles.length == 0) {
                pages.Toast.warning("请选择角色");
                return null;
            }
            return cu;
        };
        UserMgr.prototype.onclickCreateUser = function () {
            var _this = this;
            $("#um-createUserDialog").children(0).attr("id", "um-msgCU");
            var dialog = bootbox.dialog({
                message: $("#um-createUserDialog").html(),
                title: "创建用户",
                className: "modal-darkorange",
                buttons: {
                    success: {
                        label: "确定",
                        className: "btn-blue",
                        callback: function () {
                            var cu = _this.checkUserInfo();
                            if (null != cu) {
                                collection.Account.createUser(cu).done(function (ret) {
                                    if (ret.code == 0) {
                                        pages.Toast.success("用户创建成功");
                                        _this.refresh();
                                        dialog.modal("hide");
                                    }
                                    else {
                                        pages.Toast.failed(ret.msg);
                                    }
                                });
                            }
                            return false;
                        }
                    },
                    "取消": {
                        className: "btn-default",
                        callback: function () {
                        }
                    }
                }
            });
            $("#um-createUserDialog").children(0).removeAttr("id");
        };
        UserMgr.prototype.createTableAssist = function (pName) {
            var parent = this.find("#" + pName);
            parent.empty();
            parent.append("<table id='" + pName + "Table'></table><div id='" + pName + "Pager'></div>");
            var titles = ["用户名", "组织名称", "角色", "职位"];
            var nodes = [];
            for (var i = 0; i < titles.length; ++i) {
                nodes.push(JQTable.Node.create({
                    name: titles[i],
                    width: 0,
                    isSortable: false,
                    align: JQTable.TextAlign.Left,
                }));
            }
            return new JQTable.JQGridAssistant(nodes, pName + "Table");
        };
        UserMgr.prototype.findUser = function (usrId) {
            for (var i = 0; i < this.usrs.length; ++i) {
                if (this.usrs[i].id == usrId) {
                    return this.usrs[i];
                }
            }
        };
        UserMgr.prototype.updateUserTable = function (usrs) {
            this.usrs = usrs;
            this.tableAssist = this.createTableAssist("um-tbUsers");
            var data = [];
            for (var i = 0; i < usrs.length; ++i) {
                var row = [];
                row.push(usrs[i].id);
                row.push(usrs[i].name);
                row.push(usrs[i].orgName);
                var role = "";
                for (var j = 0; j < usrs[i].roles.length; ++j) {
                    role += collection.protocol.ROLE[usrs[i].roles[j]] + ",";
                }
                if (role.length > 0) {
                    role = role.substring(0, role.length - 1);
                }
                row.push(role);
                row.push(usrs[i].position);
                data.push(row);
            }
            this.find("#um-tbUsersTable").jqGrid(this.tableAssist.decorate({
                data: this.tableAssist.getDataWithId(data),
                datatype: "local",
                drag: false,
                resize: false,
                viewrecords: true,
                autowidth: true,
                sortable: true,
                height: '100%',
                shrinkToFit: true,
                rowNum: 10,
                rowList: [10, 20, 50],
                autoScroll: true,
                singleselect: true,
                pager: '#um-tbUsersPager'
            }));
        };
        UserMgr.prototype.onclickEditUser = function () {
            var _this = this;
            var rids = this.tableAssist.getSelRows();
            if (rids.length == 0) {
                pages.Toast.warning("请选择要编辑的用户");
                return;
            }
            $("#um-createUserDialog").children(0).attr("id", "um-msgCU");
            var dialog = bootbox.dialog({
                message: $("#um-createUserDialog").html(),
                title: "编辑用户",
                className: "modal-darkorange",
                buttons: {
                    success: {
                        label: "确定",
                        className: "btn-blue",
                        callback: function () {
                            var cu = _this.checkUserInfo();
                            if (null != cu) {
                                var user = {
                                    id: rids[0],
                                    orgId: cu.orgId,
                                    password: cu.password,
                                    roles: cu.roles,
                                    position: cu.position
                                };
                                collection.Account.updateUsers([user]).done(function (ret) {
                                    if (ret.code == 0) {
                                        pages.Toast.success("用户修改成功");
                                        _this.refresh();
                                        dialog.modal("hide");
                                    }
                                    else {
                                        pages.Toast.failed(ret.msg);
                                    }
                                });
                            }
                            return false;
                        }
                    },
                    "取消": {
                        className: "btn-default",
                        callback: function () {
                        }
                    }
                }
            });
            var usr = this.findUser(rids[0]);
            setTimeout(function () {
                $("#um-msgCU  #um-userame").val(usr.name);
                $("#um-msgCU  #um-userame").attr("disabled", true);
                $("#um-msgCU #um-password").val(usr.password);
                $("#um-msgCU #um-position").val(usr.position);
                $("#um-msgCU #um-confirmPassword").val(usr.password);
                $("#um-msgCU #um-org-sel").val(usr.orgId);
                for (var i = 0; i < usr.roles.length; ++i) {
                    $("#um-msgCU .form-group input[type=checkbox][value=" + usr.roles[i] + "]").prop("checked", true);
                }
            }, 0);
            $("#um-createUserDialog").children(0).removeAttr("id");
        };
        UserMgr.ins = new UserMgr(pages.PageType.userMgr);
        return UserMgr;
    })(pages.PageImpl);
})(pages || (pages = {}));
