///<reference path="protocol.ts"/>
///<reference path="net.ts"/>
module collection{
    import Promise = collection.protocol.Promise;
    import Result = collection.protocol.Result;
    import Role = collection.protocol.Role;
    import IF = collection.protocol.IF;
    import MessageStatus = collection.protocol.MessageStatus;

    export interface MsgPair {
        ecId:number;
        ask:collection.protocol.Message;
        answer:collection.protocol.Message;
    }

    export class Message{
        static getUnreadCount(entrusted_case?:number):Promise<number>{
            return Net.postLocal(Net.BASE_URL + "/message/unread.do",{
                entrusted_case:entrusted_case
            });
        }

        static setMessageRead(mids:number[]):Promise<Result>{
            return Net.postLocal(Net.BASE_URL + "/message/read_message.do",{
                mids:JSON.stringify(mids)
            });
        }

        static getUnreadMessages(local:boolean=true):Promise<collection.protocol.Message[]>{
            if (local){
                return Net.postLocal(Net.BASE_URL + "/message/unread_messages.do");
            }
            return Net.post(Net.BASE_URL + "/message/unread_messages.do");
        }

        static getSendMessages(read?:MessageStatus, local:boolean=true):Promise<collection.protocol.Message[]>{
            if (local){
                return  Net.postLocal(Net.BASE_URL + "/message/send_messages.do",{
                    read:read
                });
            }
            return Net.post(Net.BASE_URL + "/message/send_messages.do",{
                read:read
            });
        }

        static sendMessage(entrusted_case:number, to:number, title:string, message:string):Promise<Result>{
            return Net.post(Net.BASE_URL + "/message/send.do",{
                entrusted_case:entrusted_case,
                to:to,
                title:title,
                message:message
            });
        }

        static getMessages(entrusted_case?:number, partner?:number):Promise<collection.protocol.Message[]>{
            return Net.post(Net.BASE_URL + "/message/receive.do",{
                entrusted_case:entrusted_case,
                with:partner
            });
        }

        static pairs(msgs :collection.protocol.Message[]):MsgPair[]{
            let ecMap:any = {};
            let index:any[] = [];
            for (let i = 0; i < msgs.length; ++i) {
                if (!ecMap[msgs[i].ecMgrId] && (msgs[i].title == undefined || msgs[i].title.indexOf("RE:") < 0)) {
                    ecMap[msgs[i].ecMgrId] = [];
                    index.push(msgs[i].ecMgrId);
                }
                if (ecMap[msgs[i].ecMgrId]) {
                    if (msgs[i].title != undefined && msgs[i].title.indexOf("RE:") == 0) {
                        let msgId = msgs[i].title.substring(3);
                        for (let j = 0; j < index.length; ++j) {
                            for (let k = 0; k < ecMap[index[j]].length; ++k) {
                                if (ecMap[index[j]][k][0].msgId == msgId) {
                                    ecMap[index[j]][k].push(msgs[i]);
                                    break;
                                }
                            }

                        }
                    } else {
                        ecMap[msgs[i].ecMgrId].push([msgs[i]]);
                    }
                }
            }
            let msgPairs = [];
            for (let i = 0; i < index.length; ++i) {
                for (let j = 0; j < ecMap[index[i]].length; ++j) {
                    let pair:MsgPair = {
                        ecId: index[i],
                        ask: ecMap[index[i]][j][0],
                        answer: ecMap[index[i]][j][1]
                    };
                    msgPairs.push(pair);
                }
            }
            return msgPairs;
        }
    }
}
