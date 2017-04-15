///<reference path="pages.ts"/>
///<reference path="../pageSidebar.ts"/>
module pages{
    class CallCenter extends PageImpl{
        static ins = new CallCenter(PageType.callCenter);

        constructor(page:pages.PageType) {
            super(page);
        }

        protected onRefresh():void {

        }
    }
}