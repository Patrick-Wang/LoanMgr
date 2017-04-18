///<reference path="pages.ts"/>
///<reference path="../pageSidebar.ts"/>
var pages;
(function (pages) {
    class CallCenter extends pages.PageImpl {
        constructor(page) {
            super(page);
        }
        onRefresh() {
        }
    }
    CallCenter.ins = new CallCenter(pages.PageType.callCenter);
})(pages || (pages = {}));
