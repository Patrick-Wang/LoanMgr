///<reference path="../../registry.ts"/>
module authority.nav.tips.messages{
    import Receiver = route.Receiver;
    import PageType = pages.PageType;
    import Message = collection.Message;
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

        let msgTip:MsgTip = null;
        route.router.register(new Receiver(ADDR, (e:route.Event)=>{
            switch (e.id){
                case route.MSG.NAV_REFRESH:
                    if (html != null){
                        $("#accountarea").children(":last").before(html);
                        msgTip = new MsgTip();
                        html = null;
                    }
                    msgTip.updateTips();
                    break;
            }
        }));
    });

    export class MsgTip{
        mecs : collection.protocol.Message[];
        constructor(){
            $("#queryAllMsgs").click(()=>{
                this.onClickQueryAllMessage();
            });
        }

        updateTips(){
            collection.Message.getUnreadMessages()
                .done((mecs : collection.protocol.Message[])=>{
                   this.mecs = mecs;
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
            let msgIds = [];
            $(this.mecs).each((i, e:collection.protocol.Message)=>{
                msgIds.push(e.msgId);
            });
            if (msgIds.length > 0){
                Message.setMessageRead(msgIds).done(()=>{
                    sidebar.switchPage(PageType.askSth);
                    this.updateTips();
                })
            }else{
                sidebar.switchPage(PageType.askSth);
            }
        }

        clickMessage(msgId:number){
            Message.setMessageRead([msgId]).done(()=>{
                sidebar.switchPage(PageType.askSth);
                this.updateTips();
            })
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

        onLoadMEC(ums : collection.protocol.Message[]):void{
            $("#msgCount").text(ums.length);
            $("#msgCountDetail").text(ums.length + "条待处理消息");
            $(".navMsgTmp").remove();
            for (let i = 0; i < ums.length; ++i){
                $("#msgCountDetail").after(this.buildMessageDetail(ums[i]));
            }

            $(".navMsgTmp a").click((e)=>{
                this.clickMessage(e.currentTarget.id);
            });
        }
    }
}