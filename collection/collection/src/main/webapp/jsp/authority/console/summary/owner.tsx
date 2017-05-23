module pages.console {

    import Message = collection.Message;
    import AssignSummary = collection.protocol.AssignSummary;
    import EntrustedCase = collection.EntrustedCase;
    import PageUtil = pages.PageUtil;
    import Receiver = route.Receiver;
    authority.register("/console/summary/owner", () => {
        let MSG_REFRESH:number = route.nextId();
        route.router.register(new Receiver("/console/summary", (e:route.Event)=> {
            switch (e.id) {
                case route.MSG.PAGE_REFRESH:
                    //if (e.data == pages.PageType.console){
                    //    Assigner.update();
                    //}
                    break;
            }
        }));

        route.router.register(new Receiver("/console/summary/owner", (e:route.Event)=> {
            switch (e.id) {
                case route.MSG.PAGE_REFRESH:
                    if (e.data == pages.PageType.console){
                        Message.getMessages().done((umsgs:collection.protocol.Message[])=> {
                            let pairs : collection.MsgPair[] = Message.pairs(umsgs);
                            let unrespMsgs = [];
                            $(pairs).each((i, e:collection.MsgPair)=>{
                                if (!e.answer){
                                    unrespMsgs.push(e.ask);
                                }
                            });
                            route.router.broadcast(route.MSG.CONSOLE_OWNER_UNREADMSGS, unrespMsgs);
                            Assigner.update(unrespMsgs.length);
                        });
                    }
                    break;
                case MSG_REFRESH:
                    let html = ReactDOMServer.renderToStaticMarkup(
                        <li className="tab-palegreen">
                            <a data-toggle="tab" id="contacttab" href="#notRepliedMsg"> 未处理咨询 </a>
                        </li>
                    );
                    PageUtil.jqPage(pages.PageType.console).find("#myTab11").append(html);
                    break;
            }
        }));
        route.router.to("/console/summary/owner").send(MSG_REFRESH, null, route.DELAY_READY);

        $(".header-pic").attr("src", collection.Net.BASE_URL + "/jsp/assets/img/avatars/javi-jimenez.jpg");
        $("#console-status>div:eq(0)>div").eq(0)
            .text("--").next().text("已导入委案");
        $("#console-status>div:eq(1)>div").eq(0)
            .text("--").next().text("已分配委案");
        $("#console-status>div:eq(2)>div").eq(0)
            .text("--").next().text("未处理咨询");
    });

    class Assigner {
        static update(count) {
            EntrustedCase.getAssignSummary()
                .done((as:AssignSummary)=> {
                    $("#console-status>div:eq(0)>div").eq(0)
                        .text(as.total);
                    $("#console-status>div:eq(1)>div").eq(0)
                        .text(as.assign);
                    if (as.total != 0){
                        $("#completeRate")
                            .text(parseFloat("" + (as.complete / as.total * 100)).toFixed(1) + "%");
                    }
                });
            $("#console-status>div:eq(2)>div").eq(0).text(count);


        }
    }
}