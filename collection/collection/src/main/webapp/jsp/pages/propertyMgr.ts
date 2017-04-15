///<reference path="pages.ts"/>
///<reference path="../pageSidebar.ts"/>
module pages{
    class PropertyMgr extends PageImpl{
        static ins = new PropertyMgr(PageType.propertyMgr);

        constructor(page:pages.PageType) {
            super(page);
        }

        protected onRefresh():void {

        }
    }
}