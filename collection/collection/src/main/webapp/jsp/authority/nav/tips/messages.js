var navbar;
(function (navbar) {
    var MessageReceiver = authority.MessageReceiver;
    var ADDR = "/nav/tips/messages";
    authority.register(ADDR, function () {
        var html = ReactDOMServer.renderToStaticMarkup(React.createElement("li", null, React.createElement("a", {"className": "dropdown-toggle", "data-toggle": "dropdown", "title": "Tasks", "href": "#"}, React.createElement("i", {"className": "icon fa fa-tasks"}), React.createElement("span", {"id": "msgCount", "className": "badge"}, "0")), React.createElement("ul", {"className": "pull-right dropdown-menu dropdown-messages dropdown-arrow "}, React.createElement("li", {"id": "msgCountDetail", "className": "dropdown-header bordered-darkorange"}, React.createElement("i", {"className": "fa fa-tasks"}), "0 条待处理消息"), React.createElement("li", {"className": "dropdown-footer"}, React.createElement("a", {"id": "queryAllMsgs", "href": "#"}, "查看全部咨询信息")))));
        var msgTip = new MsgTip();
        route.router.register(new MessageReceiver(ADDR, function (e) {
            switch (e.id) {
                case navbar.ON_REFRESH:
                    if (html != null) {
                        $("#accountarea").children(":last").before(html);
                        html = null;
                    }
                    msgTip.updateTips();
                    break;
            }
        }));
    });
    var MsgTip = (function () {
        function MsgTip() {
            var _this = this;
            $("#queryAllMsgs").click(function () {
                _this.onClickQueryAllMessage();
                return false;
            });
        }
        MsgTip.prototype.updateTips = function () {
            var _this = this;
            collection.Message.getUnreadMessages()
                .done(function (mecs) {
                _this.onLoadMEC(mecs);
            });
        };
        MsgTip.prototype.getDateFromTime = function (time) {
            var dt = new Date(Date.parse(time));
            var now = new Date(Date.now());
            if (dt.getFullYear() == now.getFullYear() &&
                dt.getMonth() == now.getMonth()) {
                if (dt.getDate() == now.getDate()) {
                    return "今天";
                }
                now = new Date(now.getTime() - 24 * 60 * 3600);
                if (dt.getDate() == now.getDate()) {
                    return "昨天";
                }
                now = new Date(now.getTime() - 24 * 60 * 3600);
                if (dt.getDate() == now.getDate()) {
                    return "前天天";
                }
            }
            return time;
        };
        MsgTip.prototype.onClickQueryAllMessage = function () {
            alert("onClickQueryAllMessage");
        };
        MsgTip.prototype.clickMessage = function (msgId) {
            alert(msgId);
            return false;
        };
        MsgTip.prototype.buildMessageDetail = function (um) {
            var html = ReactDOMServer.renderToStaticMarkup(React.createElement("li", {"id": "navMsgTmp"}, React.createElement("a", {"id": um.msgId, "href": '#'}, React.createElement("img", {"src": collection.Net.BASE_URL + "/jsp/assets/img/avatars/bing.png", "className": "message-avatar", "alt": "Microsoft Bing"}), React.createElement("div", {"className": "message"}, React.createElement("span", {"className": "message-sender"}, um.fromName), React.createElement("span", {"className": "message-time"}, this.getDateFromTime(um.sendTime)), React.createElement("span", {"className": "message-subject"}, um.title), React.createElement("span", {"className": "message-body"}, um.content)))));
            return html;
        };
        MsgTip.prototype.onLoadMEC = function (ums) {
            var _this = this;
            $("#msgCount").text(ums.length);
            $("#msgCountDetail").text(ums.length + "条待处理消息");
            $("#navMsgTmp").remove();
            for (var i = 0; i < ums.length; ++i) {
                $("#msgCountDetail").after(this.buildMessageDetail(ums[i]));
                var id = ums[i].msgId;
                $("#" + ums[i].msgId).click(function () {
                    _this.clickMessage(id);
                });
            }
        };
        return MsgTip;
    })();
    navbar.MsgTip = MsgTip;
})(navbar || (navbar = {}));
