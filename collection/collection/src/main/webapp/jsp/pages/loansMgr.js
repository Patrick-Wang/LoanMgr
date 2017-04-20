var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
///<reference path="pages.ts"/>
///<reference path="../pageSidebar.ts"/>
var pages;
(function (pages) {
    var LoansMgr = (function (_super) {
        __extends(LoansMgr, _super);
        function LoansMgr(page) {
            _super.call(this, page);
        }
        LoansMgr.prototype.onRefresh = function () {
        };
        LoansMgr.ins = new LoansMgr(pages.PageType.loansMgr);
        return LoansMgr;
    })(pages.PageImpl);
})(pages || (pages = {}));
