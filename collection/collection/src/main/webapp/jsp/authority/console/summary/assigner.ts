module console {
    import MessageReceiver = authority.MessageReceiver;
    import AcceptSummary = collection.protocol.AcceptSummary;
    import Message = collection.Message;
    import EntrustedCase = collection.EntrustedCase;
    authority.register("/console/summary/assigner", () => {
        route.router.register(new MessageReceiver("/console/summary", (e:route.Event)=> {
            switch (e.id) {
                case route.MSG.PAGE_REFRESH:
                    if (e.data == pages.PageType.console){
                        Accepter.update();
                    }
                    break;
            }
        }));
    });

    class Accepter {
        static update() {
            EntrustedCase.getAcceptSummary()
                .done((as:AcceptSummary)=>{
                    $("#console-status>div:eq(0)>div").eq(0)
                        .text(as.totoal).next().text("已接受委案");
                    $("#console-status>div:eq(1)>div").eq(0)
                        .text(as.totoal - as.complete).next().text("未完成委案");
                });
            Message.getUnreadCount()
                .done((count:number)=> {
                    $("#console-status>div:eq(2)>div").eq(0)
                        .text(count).next().text("未回复委案咨询");
                });
        }
    }
}