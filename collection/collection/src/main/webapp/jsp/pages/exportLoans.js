var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
///<reference path="pages.ts"/>
///<reference path="../pageSidebar.ts"/>
var pages;
(function (pages) {
    var ExportLoans = (function (_super) {
        __extends(ExportLoans, _super);
        function ExportLoans(page) {
            _super.call(this, page);
        }
        ExportLoans.ins = new ExportLoans(pages.PageType.exportLoans);
        return ExportLoans;
    })(pages.PageImpl);
})(pages || (pages = {}));
