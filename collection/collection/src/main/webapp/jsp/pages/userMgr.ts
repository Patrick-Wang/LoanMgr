///<reference path="pages.ts"/>
///<reference path="../pageSidebar.ts"/>
module pages{
    class UserMgr extends PageImpl{
        static ins = new UserMgr(PageType.userMgr);

        constructor(page:pages.PageType) {
            super(page);
        }
    }
}