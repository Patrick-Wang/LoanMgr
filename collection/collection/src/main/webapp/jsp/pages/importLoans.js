var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
///<reference path="pages.ts"/>
///<reference path="../pageSidebar.ts"/>
var pages;
(function (pages) {
    var EntrustedCaseType = collection.protocol.EntrustedCaseType;
    var Net = collection.Net;
    var ImportLoans = (function (_super) {
        __extends(ImportLoans, _super);
        function ImportLoans(page) {
            var _this = this;
            _super.call(this, page);
            var target;
            $(".plan").hover(function (e) {
                $(".plan").removeClass("popular-plan");
                $(".plan").removeClass("bounce");
                $(e.currentTarget).addClass("popular-plan");
                $(e.currentTarget).addClass("bounce");
            });
            $("#selcar").click(function () {
                _this.onclickSelectCar();
                return false;
            });
            $("#selloan").click(function () {
                _this.onclickSelectLoan();
                return false;
            });
            $("#selcard").click(function () {
                _this.onclickSelectCard();
                return false;
            });
            $("#pre").click(function () {
                _this.onclickPre();
            });
        }
        ImportLoans.prototype.onRefresh = function () {
            if (undefined != this.dropz) {
                this.dropz.removeAllFiles();
            }
        };
        ImportLoans.prototype.onclickSelectCard = function () {
            this.ecType = EntrustedCaseType.creditCard;
            $("#wiredstep2 .header").text("选择信用卡文件或拖拽信用卡文件到此处");
            this.onclickSelect();
        };
        ImportLoans.prototype.onclickSelectLoan = function () {
            this.ecType = EntrustedCaseType.creditLoan;
            $("#wiredstep2 .header").text("选择信贷文件或拖拽信贷文件到此处");
            this.onclickSelect();
        };
        ImportLoans.prototype.onclickSelectCar = function () {
            this.ecType = EntrustedCaseType.carLoan;
            $("#wiredstep2 .header").text("选择车贷文件或拖拽车贷文件到此处");
            this.onclickSelect();
        };
        ImportLoans.prototype.onclickSelect = function () {
            $("#step2").addClass("active");
            $("#wiredstep1").removeClass("active");
            $("#wiredstep2").addClass("active");
            if (undefined != this.dropz) {
                this.dropz.options.url = Net.BASE_URL + "/entrusted_case/import.do?type=" + this.ecType;
            }
            else {
                this.dropz = new Dropzone("#dropzone", {
                    url: Net.BASE_URL + "/entrusted_case/import.do?type=" + this.ecType,
                    maxFiles: 10,
                    maxFilesize: 512,
                    acceptedFiles: ".xls, xlsx",
                    paramName: "file"
                });
            }
            $("#WiredWizard-actions").show();
        };
        ImportLoans.prototype.onclickPre = function () {
            if (this.dropz != undefined) {
                this.dropz.removeAllFiles();
            }
            $("#step2").removeClass("active");
            $("#wiredstep2").removeClass("active");
            $("#wiredstep1").addClass("active");
            $("#WiredWizard-actions").hide();
        };
        ImportLoans.ins = new ImportLoans(pages.PageType.importLoans);
        return ImportLoans;
    })(pages.PageImpl);
})(pages || (pages = {}));
