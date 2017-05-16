///<reference path="protocol.ts"/>
///<reference path="net.ts"/>
var collection;
(function (collection) {
    var Message = (function () {
        function Message() {
        }
        Message.getUnreadCount = function (entrusted_case) {
            return collection.Net.postLocal(collection.Net.BASE_URL + "/message/unread.do", {
                entrusted_case: entrusted_case
            });
        };
        Message.setMessageRead = function (mids) {
            return collection.Net.postLocal(collection.Net.BASE_URL + "/message/read_message.do", {
                mids: JSON.stringify(mids)
            });
        };
        Message.getUnreadMessages = function (local) {
            if (local === void 0) { local = true; }
            if (local) {
                return collection.Net.postLocal(collection.Net.BASE_URL + "/message/unread_messages.do");
            }
            return collection.Net.post(collection.Net.BASE_URL + "/message/unread_messages.do");
        };
        Message.getSendMessages = function (read, local) {
            if (local === void 0) { local = true; }
            if (local) {
                return collection.Net.postLocal(collection.Net.BASE_URL + "/message/send_messages.do", {
                    read: read
                });
            }
            return collection.Net.post(collection.Net.BASE_URL + "/message/send_messages.do", {
                read: read
            });
        };
        Message.sendMessage = function (entrusted_case, to, title, message) {
            return collection.Net.post(collection.Net.BASE_URL + "/message/send.do", {
                entrusted_case: entrusted_case,
                to: to,
                title: title,
                message: message
            });
        };
        Message.getMessages = function (entrusted_case, partner) {
            return collection.Net.post(collection.Net.BASE_URL + "/message/receive.do", {
                entrusted_case: entrusted_case,
                with: partner
            });
        };
        Message.pairs = function (msgs) {
            var ecMap = {};
            var index = [];
            for (var i = 0; i < msgs.length; ++i) {
                if (!ecMap[msgs[i].ecMgrId] && (msgs[i].title == undefined || msgs[i].title.indexOf("RE:") < 0)) {
                    ecMap[msgs[i].ecMgrId] = [];
                    index.push(msgs[i].ecMgrId);
                }
                if (ecMap[msgs[i].ecMgrId]) {
                    if (msgs[i].title != undefined && msgs[i].title.indexOf("RE:") == 0) {
                        var msgId = msgs[i].title.substring(3);
                        for (var j = 0; j < index.length; ++j) {
                            for (var k = 0; k < ecMap[index[j]].length; ++k) {
                                if (ecMap[index[j]][k][0].msgId == msgId) {
                                    ecMap[index[j]][k].push(msgs[i]);
                                    break;
                                }
                            }
                        }
                    }
                    else {
                        ecMap[msgs[i].ecMgrId].push([msgs[i]]);
                    }
                }
            }
            var msgPairs = [];
            for (var i = 0; i < index.length; ++i) {
                for (var j = 0; j < ecMap[index[i]].length; ++j) {
                    var pair = {
                        ecId: index[i],
                        ask: ecMap[index[i]][j][0],
                        answer: ecMap[index[i]][j][1]
                    };
                    msgPairs.push(pair);
                }
            }
            return msgPairs;
        };
        return Message;
    })();
    collection.Message = Message;
})(collection || (collection = {}));
