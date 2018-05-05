var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
///<reference path="pages.ts"/>
///<reference path="../pageSidebar.ts"/>
var pages;
(function (pages) {
    var ExportLoans = (function (_super) {
        __extends(ExportLoans, _super);
        function ExportLoans(page) {
            return _super.call(this, page) || this;
        }
        ExportLoans.prototype.onRefresh = function () {
        };
        ExportLoans.ins = new ExportLoans(pages.PageType.exportLoans);
        return ExportLoans;
    }(pages.PageImpl));
})(pages || (pages = {}));
