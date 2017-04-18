///<reference path="pages.ts"/>
///<reference path="../pageSidebar.ts"/>
var pages;
(function (pages) {
    class LoansMgr extends pages.PageImpl {
        constructor(page) {
            super(page);
        }
        onRefresh() {
        }
    }
    LoansMgr.ins = new LoansMgr(pages.PageType.loansMgr);
})(pages || (pages = {}));
