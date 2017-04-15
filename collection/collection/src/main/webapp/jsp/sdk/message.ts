///<reference path="protocol.ts"/>
///<reference path="net.ts"/>
module collection{
    import Promise = collection.protocol.Promise;
    import Result = collection.protocol.Result;
    import Role = collection.protocol.Role;
    import IF = collection.protocol.IF;
    import UnreadMessage = collection.protocol.UnreadMessage;

    export class Message{
        //unread(entrusted_case:number):Promise<number>{
        //    return Net.post("message/unread.do",{
        //        entrusted_case:entrusted_case
        //    });
        //}

        static setMessageRead(mids:number[]):Promise<Result>{
            return Net.post(Net.BASE_URL + "/message/read_message.do",{
                mids:JSON.stringify(mids)
            });
        }

        static getEntrustedCases():Promise<UnreadMessage[]>{
            return Net.post(Net.BASE_URL + "/message/unread_messages.do");
        }

        static getMessages(entrusted_case:number, partner:number):Promise<Message[]>{
            return Net.post(Net.BASE_URL + "/message/receive.do",{
                entrusted_case:entrusted_case,
                with:partner
            });
        }
    }
}
