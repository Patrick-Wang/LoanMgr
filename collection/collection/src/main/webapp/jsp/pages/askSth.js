///<reference path="pages.ts"/>
///<reference path="../pageSidebar.ts"/>
var pages;
(function (pages) {
    var MessageReceiver = authority.MessageReceiver;
    class AskSth extends pages.PageImpl {
        constructor(page) {
            super(page);
        }
        onRefresh() {
            MessageReceiver;
        }
    }
    AskSth.ins = new AskSth(pages.PageType.askSth);
})(pages || (pages = {}));
