///<reference path="pages.ts"/>
///<reference path="../pageSidebar.ts"/>
module pages{
    class LoansDetail extends PageImpl{
        static ins = new LoansDetail(PageType.loansDetail);

        lastPage;
        constructor(page:pages.PageType) {
            super(page);

            $("#bootbox-clieck-to-working").on('click', function () {
                bootbox.confirm("是否将委案状态修改为工作中？", function (result) {
                    if (result) {
                        //
                    }
                });
            });

            $("#bootbox-clieck-to-done").on('click', function () {
                bootbox.confirm("是否将委案状态修改为已退案？", function (result) {
                    if (result) {
                        //
                    }
                });
            });

            $("#bootbox-record-work").on('click', function () {
                bootbox.dialog({
                    message: $("#myModal").html(),
                    title: "工作记录录入",
                    className: "modal-darkorange",
                    buttons: {
                        success: {
                            label: "确定",
                            className: "btn-blue",
                            callback: function () {
                            }
                        },
                        "取消": {
                            className: "btn-danger",
                            callback: function () {
                            }
                        }
                    }
                });
            });


            $("#bootbox-record-work-timeline").on('click', function () {
                bootbox.dialog({
                    message: $("#myModal").html(),
                    title: "工作记录录入",
                    className: "modal-darkorange",
                    buttons: {
                        success: {
                            label: "确定",
                            className: "btn-blue",
                            callback: function () {
                            }
                        },
                        "取消": {
                            className: "btn-danger",
                            callback: function () {
                            }
                        }
                    }
                });
            });

            $("#bootbox-record-ask-timeline").on('click', function () {
                bootbox.dialog({
                    message: $("#myModal").html(),
                    title: "工作记录录入",
                    className: "modal-darkorange",
                    buttons: {
                        success: {
                            label: "确定",
                            className: "btn-blue",
                            callback: function () {
                            }
                        },
                        "取消": {
                            className: "btn-danger",
                            callback: function () {
                            }
                        }
                    }
                });
            });
            $("#bootbox-record-by-phone").on('click', function () {
                bootbox.dialog({
                    message: $("#myModal").html(),
                    title: "电话访谈",
                    className: "modal-darkorange",
                    buttons: {
                        success: {
                            label: "拨打电话",
                            className: "btn-blue",
                            callback: function () {
                            }
                        },
                        "取消": {
                            className: "btn-danger",
                            callback: function () {
                            }
                        }
                    }
                });
            });

            $("#bootbox-confirm").on('click', function () {
                bootbox.confirm("Are you sure?", function (result) {
                    if (result) {
                        //
                    }
                });
            });

            $("#bootbox-options").on('click', function () {
                bootbox.dialog({
                    message: $("#myModal").html(),
                    title: "咨询委案信息",
                    className: "modal-darkorange",
                    buttons: {
                        success: {
                            label: "咨询",
                            className: "btn-blue",
                            callback: function () {
                            }
                        },
                        "取消": {
                            className: "btn-danger",
                            callback: function () {
                            }
                        }
                    }
                });
            });

            $("#bootbox-success").on('click', function () {
                bootbox.dialog({
                    message: $("#modal-success").html(),
                    title: "Success",
                    className: "",
                });
            });

            $("#bootbox-modify").on('click', function () {
                bootbox.dialog({
                    message: $("#myModal").html(),
                    title: "修改委案回款额",
                    className: "modal-darkorange",
                    buttons: {
                        success: {
                            label: "确定",
                            className: "btn-blue",
                            callback: function () {
                            }
                        },
                        "取消": {
                            className: "btn-danger",
                            callback: function () {
                            }
                        }
                    }
                });
            });

            $("#bootbox-modify-attach").on('click', function () {
                bootbox.dialog({
                    message: $("#myModal").html(),
                    title: "修改委案回款额",
                    className: "modal-darkorange",
                    buttons: {
                        success: {
                            label: "确定",
                            className: "btn-blue",
                            callback: function () {
                            }
                        },
                        "取消": {
                            className: "btn-danger",
                            callback: function () {
                            }
                        }
                    }
                });
            });
        }

        protected onShown(){
            if (this.page != sidebar.getLastPage()){
                this.lastPage = sidebar.getLastPage()
            }


        }

        protected onRefresh():void {

        }
    }
}