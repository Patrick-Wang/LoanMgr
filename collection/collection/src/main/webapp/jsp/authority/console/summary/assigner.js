var console;
(function (console) {
    var MessageReceiver = authority.MessageReceiver;
    var Message = collection.Message;
    var EntrustedCase = collection.EntrustedCase;
    authority.register("/console/summary/assigner", function () {
        route.router.register(new MessageReceiver("/console/summary", function (e) {
            switch (e.id) {
                case route.MSG.PAGE_REFRESH:
                    if (e.data == pages.PageType.console) {
                        Accepter.update();
                    }
                    break;
            }
        }));
    });
    var Accepter = (function () {
        function Accepter() {
        }
        Accepter.update = function () {
            EntrustedCase.getAcceptSummary()
                .done(function (as) {
                $("#console-status>div:eq(0)>div").eq(0)
                    .text(as.totoal).next().text("已接受委案");
                $("#console-status>div:eq(1)>div").eq(0)
                    .text(as.totoal - as.complete).next().text("未完成委案");
            });
            Message.getUnreadCount()
                .done(function (count) {
                $("#console-status>div:eq(2)>div").eq(0)
                    .text(count).next().text("未回复委案咨询");
            });
        };
        return Accepter;
    })();
})(console || (console = {}));
