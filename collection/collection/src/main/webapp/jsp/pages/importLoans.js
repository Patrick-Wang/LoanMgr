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
        }
        ImportLoans.prototype.onRefresh = function () {
        };
        ImportLoans.prototype.onclickSelectCard = function () {
            this.ecType = EntrustedCaseType.creditCard;
        };
        ImportLoans.prototype.onclickSelectLoan = function () {
            this.ecType = EntrustedCaseType.creditLoan;
        };
        ImportLoans.prototype.onclickSelectCar = function () {
            this.ecType = EntrustedCaseType.carLoan;
        };
        ImportLoans.prototype.onclicSelect = function () {
            $("step1").removeClass("active");
            $("step2").addClass("active");
        };
        ImportLoans.ins = new ImportLoans(pages.PageType.importLoans);
        return ImportLoans;
    })(pages.PageImpl);
})(pages || (pages = {}));
