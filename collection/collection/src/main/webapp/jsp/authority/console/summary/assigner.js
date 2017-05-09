var pages;
(function (pages) {
    var console;
    (function (console) {
        var MessageStatus = collection.protocol.MessageStatus;
        var PageUtil = pages.PageUtil;
        var Message = collection.Message;
        var EntrustedCase = collection.EntrustedCase;
        var Receiver = route.Receiver;
        authority.register("/console/summary/assigner", function () {
            var MSG_REFRESH = route.nextId();
            route.router.register(new Receiver("/console/summary", function (e) {
                switch (e.id) {
                    case route.MSG.PAGE_REFRESH:
                        if (e.data == pages.PageType.console) {
                            Accepter.update();
                        }
                        break;
                }
            }));
            route.router.register(new Receiver("/console/summary/assigner", function (e) {
                switch (e.id) {
                    case route.MSG.PAGE_REFRESH:
                        if (e.data == pages.PageType.console) {
                            Message.getSendMessages(MessageStatus.unread).done(function (msgs) {
                                route.router.broadcast(route.MSG.CONSOLE_ASSIGNER_UNRESPMSGS, msgs);
                            });
                        }
                        break;
                    case MSG_REFRESH:
                        var html = ReactDOMServer.renderToStaticMarkup(React.createElement("li", {"className": "tab-palegreen"}, React.createElement("a", {"data-toggle": "tab", "id": "contacttab2", "href": "#waitRepliedMsg"}, " 待回复咨询 ")));
                        PageUtil.jqPage(pages.PageType.console).find("#myTab11").append(html);
                        break;
                }
            }));
            route.router.to("/console/summary/assigner").send(MSG_REFRESH, null, route.DELAY_READY);
        });
        var Accepter = (function () {
            function Accepter() {
            }
            Accepter.update = function () {
                EntrustedCase.getAcceptSummary()
                    .done(function (as) {
                    $("#console-status>div:eq(0)>div").eq(0)
                        .text(as.total).next().text("已接受委案");
                    $("#console-status>div:eq(1)>div").eq(0)
                        .text(as.total - as.complete).next().text("未完成委案");
                    if (as.total != 0) {
                        $("#completeRate")
                            .text(parseFloat("" + (as.complete / as.total * 100)).toFixed(1) + "%");
                    }
                });
                Message.getUnreadCount()
                    .done(function (count) {
                    $("#console-status>div:eq(2)>div").eq(0)
                        .text(count).next().text("未回复委案咨询");
                });
            };
            return Accepter;
        })();
    })(console = pages.console || (pages.console = {}));
})(pages || (pages = {}));
