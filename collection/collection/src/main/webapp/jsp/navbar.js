///<reference path="sdk/message.ts"/>
var navbar;
(function (navbar) {
    var Message = collection.Message;
    var Net = collection.Net;
    var NavBar = (function () {
        function NavBar() {
        }
        NavBar.openMessageTips = function () {
            Message.getEntrustedCases()
                .done(function (mecs) {
                NavBar.ins.onLoadMEC(mecs);
            });
            $("#queryAllMsgs").click(function () {
                NavBar.ins.onClickQueryAllMessage();
            });
        };
        NavBar.prototype.onClickQueryAllMessage = function () {
        };
        NavBar.prototype.getDateFromTime = function (time) {
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
        NavBar.prototype.clickMessage = function (msgId) {
            alert(msgId);
            return false;
        };
        NavBar.prototype.buildMessageDetail = function (detailli, um) {
            var detail = detailli.after("<li> " +
                "<a onclick='navbar.NavBar.ins.clickMessage(" + um.msgId + ")' href='#'>" +
                '<img src="' + Net.BASE_URL + '/jsp/assets/img/avatars/bing.png" class="message-avatar" alt="Microsoft Bing">' +
                '<div class="message">' +
                '<span class="message-sender">' +
                um.fromName +
                '</span>' +
                '<span class="message-time">' +
                this.getDateFromTime(um.sendTime) +
                '</span>' +
                '<span class="message-subject">' +
                um.title +
                '</span>' +
                '<span class="message-body">' +
                um.content +
                '</span>' +
                '</div>' +
                "</a>" +
                "</li>");
        };
        NavBar.prototype.onLoadMEC = function (ums) {
            $("#msgCount").text(ums.length);
            $("#msgCountDetail").text(ums.length + "消息待处理");
            for (var i = 0; i < ums.length; ++i) {
                this.buildMessageDetail($("#msgCountDetail"), ums[i]);
            }
        };
        NavBar.ins = new NavBar();
        return NavBar;
    })();
    navbar.NavBar = NavBar;
})(navbar || (navbar = {}));
