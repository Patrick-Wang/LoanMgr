///<reference path="sdk/message.ts"/>
///<reference path="sdk/phone.ts"/>
///<reference path="sdk/route/route.ts"/>
var navbar;
(function (navbar) {
    var Message = collection.Message;
    var Net = collection.Net;
    var Phone = collection.Phone;
    var CallStatus = collection.protocol.CallStatus;
    navbar.ON_REFRESH = route.nextId();
    class NavBar {
        constructor() {
            route.router.broadcast(navbar.ON_REFRESH);
        }
        static openMessageTips() {
            NavBar.ins.triggerRefreshMessageTips();
            $("#queryAllMsgs").click(() => {
                NavBar.ins.onClickQueryAllMessage();
                return false;
            });
        }
        static openCallTips() {
            NavBar.ins.triggerRefreshCallCenterTips();
            $("#navCallCenter").click(() => {
                NavBar.ins.onClicCallCenter();
                return false;
            });
        }
        triggerRefreshMessageTips() {
            Message.getUnreadMessages()
                .done((mecs) => {
                NavBar.ins.onLoadMEC(mecs);
            });
        }
        triggerRefreshCallCenterTips() {
            Phone.getRecords().done((prs) => {
                NavBar.ins.onLoadCallInfos(prs);
            });
        }
        onClickQueryAllMessage() {
        }
        onClicCallCenter() {
        }
        getDateFromTime(time) {
            let dt = new Date(Date.parse(time));
            let now = new Date(Date.now());
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
        }
        clickMessage(msgId) {
            alert(msgId);
            return false;
        }
        buildMessageDetail(detailli, um) {
            let detail = detailli.after("<li> " +
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
        }
        onLoadMEC(ums) {
            $("#msgCount").text(ums.length);
            $("#msgCountDetail").text(ums.length + "条待处理消息");
            for (let i = 0; i < ums.length; ++i) {
                this.buildMessageDetail($("#msgCountDetail"), ums[i]);
            }
        }
        buildCallCenter(detailli, pr) {
            let detail = detailli.before('<li>' +
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
        }
        onLoadCallInfos(prs) {
            let count = 5;
            for (let i = 0; i < prs.length && count > 0; ++i) {
                if (prs[i].status == CallStatus.missed) {
                    this.buildCallCenter($("#navCallCenter").parent(), prs[i]);
                    --count;
                }
            }
            $("#navCallCount").text(5 - count);
        }
    }
    NavBar.ins = new NavBar();
    navbar.NavBar = NavBar;
})(navbar || (navbar = {}));
