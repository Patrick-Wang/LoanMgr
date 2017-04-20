var console;
(function (console) {
    var MessageReceiver = authority.MessageReceiver;
    var Message = collection.Message;
    var EntrustedCase = collection.EntrustedCase;
    authority.register("/console/summary/owner", function () {
        route.router.register(new MessageReceiver("/console/summary", function (e) {
            switch (e.id) {
                case route.MSG.PAGE_REFRESH:
                    if (e.data == pages.PageType.console) {
                        Assigner.update();
                    }
                    break;
            }
        }));
    });
    var Assigner = (function () {
        function Assigner() {
        }
        Assigner.update = function () {
            EntrustedCase.getAssignSummary()
                .done(function (as) {
                $("#console-status>div:eq(0)>div").eq(0)
                    .text(as.totoal).next().text("已导入委案");
                $("#console-status>div:eq(1)>div").eq(0)
                    .text(as.assign).next().text("已分配委案");
            });
            Message.getUnreadCount()
                .done(function (count) {
                $("#console-status>div:eq(2)>div").eq(0)
                    .text(count).next().text("未回复委案咨询");
            });
        };
        return Assigner;
    })();
})(console || (console = {}));
