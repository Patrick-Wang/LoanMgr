var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
///<reference path="pages.ts"/>
///<reference path="../pageSidebar.ts"/>
var pages;
(function (pages) {
    var Backup = (function (_super) {
        __extends(Backup, _super);
        function Backup(page) {
            _super.call(this, page);
        }
        Backup.prototype.onShown = function () {
            var _this = this;
            if (this.page != sidebar.getLastPage()) {
                this.lastPage = sidebar.getLastPage();
            }
            sidebar.switchPage(this.lastPage);
            collection.EntrustedCaseManager.getBatchNOs().done(function (batchNOs) {
                _this.find("#bkup-batchNo").empty();
                $(batchNOs).each(function (i, e) {
                    _this.find("#bkup-batchNo").append('<option value="' + e + '">' + e + '</option>');
                });
                $("#bkup-backupDialog").children(0).attr("id", "bkup-backupDialogBK");
                var dialog = bootbox.dialog({
                    message: $("#bkup-backupDialog").html(),
                    title: "委案备份",
                    className: "modal-darkorange",
                    buttons: {
                        success: {
                            label: "备份",
                            className: "btn-blue",
                            callback: function () {
                                var val = $("#bkup-backupDialogBK #bkup-batchNo").val();
                                _this.find("#bk-form #bk-batchNo").val(val);
                                _this.find("#bk-form")[0].submit();
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
        };
        Backup.prototype.onRefresh = function () {
        };
        Backup.ins = new Backup(pages.PageType.backup);
        return Backup;
    })(pages.PageImpl);
})(pages || (pages = {}));
