var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
///<reference path="pages.ts"/>
///<reference path="../pageSidebar.ts"/>
var pages;
(function (pages) {
    var LoansDetail = (function (_super) {
        __extends(LoansDetail, _super);
        function LoansDetail(page) {
            var _this = this;
            _super.call(this, page);
            route.router.register(new route.Receiver(pages.PageUtil.getPageId(this.page), function (e) {
                switch (e.id) {
                    case route.MSG.EC_DETAIL_ECINFO:
                        _this.ec = e.data.ec;
                        _this.ecType = e.data.ecType;
                        break;
                }
            }));
            $("#bootbox-clieck-to-working").on('click', function () {
                bootbox.confirm("是否将委案状态修改为工作中？", function (result) {
                    if (result) {
                        collection.EntrustedCase.update(this.ecType, [{ id: this.ec.loan[0], wwzt: "工作中" }])
                            .done(function (ret) {
                            if (ret.code == 0) {
                                pages.Toast.success("状态修改成功");
                            }
                            else {
                                pages.Toast.failed(ret.msg);
                            }
                        });
                    }
                });
            });
            $("#bootbox-clieck-to-done").on('click', function () {
                bootbox.confirm("是否将委案状态修改为已退案？", function (result) {
                    if (result) {
                        collection.EntrustedCase.update(this.ecType, [{ id: this.ec.loan[0], wwzt: "已退案" }])
                            .done(function (ret) {
                            if (ret.code == 0) {
                                pages.Toast.success("状态修改成功");
                            }
                            else {
                                pages.Toast.failed(ret.msg);
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
                var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
                    var r = (d + Math.random() * 16) % 16 | 0;
                    d = Math.floor(d / 16);
                    return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
                });
                return uuid;
            }
            ;
            $("#bootbox-record-by-phone").on('click', function () {
                var dialog = bootbox.dialog({
                    message: $("#myModal").html(),
                    title: "电话访谈",
                    className: "modal-darkorange",
                    buttons: {
                        success: {
                            label: "拨打电话",
                            className: "btn-blue",
                            callback: function () {
                                var _this = this;
                                var num = "123123";
                                collection.phone.ringUp(num, generateUUID() + ".MP3", function (fName) {
                                    if (fName) {
                                        collection.EntrustedCaseReport.createPhoneOutReport(_this.ec.managerId, num, fName)
                                            .done(function (ret) {
                                            if (ret.code != 0) {
                                                pages.Toast.failed("电话关联失败");
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
        LoansDetail.prototype.onShown = function () {
            if (this.page != sidebar.getLastPage()) {
                this.lastPage = sidebar.getLastPage();
            }
        };
        LoansDetail.prototype.onRefresh = function () {
        };
        LoansDetail.ins = new LoansDetail(pages.PageType.loansDetail);
        return LoansDetail;
    })(pages.PageImpl);
})(pages || (pages = {}));
