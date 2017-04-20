module console {
    import MessageReceiver = authority.MessageReceiver;
    import Message = collection.Message;
    import AssignSummary = collection.protocol.AssignSummary;
    import EntrustedCase = collection.EntrustedCase;
    authority.register("/console/summary/owner", () => {
        route.router.register(new MessageReceiver("/console/summary", (e:route.Event)=> {
            switch (e.id) {
                case route.MSG.PAGE_REFRESH:
                    if (e.data == pages.PageType.console){
                        Assigner.update();
                    }
                    break;
            }
        }));
    });

    class Assigner {
        static update() {
            EntrustedCase.getAssignSummary()
                .done((as:AssignSummary)=> {
                    $("#console-status>div:eq(0)>div").eq(0)
                        .text(as.totoal).next().text("已导入委案");
                    $("#console-status>div:eq(1)>div").eq(0)
                        .text(as.assign).next().text("已分配委案");
                });
            Message.getUnreadCount()
                .done((count:number)=> {
                    $("#console-status>div:eq(2)>div").eq(0)
                        .text(count).next().text("未回复委案咨询");
                });
        }
    }
}