///<reference path="pages.ts"/>
///<reference path="../pageSidebar.ts"/>
module pages{
    class AskSth extends PageImpl{
        static ins = new AskSth(PageType.askSth);

        constructor(page:pages.PageType) {
            super(page);
        }

        protected onRefresh():void {

        }
    }
}