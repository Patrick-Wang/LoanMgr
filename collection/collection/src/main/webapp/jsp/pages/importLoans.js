var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
///<reference path="pages.ts"/>
///<reference path="../pageSidebar.ts"/>
var pages;
(function (pages) {
    var ImportLoans = (function (_super) {
        __extends(ImportLoans, _super);
        function ImportLoans(page) {
            _super.call(this, page);
        }
        ImportLoans.ins = new ImportLoans(pages.PageType.importLoans);
        return ImportLoans;
    })(pages.PageImpl);
})(pages || (pages = {}));
