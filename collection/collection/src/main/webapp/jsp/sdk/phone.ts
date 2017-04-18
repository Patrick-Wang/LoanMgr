///<reference path="protocol.ts"/>
///<reference path="net.ts"/>
module collection{
    import Promise = collection.protocol.Promise;
    import PhoneRecord = collection.protocol.PhoneRecord;

    export class Phone{
        static getRecords():Promise<PhoneRecord[]>{
            return Net.post(Net.BASE_URL + "/phone/records.do");
        }
    }
}
