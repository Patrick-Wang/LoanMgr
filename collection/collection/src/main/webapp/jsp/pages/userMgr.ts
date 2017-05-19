///<reference path="pages.ts"/>
module pages {
    import CreateUser = collection.protocol.CreateUser;
    class UserMgr extends PageImpl {
        static ins = new UserMgr(PageType.userMgr);
        tableAssist:JQTable.JQGridAssistant;
        orgs:collection.protocol.Organization[];
        usrs:collection.protocol.User[];

        constructor(page:pages.PageType) {
            super(page);
            this.find("#um-createUser").click(()=> {
                this.onclickCreateUser();
                return false;
            });
            this.find("#um-editUser").click(()=> {
                this.onclickEditUser();
                return false;
            });

            this.find("#um-Orgs").append("<select id='um-org-sel' class='col-xs-12 col-md-12'></select>");

            collection.Account.getOrgs()
                .done((orgs:collection.protocol.Organization[])=> {
                    this.orgs = orgs;
                    this.bindTree(this.orgs);
                });

        }

        private bindTree(orgs:collection.protocol.Organization[]):any {
            if (orgs != undefined) {
                for (let i = 0; i < orgs.length; ++i) {
                    this.find("#um-org-sel").append("<option value='" + orgs[i].id + "'><div style='font-weight: bold'>" + orgs[i].name + "</div></option>");
                    this.bindTree(orgs[i].subOrgs);
                }
            }
        }

        protected onRefresh():void {
            collection.Account.getUsers()
                .done((usrs:collection.protocol.User[])=> {
                    this.updateUserTable(usrs);
                });


        }

        private checkUserInfo():CreateUser {
            let cu:CreateUser = {
                name: $("#um-msgCU #um-userame").val(),
                password: $("#um-msgCU #um-password").val(),
                position: $("#um-msgCU #um-position").val(),
                orgId: parseInt($("#um-msgCU #um-org-sel").val()),
                roles: []
            };
            $("#um-msgCU .form-group input[type=checkbox]:checked").each((e, item)=> {
                cu.roles.push(parseInt($(item).val()));
            });

            if (cu.name == "") {
                Toast.warning("请填写用户名");
                return null;
            }

            if (cu.password == "") {
                Toast.warning("请填写密码");
                return null;
            }

            if (cu.password != $("#um-msgCU #um-confirmPassword").val()) {
                Toast.warning("密码与确认密码不一致");
                return null;
            }

            if (cu.position == "") {
                Toast.warning("请填写职位信息");
                return null;
            }

            if (cu.roles.length == 0) {
                Toast.warning("请选择角色");
                return null;
            }
            return cu;
        }

        private onclickCreateUser():void {
            $("#um-createUserDialog").children(0).attr("id", "um-msgCU");
            let dialog = bootbox.dialog({
                message: $("#um-createUserDialog").html(),
                title: "创建用户",
                className: "modal-darkorange",
                buttons: {
                    success: {
                        label: "确定",
                        className: "btn-blue",
                        callback: () => {
                            let cu:CreateUser = this.checkUserInfo();
                            if (null != cu) {
                                collection.Account.createUser(cu).done((ret:collection.protocol.Result)=> {
                                    if (ret.code == 0) {
                                        Toast.success("用户创建成功");
                                        this.refresh();
                                        dialog.modal("hide");
                                    } else {
                                        Toast.failed(ret.msg);
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
        }

        createTableAssist(pName:string):JQTable.JQGridAssistant {
            var parent = this.find("#" + pName);
            parent.empty();
            parent.append("<table id='" + pName + "Table'></table><div id='" + pName + "Pager'></div>");
            let titles = ["用户名", "组织名称", "角色", "职位"];
            let nodes = [];
            for (let i = 0; i < titles.length; ++i) {
                nodes.push(JQTable.Node.create({
                    name: titles[i],
                    width: 0,
                    isSortable: false,
                    align: JQTable.TextAlign.Left,
                }));
            }
            return new JQTable.JQGridAssistant(nodes, pName + "Table");
        }

        private findUser(usrId:number):collection.protocol.User {
            for (let i = 0; i < this.usrs.length; ++i) {
                if (this.usrs[i].id == usrId) {
                    return this.usrs[i];
                }
            }
        }

        private updateUserTable(usrs:collection.protocol.User[]):void {
            this.usrs = usrs;
            this.tableAssist = this.createTableAssist("um-tbUsers");
            let data = [];
            for (let i = 0; i < usrs.length; ++i) {
                let row = [];
                row.push(usrs[i].id);
                row.push(usrs[i].name);
                row.push(usrs[i].orgName);
                let role = "";
                for (let j = 0; j < usrs[i].roles.length; ++j) {
                    role += collection.protocol.ROLE[usrs[i].roles[j]] + ",";
                }
                if (role.length > 0) {
                    role = role.substring(0, role.length - 1);
                }
                row.push(role);
                row.push(usrs[i].position);
                data.push(row);
            }

            this.find("#um-tbUsersTable").jqGrid(
                this.tableAssist.decorate({
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
                    rowList:[10,20,50],
                    autoScroll: true,
                    singleselect: true,
                    pager: '#um-tbUsersPager'
                }));

        }

        private onclickEditUser():void {
            let rids = this.tableAssist.getSelRows();
            if (rids.length == 0) {
                pages.Toast.warning("请选择要编辑的用户");
                return;
            }
            $("#um-createUserDialog").children(0).attr("id", "um-msgCU");
            let dialog = bootbox.dialog({
                message: $("#um-createUserDialog").html(),
                title: "编辑用户",
                className: "modal-darkorange",
                buttons: {
                    success: {
                        label: "确定",
                        className: "btn-blue",
                        callback: () => {
                            let cu:CreateUser = this.checkUserInfo();
                            if (null != cu) {
                                let user:collection.protocol.User = {
                                    id: rids[0],
                                    orgId: cu.orgId,
                                    password: cu.password,
                                    roles: cu.roles,
                                    position: cu.position
                                };
                                collection.Account.updateUsers([user]).done((ret:collection.protocol.Result)=> {
                                    if (ret.code == 0) {
                                        Toast.success("用户修改成功");
                                        this.refresh();
                                        dialog.modal("hide");
                                    } else {
                                        Toast.failed(ret.msg);
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

            let usr:collection.protocol.User = this.findUser(rids[0]);
            setTimeout(()=>{
                $("#um-msgCU  #um-userame").val(usr.name);
                $("#um-msgCU  #um-userame").attr("disabled",true);
                $("#um-msgCU #um-password").val(usr.password);
                $("#um-msgCU #um-position").val(usr.position);
                $("#um-msgCU #um-confirmPassword").val(usr.password);
                $("#um-msgCU #um-org-sel").val(usr.orgId);
                for (let i = 0; i < usr.roles.length; ++i) {
                    $("#um-msgCU .form-group input[type=checkbox][value=" + usr.roles[i] + "]").prop("checked", true);
                }
            }, 0);

            $("#um-createUserDialog").children(0).removeAttr("id");
        }
    }
}