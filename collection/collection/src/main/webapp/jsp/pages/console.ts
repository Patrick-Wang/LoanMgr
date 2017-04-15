///<reference path="pages.ts"/>
///<reference path="../pageSidebar.ts"/>
module pages{
    class Console extends PageImpl{
        static ins = new Console(PageType.console);

        constructor(page:pages.PageType) {
            super(page);
        }
    }
}