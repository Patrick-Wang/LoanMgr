///<reference path="pages.ts"/>
///<reference path="../pageSidebar.ts"/>
module pages{
    import MessageReceiver = authority.MessageReceiver;
    class AskSth extends PageImpl{
        static ins = new AskSth(PageType.askSth);

        constructor(page:PageType) {
            super(page);
        }

        protected onRefresh():void {

        }
    }
}