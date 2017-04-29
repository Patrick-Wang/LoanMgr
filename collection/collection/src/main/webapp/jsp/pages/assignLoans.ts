///<reference path="pages.ts"/>
///<reference path="../pageSidebar.ts"/>
module pages {
    import EntrustedCase = collection.EntrustedCase;
    import QueryOption = collection.protocol.QueryOption;
    import EntrustedCaseType = collection.protocol.EntrustedCaseType;
    import EC = collection.protocol.EC;
    import Message = collection.Message;
    import AnonymousReceiver = route.AnonymousReceiver;
    import Account = collection.Account;
    import Organization = collection.protocol.Organization;
    import User = collection.protocol.User;
    import EntrustedCaseManager = collection.EntrustedCaseManager;
    import EntrustedCaseManageInfo = collection.protocol.EntrustedCaseManageInfo;
    import Result = collection.protocol.Result;

    class AssignLoans extends PageImpl {
        static ins = new AssignLoans(PageType.assignLoans);

        ecs:EC[];
        ecType:EntrustedCaseType;
        selAll:boolean = false;
        usrs:User[];
        orgs:Organization[];
        selectedEcs:EC[];
        selectedUser:User;
        constructor(page:pages.PageType) {
            super(page)
            $("#" + PageUtil.getPageId(this.page) + " .dowebok input").labelauty();

            $('#al-WiredWizard').wizard();
            $('#al-WiredWizard').on('change', (evt, data) => {
                if (data.direction == 'next'){
                    if (data.step == 1) {
                        this.selectedEcs = this.getSelectedEC();
                        if (this.selectedEcs.length == 0){
                            Toast.warning('请选择要分配的委案');
                            evt.preventDefault();
                        }
                    } else if (data.step == 2) {
                        let opts = $('#treeOrg').tree("selectedItems");
                        if (opts.length == 0){
                            Toast.warning('请选指定接收人');
                            evt.preventDefault();
                        }
                    }
                }
            });


            $('#al-WiredWizard').on('changed', (evt) => {
                if ($('#al-WiredWizard').wizard('selectedItem').step == 3){
                    this.onStep3();
                }
            });

            $('#al-WiredWizard').on('finished.fu.wizard', (evt, data) => {
                this.updateAssignee();
            });
        }



