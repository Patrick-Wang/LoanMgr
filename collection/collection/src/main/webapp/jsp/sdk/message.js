///<reference path="protocol.ts"/>
///<reference path="net.ts"/>
var collection;
(function (collection) {
    var Message = (function () {
        function Message() {
        }
        Message.getUnreadCount = function (entrusted_case) {
            return collection.Net.post(collection.Net.BASE_URL + "/message/unread.do", {
                entrusted_case: entrusted_case
            });
        };
        Message.setMessageRead = function (mids) {
            return collection.Net.post(collection.Net.BASE_URL + "/message/read_message.do", {
                mids: JSON.stringify(mids)
            });
        };
        Message.getUnreadMessages = function () {
            return collection.Net.post(collection.Net.BASE_URL + "/message/unread_messages.do");
        };
        Message.getMessages = function (entrusted_case, partner) {
            return collection.Net.post(collection.Net.BASE_URL + "/message/receive.do", {
                entrusted_case: entrusted_case,
                with: partner
            });
        };
        return Message;
    })();
    collection.Message = Message;
})(collection || (collection = {}));
