///<reference path="pages.ts"/>
///<reference path="../pageSidebar.ts"/>
module pages{
    class LoansDetail extends PageImpl{
        static ins = new LoansDetail(PageType.loansDetail);
        lastPage;
        ec:collection.protocol.EC;
        ecType:collection.protocol.EntrustedCaseType;
        constructor(page:pages.PageType) {
            super(page);

            route.router.register(new route.Receiver(PageUtil.getPageId(this.page), (e:route.Event)=>{
                switch (e.id){
                    case route.MSG.EC_DETAIL_ECINFO:
                        this.ec = e.data.ec;
                        this.ecType = e.data.ecType;
                        break;
                }
            }));



            $("#bootbox-clieck-to-working").on('click', function () {
                bootbox.confirm("是否将委案状态修改为工作中？", function (result) {
                    if (result) {
                        collection.EntrustedCase.update(this.ecType, [{id:this.ec.loan[0], wwzt:"工作中"}])
                            .done((ret : collection.protocol.Result)=>{
                            if (ret.code == 0){
                                Toast.success("状态修改成功");
                            }else{
                                Toast.failed(ret.msg);
                            }
                        });
                    }
                });
            });

            $("#bootbox-clieck-to-done").on('click', function () {
                bootbox.confirm("是否将委案状态修改为已退案？", function (result) {
                    if (result) {
                        collection.EntrustedCase.update(this.ecType, [{id:this.ec.loan[0], wwzt:"已退案"}])
                            .done((ret : collection.protocol.Result)=>{
                                if (ret.code == 0){
                                    Toast.success("状态修改成功");
                                }else{
                                    Toast.failed(ret.msg);
                                }
                            });
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

            function generateUUID() {
                var d = new Date().getTime();
                var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
                    var r = (d + Math.random()*16)%16 | 0;
                    d = Math.floor(d/16);
                    return (c=='x' ? r : (r&0x3|0x8)).toString(16);
                });
                return uuid;
            };

            $("#bootbox-record-by-phone").on('click', function () {
               let dialog = bootbox.dialog({
                    message: $("#myModal").html(),
                    title: "电话访谈",
                    className: "modal-darkorange",
                    buttons: {
                        success: {
                            label: "拨打电话",
                            className: "btn-blue",
                            callback: function () {
                                let num = "123123";
                                collection.phone.ringUp(num, generateUUID() + ".MP3", (fName:string)=>{
                                    if (fName){
                                        collection.EntrustedCaseReport.createPhoneOutReport(this.ec.managerId, num, fName)
                                            .done((ret:collection.protocol.Result)=>{
                                            if (ret.code != 0){
                                                Toast.failed("电话关联失败");
                                            }
                                        });
                                    }
                                    dialog.modal("hide");
                                });
                                return false;
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