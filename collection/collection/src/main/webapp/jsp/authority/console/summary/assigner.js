var console;
(function (console) {
    var MessageReceiver = authority.MessageReceiver;
    authority.register("/console/summary/assigner", () => {
        route.router.register(new MessageReceiver("/console/summary", (e) => {
            switch (e.id) {
                case pages.Console.ON_REFRESH:
                    Assigner.update();
                    break;
            }
        }));
    });
    class Assigner {
        static update() {
            $("#console-status>div:eq(0)>div").eq(0)
                .text("manager").next().text("已接受委案");
            $("#console-status>div:eq(1)>div").eq(0)
                .text("manager").next().text("未完成委案");
            collection.Message.getUnreadCount()
                .done((count) => {
                $("#console-status>div:eq(2)>div").eq(0)
                    .text(count).next().text("未回复委案咨询");
            });
        }
    }
})(console || (console = {}));
