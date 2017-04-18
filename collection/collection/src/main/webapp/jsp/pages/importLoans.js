///<reference path="pages.ts"/>
///<reference path="../pageSidebar.ts"/>
var pages;
(function (pages) {
    class ImportLoans extends pages.PageImpl {
        constructor(page) {
            super(page);
        }
        onRefresh() {
        }
    }
    ImportLoans.ins = new ImportLoans(pages.PageType.importLoans);
})(pages || (pages = {}));
