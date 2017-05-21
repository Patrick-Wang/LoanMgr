///<reference path="../../../pages/importLoans.ts"/>
///<reference path="../../../pages/askSth.tsx"/>

module pages.console {

    import MessageStatus = collection.protocol.MessageStatus;
    import PageUtil = pages.PageUtil;
    import AcceptSummary = collection.protocol.AcceptSummary;
    import Message = collection.Message;
    import EntrustedCase = collection.EntrustedCase;
    import Receiver = route.Receiver;
    authority.register("/console/summary/assigner", () => {
        let MSG_REFRESH:number = route.nextId();
        route.router.register(new Receiver("/console/summary", (e:route.Event)=> {
            switch (e.id) {
                case route.MSG.PAGE_REFRESH:
                    //if (e.data == pages.PageType.console){
                    //    Accepter.update();
                    //}
                    break;
            }
        }));

        route.router.register(new Receiver("/console/summary/assigner", (e:route.Event)=> {
            switch (e.id) {
                case route.MSG.PAGE_REFRESH:
                    if (e.data == pages.PageType.console){
                        Message.getMessages().done((msgs:collection.protocol.Message[])=>{
                            let pairs : collection.MsgPair[] = Message.pairs(msgs);
                            let unrespMsgs = [];
                            $(pairs).each((i, e:collection.MsgPair)=>{
                                if (!e.answer){
                                    unrespMsgs.push(e.ask);
                                }
                            });


                            route.router.broadcast(route.MSG.CONSOLE_ASSIGNER_UNRESPMSGS, unrespMsgs);
                            Accepter.update(unrespMsgs.length);
                        })
                    }
                    break;
                case MSG_REFRESH:
                    let html = ReactDOMServer.renderToStaticMarkup(
                        <li className="tab-palegreen">
                            <a data-toggle="tab"  id="contacttab2" href="#waitRepliedMsg"> 待回复咨询 </a>
                        </li>
                    );
                    PageUtil.jqPage(pages.PageType.console).find("#myTab11").append(html);
                    break;
            }
        }));

        route.router.to("/console/summary/assigner").send(MSG_REFRESH, null, route.DELAY_READY);

        $(".header-pic").attr("src", collection.Net.BASE_URL + "/jsp/assets/img/avatars/adam-jansen.jpg");

    });

    class Accepter {
        static update(count) {
            EntrustedCase.getAcceptSummary()
                .done((as:AcceptSummary)=>{
                    $("#console-status>div:eq(0)>div").eq(0)
                        .text(as.total).next().text("已接受委案");
                    $("#console-status>div:eq(1)>div").eq(0)
                        .text(as.total - as.complete).next().text("未完成委案");
                    if (as.total != 0){
                        $("#completeRate")
                            .text(parseFloat("" + (as.complete / as.total * 100)).toFixed(1) + "%");
                    }
                });
            $("#console-status>div:eq(2)>div").eq(0)
                .text(count).next().text("待回复咨询");
        }
    }
}