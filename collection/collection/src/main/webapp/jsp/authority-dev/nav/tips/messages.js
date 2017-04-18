authority.register("/nav/tips/messages", function() {

    var html = ReactDOMServer.renderToStaticMarkup(
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

    route.router.register({
        getAddr : function(){
            return "/nav/tips/messages"
        },
        onEvent: function(e){
            switch (e.id){
                case navbar.ON_REFRESH:
                    if (html != null){
                        $("#accountarea").children(":last").before(html);
                        html = null;
                    }
                    navbar.MsgTip.updateTips();
                    break;
            }
        }
    });


});
function getDateFromTime(time){
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

function buildMessageDetail(um) {
    var html = ReactDOMServer.renderToStaticMarkup(
        <li id="navMsgTmp">
            <a onclick={"navbar.MsgTip.ins.clickMessage('"+ um.msgId + "')"} href='#'>
                <img src={collection.Net.BASE_URL + "/jsp/assets/img/avatars/bing.png"} className="message-avatar"
                     alt="Microsoft Bing"/>
                <div className="message">
                        <span className="message-sender">
                            {um.fromName}
                        </span>
                        <span className="message-time">
                            {getDateFromTime(um.sendTime)}
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