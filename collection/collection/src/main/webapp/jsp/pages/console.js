///<reference path="pages.ts"/>
///<reference path="../pageSidebar.ts"/>
///<reference path="../sdk/route/route.ts"/>
var pages;
(function (pages) {
    class Console extends pages.PageImpl {
        constructor(page) {
            super(page);
        }
        onRefresh() {
            route.router.broadcast(Console.ON_REFRESH);
        }
    }
    Console.ON_REFRESH = route.nextId();
    Console.ins = new Console(pages.PageType.console);
    pages.Console = Console;
})(pages || (pages = {}));
