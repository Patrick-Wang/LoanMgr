///<reference path="pages.ts"/>
///<reference path="../pageSidebar.ts"/>
var pages;
(function (pages) {
    class UserMgr extends pages.PageImpl {
        constructor(page) {
            super(page);
        }
        onRefresh() {
        }
    }
    UserMgr.ins = new UserMgr(pages.PageType.userMgr);
})(pages || (pages = {}));
