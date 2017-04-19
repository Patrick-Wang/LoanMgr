///<reference path="pages.ts"/>
///<reference path="../pageSidebar.ts"/>
///<reference path="../sdk/route/route.ts"/>
module pages{
    export class Console extends PageImpl{
        static ON_REFRESH:number = route.nextId();
        private static ins = new Console(PageType.console);

        constructor(page:pages.PageType) {
            super(page);
        }

        protected onRefresh():void {
            route.router.broadcast(Console.ON_REFRESH)
        }

    }
}