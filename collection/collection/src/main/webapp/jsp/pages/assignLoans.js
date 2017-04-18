///<reference path="pages.ts"/>
///<reference path="../pageSidebar.ts"/>
var pages;
(function (pages) {
    class AssignLoans extends pages.PageImpl {
        constructor(page) {
            super(page);
        }
        onRefresh() {
        }
    }
    AssignLoans.ins = new AssignLoans(pages.PageType.assignLoans);
})(pages || (pages = {}));
