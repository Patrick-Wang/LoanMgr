///<reference path="pages.ts"/>
///<reference path="../pageSidebar.ts"/>
var pages;
(function (pages) {
    class ExportLoans extends pages.PageImpl {
        constructor(page) {
            super(page);
        }
        onRefresh() {
        }
    }
    ExportLoans.ins = new ExportLoans(pages.PageType.exportLoans);
})(pages || (pages = {}));
