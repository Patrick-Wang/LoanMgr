///<reference path="pages.ts"/>
///<reference path="../pageSidebar.ts"/>
module pages{
    import EntrustedCase = collection.EntrustedCase;
    import QueryOption = collection.protocol.QueryOption;
    import EntrustedCaseType = collection.protocol.EntrustedCaseType;
    import EC = collection.protocol.EC;
    import Message = collection.Message;
    import AnonymousReceiver = route.AnonymousReceiver;
    import Account = collection.Account;
    import Organization = collection.protocol.Organization;
    import User = collection.protocol.User;

    class AssignLoans extends PageImpl{
        static ins = new AssignLoans(PageType.assignLoans);

        ecs:EC[];
        ecType:EntrustedCaseType;
        selAll :boolean = false;

        constructor(page:pages.PageType) {
            super(page)
            $("#" + PageUtil.getPageId(this.page) + " .dowebok input").labelauty();
            PageUtil.jqPage(this.page).find(".btn-prev").click(()=>{
                if (this.getCurrentStep() == 2){
                    PageUtil.jqPage(this.page).find("#wiredstep2").removeClass("active");
                    PageUtil.jqPage(this.page).find("#wiredstep1").addClass("active");
                    PageUtil.jqPage(this.page).find(".steps li:eq(1)").removeClass("active");
                }else  if (this.getCurrentStep() == 3){
                    PageUtil.jqPage(this.page).find("#wiredstep3").removeClass("active");
                    PageUtil.jqPage(this.page).find("#wiredstep2").addClass("active");
                    PageUtil.jqPage(this.page).find(".steps li:eq(2)").removeClass("active");
                }
            });

            PageUtil.jqPage(this.page).find(".btn-next").click(()=>{
                if (this.getCurrentStep() == 1){
                    PageUtil.jqPage(this.page).find("#wiredstep1").removeClass("active");
                    PageUtil.jqPage(this.page).find("#wiredstep2").addClass("active");
                    PageUtil.jqPage(this.page).find(".steps li:eq(1)").addClass("active");
                }else  if (this.getCurrentStep() == 2){
                    PageUtil.jqPage(this.page).find("#wiredstep2").removeClass("active");
                    PageUtil.jqPage(this.page).find("#wiredstep3").addClass("active");
                    PageUtil.jqPage(this.page).find(".steps li:eq(2)").addClass("active");
                }
            });
        }

        private getCurrentStep(){
            if ( PageUtil.jqPage(this.page).find("#wiredstep1").hasClass("active")){
                return 1;
            }
            if ( PageUtil.jqPage(this.page).find("#wiredstep2").hasClass("active")){
                return 2;
            }
            if ( PageUtil.jqPage(this.page).find("#wiredstep3").hasClass("active")){
                return 3;
            }
        }

        private getTree(usrs:User[], orgs:Organization[]):any{
            let tree:any = {};
            for (let i = 0; i < orgs.length; ++i){
                let treeItem:any = {
                    name : orgs[i].name + '<div class="tree-actions"></div>',
                    type:  'folder',
                    additionalParameters: { id: orgs[j].id }
                };

                //if (orgs[i].subOrgs != undefined && orgs[i].subOrgs.length > 0){
                //    treeItem.additionalParameters.children = this.getTree(usrs, orgs[i].subOrgs);
                //}
                //if (treeItem.nodes == undefined){
                //    treeItem.nodes = [];
                //}
                for (let j  = 0; j < usrs.length; ++j){
                    if (usrs[j].orgId == orgs[i].id){
                        treeItem.nodes.push({
                            text:'<i class="fa fa-user gold"></i> ' + usrs[j].name,
                            type: 'item',
                            additionalParameters: { id: usrs[j].id }
                        });
                    }
                }
                tree.push(treeItem);
            }
            return tree;
        }

        protected onRefresh():void {
            let type = PageUtil.jqPage(this.page).find(".dowebok input:checked").attr("myid");
            let opt:QueryOption = {};
            EntrustedCase.search(type, opt).done((ecs:EC[])=> {
                this.ecs = [];
                this.ecType = type;
                for (let i = 0; i < ecs.length; ++i){
                    if(ecs[i].owner == context.userName){
                        this.ecs.push(ecs[i]);
                    }
                }

                this.doRefresh();
            });

             $.when(Account.getUsers(), Account.getOrgs())
            .done((usrs:User[], orgs:Organization[])=>{


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

                        }, this._delay)
                    }
                };

                let treeDataSource =  {data:(options, callback)=>{
                    if (options.additionalParameters == undefined){
                        callback({data:this.getTree(usrs, orgs)});
                    }else{
                        for (let i = 0; i < orgs.length; ++i){
                            if (orgs[i].id == options.additionalParameters.id){
                                if ( orgs[i].subOrgs != undefined &&  orgs[i].subOrgs.length > 0){
                                    data:this.getTree(usrs, orgs[i].subOrgs)
                                }
                                break;
                            }
                        }
                    }
                }};

                $('#tbOrgs').tree({
                    dataSource: treeDataSource,
                    multiSelect: false,
                    loadingHTML: '<div class="tree-loading"><i class="fa fa-rotate-right fa-spin"></i></div>'
                });


            });

        }
        protected onShown(){
            this.adjustWidth("allLoans",  $("#tbAllLoansTable"));
        }

        private adjustWidth(name:string, jqgrid:any){
            if ($("#" + name).width() != $("#" + name).children().eq(0).width()){
                jqgrid.setGridWidth($("#" + name).width() );
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

        private getSelectedEC():EC[]{
            if (this.selAll){
                return this.ecs;
            }else{
                let ids = $("#tbAllLoansTable").jqGrid('getGridParam', 'selarrrow');
                let ret:EC[] = [];
                for (let i = 0; i < this.ecs.length; ++i){
                    let index = this.indexOf(ids, this.ecs[i].loan[0])
                    if (index >= 0){
                        ids.splice(index, 1);
                        ret.push(this.ecs[i]);
                    }
                }
                return ret;
            }
        }

        private doRefresh():void {
            let tableAssist:JQTable.JQGridAssistant = pages.JQGridAssistantFactory.createTableAssist("tbAllLoans", this.ecType);
            let loans = [];
            for (let i = 0; i < this.ecs.length; ++i) {
                loans.push(this.ecs[i].loan);
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
                    multiselect : true,
                    onSelectAll:(rowids,state)=>{
                       this.selAll = state;
                    },
                    pager: '#tbAllLoansPager'
                }));
            this.adjustWidth("allLoans",  $("#tbAllLoansTable"));
        }
    }
}