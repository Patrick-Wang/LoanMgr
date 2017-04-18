///<reference path="sdk/message.ts"/>
///<reference path="sdk/phone.ts"/>
var navbar;
(function (navbar) {
    var Message = collection.Message;
    var Net = collection.Net;
    var Phone = collection.Phone;
    var CallStatus = collection.protocol.CallStatus;
    var NavBar = (function () {
        function NavBar() {
        }
        NavBar.openMessageTips = function () {
            NavBar.ins.triggerRefreshMessageTips();
            $("#queryAllMsgs").click(function () {
                NavBar.ins.onClickQueryAllMessage();
                return false;
            });
        };
        NavBar.openCallTips = function () {
            NavBar.ins.triggerRefreshCallCenterTips();
            $("#navCallCenter").click(function () {
                NavBar.ins.onClicCallCenter();
                return false;
            });
        };
        NavBar.prototype.triggerRefreshMessageTips = function () {
            Message.getEntrustedCases()
                .done(function (mecs) {
                NavBar.ins.onLoadMEC(mecs);
            });
        };
        NavBar.prototype.triggerRefreshCallCenterTips = function () {
            Phone.getRecords().done(function (prs) {
                NavBar.ins.onLoadCallInfos(prs);
            });
        };
        NavBar.prototype.onClickQueryAllMessage = function () {
        };
        NavBar.prototype.onClicCallCenter = function () {
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
            $("#msgCountDetail").text(ums.length + "条待处理消息");
            for (var i = 0; i < ums.length; ++i) {
                this.buildMessageDetail($("#msgCountDetail"), ums[i]);
            }
        };
        NavBar.prototype.buildCallCenter = function (detailli, pr) {
            var detail = detailli.before('<li>' +
                '<a href="#">' +
                '<div class="clearfix">' +
                '<div class="notification-icon">' +
                '<i class="fa fa-phone bg-themeprimary white"></i>' +
                '</div>' +
                '<div class="notification-body">' +
                '<span class="title red">未接来电：' + pr.phoneNum + '</span>' +
                '<span class="description">' + pr.time + '</span>' +
                '</div>' +
                '</div>' +
                '</a>' +
                '</li>');
        };
        NavBar.prototype.onLoadCallInfos = function (prs) {
            var count = 5;
            for (var i = 0; i < prs.length && count > 0; ++i) {
                if (prs[i].status == CallStatus.missed) {
                    this.buildCallCenter($("#navCallCenter").parent(), prs[i]);
                    --count;
                }
            }
            $("#navCallCount").text(5 - count);
        };
        NavBar.ins = new NavBar();
        return NavBar;
    })();
    navbar.NavBar = NavBar;
})(navbar || (navbar = {}));
