///<reference path="protocol.ts"/>
///<reference path="net.ts"/>
var collection;
(function (collection) {
    class Message {
        //unread(entrusted_case:number):Promise<number>{
        //    return Net.post("message/unread.do",{
        //        entrusted_case:entrusted_case
        //    });
        //}
        static setMessageRead(mids) {
            return collection.Net.post(collection.Net.BASE_URL + "/message/read_message.do", {
                mids: JSON.stringify(mids)
            });
        }
        static getUnreadMessages() {
            return collection.Net.post(collection.Net.BASE_URL + "/message/unread_messages.do");
        }
        static getMessages(entrusted_case, partner) {
            return collection.Net.post(collection.Net.BASE_URL + "/message/receive.do", {
                entrusted_case: entrusted_case,
                with: partner
            });
        }
    }
    collection.Message = Message;
})(collection || (collection = {}));
