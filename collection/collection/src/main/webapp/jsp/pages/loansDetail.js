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
            _super.call(this, page);
            $("#bootbox-clieck-to-working").on('click', function () {
                bootbox.confirm("是否将委案状态修改为工作中？", function (result) {
                    if (result) {
                    }
                });
            });
            $("#bootbox-clieck-to-done").on('click', function () {
                bootbox.confirm("是否将委案状态修改为已退案？", function (result) {
                    if (result) {
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
