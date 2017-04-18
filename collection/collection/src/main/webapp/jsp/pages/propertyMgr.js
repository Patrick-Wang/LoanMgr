///<reference path="pages.ts"/>
///<reference path="../pageSidebar.ts"/>
var pages;
(function (pages) {
    class PropertyMgr extends pages.PageImpl {
        constructor(page) {
            super(page);
        }
        onRefresh() {
        }
    }
    PropertyMgr.ins = new PropertyMgr(pages.PageType.propertyMgr);
})(pages || (pages = {}));
