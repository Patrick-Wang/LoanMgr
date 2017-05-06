var pages;
(function (pages) {
    var console;
    (function (console) {
        var Message = collection.Message;
        var EntrustedCase = collection.EntrustedCase;
        var PageUtil = pages.PageUtil;
        var Receiver = route.Receiver;
        authority.register("/console/summary/owner", function () {
            var MSG_REFRESH = route.nextId();
            route.router.register(new Receiver("/console/summary", function (e) {
                switch (e.id) {
                    case route.MSG.PAGE_REFRESH:
                        if (e.data == pages.PageType.console) {
                            Assigner.update();
                        }
                        break;
                }
            }));
            route.router.register(new Receiver("/console/summary/owner", function (e) {
                switch (e.id) {
                    case route.MSG.PAGE_REFRESH:
                        if (e.data == pages.PageType.console) {
                            Message.getUnreadMessages().done(function (umsgs) {
                                route.router.broadcast(route.MSG.CONSOLE_OWNER_UNREADMSGS, umsgs);
                            });
                        }
                        break;
                    case MSG_REFRESH:
                        var html = ReactDOMServer.renderToStaticMarkup(React.createElement("li", {"className": "tab-palegreen"}, React.createElement("a", {"data-toggle": "tab", "id": "contacttab", "href": "#notRepliedMsg"}, " 未处理咨询 ")));
                        PageUtil.jqPage(pages.PageType.console).find("#myTab11").append(html);
                        break;
                }
            }));
            route.router.to("/console/summary/owner").send(MSG_REFRESH, null, route.DELAY_READY);
        });
        var Assigner = (function () {
            function Assigner() {
            }
            Assigner.update = function () {
                EntrustedCase.getAssignSummary()
                    .done(function (as) {
                    $("#console-status>div:eq(0)>div").eq(0)
                        .text(as.total).next().text("已导入委案");
                    $("#console-status>div:eq(1)>div").eq(0)
                        .text(as.assign).next().text("已分配委案");
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
            return Assigner;
        })();
    })(console = pages.console || (pages.console = {}));
})(pages || (pages = {}));