        onStep3(){
            //PageUtil.jqPage(this.page).find(".btn-next").text("修改");
            let opt = $('#treeOrg').tree("selectedItems")[0];
            for(let i = 0; i < this.usrs.length; ++i){
                if (opt.additionalParameters.id == this.usrs[i].id){
                    this.selectedUser = this.usrs[i];
                    break;
                }
            }

            $("#alwiredstep3 .alert").text("共计将如下 " + this.selectedEcs.length + " 条委案分配给 " + this.selectedUser.orgName + " 业务员 " + this.selectedUser.name + "。")

            let tableAssist:JQTable.JQGridAssistant = pages.JQGridAssistantFactory.createTableAssist("al-ensure", this.ecType);
            let loans = [];
            for (let i = 0; i < this.selectedEcs.length; ++i) {
                loans.push(this.selectedEcs[i].loan);
            }



            $("#al-ensureTable").jqGrid(
                tableAssist.decorate({
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
            if ($("#al-ensure-outer").parent().width() != $("##al-ensure-outer" ).width()) {
                $("#al-ensureTable").setGridWidth($("#al-ensure-outer").parent().width());
            }
        }

        private goStep1() {
            let step = $('#al-WiredWizard').wizard('selectedItem').step;
            while(step > 1){
                --step;
                $('#al-WiredWizard').wizard("previous");
            }
        }

        private getTree(usrs:User[], orgs:Organization[], pOrg?:Organization):any {
            let tree:any = [];
            if (orgs != undefined) {
                for (let i = 0; i < orgs.length; ++i) {
                    tree.push({
                        name: orgs[i].name + '<div class="tree-actions"></div>',
                        type: 'folder',
                        additionalParameters: {id: orgs[i].id}
                    });
                }
            }
            if (pOrg != undefined) {
                for (let j = 0; j < usrs.length; ++j) {
                    if (usrs[j].orgId == pOrg.id) {
                        tree.push({
                            name: '<i class="fa fa-user gold"></i> ' + usrs[j].name,
                            type: 'item',
                            additionalParameters: {id: usrs[j].id}
                        });
                    }
                }
            }

            return tree;
        }

        protected onRefresh():void {
            this.goStep1();
            let type = PageUtil.jqPage(this.page).find(".dowebok input:checked").attr("myid");
            let opt:QueryOption = {};
            EntrustedCase.search(type, opt).done((ecs:EC[])=> {
                this.ecs = [];
                this.ecType = type;
                for (let i = 0; i < ecs.length; ++i) {
                    if (ecs[i].owner == context.userName) {
                        this.ecs.push(ecs[i]);
                    }
                }
                this.doRefresh();
            });

            $.when(Account.getUsers(["/ec/ask"]), Account.getOrgs())
                .done((usrs:User[], orgs:Organization[])=> {
                    this.usrs = usrs;
                    this.orgs = orgs;
                    let treeDataSource = {
                        data: (options, callback)=> {
                            if (options.additionalParameters == undefined) {
                                callback({data: this.getTree(usrs, orgs)});
                            } else {
                                for (let i = 0; i < orgs.length; ++i) {
                                    if (orgs[i].id == options.additionalParameters.id) {
                                        callback({data: this.getTree(usrs, orgs[i].subOrgs, orgs[i])});
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

        }

        protected onShown() {
            this.adjustStep1Width();
        }

        private adjustStep1Width() {
            if ($("#allLoans").width() != $("#allLoans").children().eq(0).width()) {
                $("#tbAllLoansTable").setGridWidth($("#allLoans").width());
            }
        }

        indexOf(arr, val) {
            for (var i = 0; i < arr.length; i++) {
                if (arr[i] == val) {
                    return i;
                }
            }
            return -1;
        }

        private getSelectedEC():EC[] {
            if (this.selAll) {
                return this.ecs;
            } else {
                let ids = [].concat($("#tbAllLoansTable").jqGrid('getGridParam', 'selarrrow'));
                let ret:EC[] = [];
                for (let i = 0; i < this.ecs.length; ++i) {
                    let index = this.indexOf(ids, this.ecs[i].loan[0])
                    if (index >= 0) {
                        ids.splice(index, 1);
                        ret.push(this.ecs[i]);
                    }
                }
                return ret;
            }
        }

        private doRefresh():void {
            let tableAssist:JQTable.JQGridAssistant = pages.JQGridAssistantFactory.createTableAssist("tbAllLoans", this.ecType, ["指派人","完成人"]);
            let loans = [];
            for (let i = 0; i < this.ecs.length; ++i) {
                loans.push([this.ecs[i].loan[0], this.ecs[i].owner, this.ecs[i].assignee].concat(this.ecs[i].loan.slice(1)));
            }

            $("#tbAllLoansTable").jqGrid(
                tableAssist.decorate({
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
                    onSelectAll: (rowids, state)=> {
                        this.selAll = state;
                    },
                    pager: '#tbAllLoansPager'
                }));
            this.adjustStep1Width();
        }

        private updateAssignee():void {
            let ecmis:EntrustedCaseManageInfo[] = [];
            for (let i = 0; i < this.selectedEcs.length; ++i){
                ecmis.push({
                    id:this.selectedEcs[i].managerId,
                    assigneeId:this.selectedUser.id
                });
            }
            EntrustedCaseManager.update(ecmis).done((ret:Result)=>{
                if (ret.code == 0){
                    Toast.success('委案分配成功');
                    this.refresh();
                }
            });
        }
    }
}