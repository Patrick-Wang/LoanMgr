///<reference path="pages.ts"/>
///<reference path="../pageSidebar.ts"/>
var pages;
(function (pages) {
    class RearangeOffice extends pages.PageImpl {
        constructor(page) {
            super(page);
        }
        onRefresh() {
        }
    }
    RearangeOffice.ins = new RearangeOffice(pages.PageType.rearangeOffice);
})(pages || (pages = {}));
