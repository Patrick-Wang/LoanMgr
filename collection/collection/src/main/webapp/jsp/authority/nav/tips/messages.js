authority.register("/nav/tips/messages", function() {

    var html = ReactDOMServer.renderToStaticMarkup(
        React.createElement("li", null, 
            React.createElement("a", {className: "dropdown-toggle", "data-toggle": "dropdown", title: "Tasks", href: "#"}, 
                React.createElement("i", {className: "icon fa fa-tasks"}), 
                React.createElement("span", {id: "msgCount", className: "badge"}, "0")
            ), 
            React.createElement("ul", {className: "pull-right dropdown-menu dropdown-messages dropdown-arrow "}, 
                React.createElement("li", {id: "msgCountDetail", className: "dropdown-header bordered-darkorange"}, 
                    React.createElement("i", {className: "fa fa-tasks"}), 
                    "0 条待处理消息"
                ), 
                React.createElement("li", {className: "dropdown-footer"}, 
                    React.createElement("a", {id: "queryAllMsgs", href: "#"}, 
                        "查看全部咨询信息"
                    )
                )
            )
        )
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
        React.createElement("li", {id: "navMsgTmp"}, 
            React.createElement("a", {onclick: "navbar.MsgTip.ins.clickMessage('"+ um.msgId + "')", href: "#"}, 
                React.createElement("img", {src: collection.Net.BASE_URL + "/jsp/assets/img/avatars/bing.png", className: "message-avatar", 
                     alt: "Microsoft Bing"}), 
                React.createElement("div", {className: "message"}, 
                        React.createElement("span", {className: "message-sender"}, 
                            um.fromName
                        ), 
                        React.createElement("span", {className: "message-time"}, 
                            getDateFromTime(um.sendTime)
                        ), 
                        React.createElement("span", {className: "message-subject"}, 
                            um.title
                        ), 
                        React.createElement("span", {className: "message-body"}, 
                            um.content
                        )
                )
            )
        )
    );
    return html;
}