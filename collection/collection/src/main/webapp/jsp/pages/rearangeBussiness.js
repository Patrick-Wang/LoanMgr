///<reference path="pages.ts"/>
///<reference path="../pageSidebar.ts"/>
var pages;
(function (pages) {
    class RearangeBussiness extends pages.PageImpl {
        constructor(page) {
            super(page);
        }
        onRefresh() {
        }
    }
    RearangeBussiness.ins = new RearangeBussiness(pages.PageType.rearangeBussiness);
})(pages || (pages = {}));
