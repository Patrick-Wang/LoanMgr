///<reference path="../../registry.ts"/>
module navbar{
    import MessageReceiver = authority.MessageReceiver;
    let ADDR:string = "/nav/tips/messages";
    authority.register(ADDR, () => {
        let html = ReactDOMServer.renderToStaticMarkup(
            <li>
                <a className="dropdown-toggle" data-toggle="dropdown" title="Tasks" href="#">
                    <i className="icon fa fa-tasks"></i>
                    <span id="msgCount" className="badge">0</span>
                </a>
                <ul className="pull-right dropdown-menu dropdown-messages dropdown-arrow ">
                    <li id="msgCountDetail" className="dropdown-header bordered-darkorange">
                        <i className="fa fa-tasks"></i>
                        0 条待处理消息
                    </li>
                    <li className="dropdown-footer">
                        <a id="queryAllMsgs" href="#">
                            查看全部咨询信息
                        </a>
                    </li>
                </ul>
            </li>
        );

        let msgTip:MsgTip = new MsgTip();
        route.router.register(new MessageReceiver(ADDR, (e:route.Event)=>{
            switch (e.id){
                case route.MSG.NAV_REFRESH:
                    if (html != null){
                        $("#accountarea").children(":last").before(html);
                        html = null;
                    }
                    setInterval(()=>{
                        msgTip.updateTips();
                    }, 30000)
                    msgTip.updateTips();
                    break;
            }
        }));
    });

    import UnreadMessage = collection.protocol.UnreadMessage;
    export class MsgTip{

        constructor(){
            $("#queryAllMsgs").click(()=>{
                this.onClickQueryAllMessage();
                return false;
            });
        }

        updateTips(){
            collection.Message.getUnreadMessages()
                .done((mecs : UnreadMessage[])=>{
                   this.onLoadMEC(mecs);
                });
        }

        getDateFromTime(time):string{
            let dt = new Date(Date.parse(time));
            let now = new Date(Date.now());
            if (dt.getFullYear() == now.getFullYear() &&
                dt.getMonth() == now.getMonth()){
                if (dt.getDate() == now.getDate()){
                    return "今天";
                }
                now = new Date(now.getTime() - 24 * 60 * 3600);
                if (dt.getDate() == now.getDate()){
                    return "昨天";
                }

                now = new Date(now.getTime() - 24 * 60 * 3600);
                if (dt.getDate() == now.getDate()){
                    return "前天天";
                }
            }
            return time;
        }

        onClickQueryAllMessage(){
            alert("onClickQueryAllMessage");
        }

        clickMessage(msgId:number){
            alert(msgId);
            return false;
        }

        buildMessageDetail(um):string {
            let html = ReactDOMServer.renderToStaticMarkup(
                <li className="navMsgTmp">
                    <a id={um.msgId} href='#'>
                        <img src={collection.Net.BASE_URL + "/jsp/assets/img/avatars/bing.png"} className="message-avatar"
                             alt="Microsoft Bing"/>
                        <div className="message">
                            <span className="message-sender">
                                {um.fromName}
                            </span>
                            <span className="message-time">
                                {this.getDateFromTime(um.sendTime)}
                            </span>
                            <span className="message-subject">
                                {um.title}
                            </span>
                            <span className="message-body">
                                {um.content}
                            </span>
                        </div>
                    </a>
                </li>
            );
            return html;
        }

        onLoadMEC(ums : UnreadMessage[]):void{
            $("#msgCount").text(ums.length);
            $("#msgCountDetail").text(ums.length + "条待处理消息");
            $(".navMsgTmp").remove();
            for (let i = 0; i < ums.length; ++i){
                $("#msgCountDetail").after(this.buildMessageDetail(ums[i]));
                let id = ums[i].msgId;
                $("#" + ums[i].msgId).click(()=>{
                    this.clickMessage(id);
                });
            }
        }
    }
}