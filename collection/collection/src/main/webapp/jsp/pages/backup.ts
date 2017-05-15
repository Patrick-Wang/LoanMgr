///<reference path="pages.ts"/>
///<reference path="../pageSidebar.ts"/>
module pages{
    class Backup extends PageImpl{
        static ins = new Backup(PageType.backup);

        lastPage;
        constructor(page:pages.PageType) {
            super(page);
        }

        protected onShown(){
            if (this.page != sidebar.getLastPage()){
                this.lastPage = sidebar.getLastPage()
            }
            sidebar.switchPage(this.lastPage);
            collection.EntrustedCaseManager.getBatchNOs().done((batchNOs:number[])=>{

                this.find("#bkup-batchNo").empty();
                $(batchNOs).each((i,e)=>{
                    this.find("#bkup-batchNo").append('<option value="' + e + '">' + e + '</option>');
                });

                $("#bkup-backupDialog").children(0).attr("id", "bkup-backupDialogBK");
                let dialog = bootbox.dialog({
                    message: $("#bkup-backupDialog").html(),
                    title: "委案备份",
                    className: "modal-darkorange",
                    buttons: {
                        success: {
                            label: "备份",
                            className: "btn-blue",
                            callback: () => {
                                let val = $("#bkup-backupDialogBK #bkup-batchNo").val();
                                this.find("#bk-form #bk-batchNo").val(val);
                                this.find("#bk-form")[0].submit();
                            }
                        },
                        "取消": {
                            className: "btn-default",
                            callback: function () {

                            }
                        }
                    }
                });
                $("#bkup-backupDialog").children(0).removeAttr("id");
            });
        }

        protected onRefresh():void {



        }
    }
}