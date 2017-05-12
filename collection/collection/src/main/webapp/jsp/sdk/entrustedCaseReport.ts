///<reference path="protocol.ts"/>
///<reference path="net.ts"/>
module collection{
    import Promise = collection.protocol.Promise;
    import Result = collection.protocol.Result;
    import QueryOption = collection.protocol.QueryOption;
    import EntrustedCaseManageInfo = collection.protocol.EntrustedCaseManageInfo;
    import EntrustedCaseType = collection.protocol.EntrustedCaseType;
    import CallStatus = collection.protocol.CallStatus;

    export class EntrustedCaseReport{

        static createPhoneReport(entrustedCaseId:number, num:string, recId:number):Promise<Result>{
            let dt = new Date();
            let ecr : collection.protocol.EntrustedCaseReport = {
                entrustedCaseId : entrustedCaseId,
                date: dt.getFullYear() + "-" + dt.getMonth() + "-" + dt.getDate(),
                title:"呼入电话",
                content:num,
                phoneRecId:recId
            };
            return Net.post(Net.BASE_URL + "/entrusted_case/report/submit.do",{
                report:JSON.stringify(ecr)
            });
        }
    }
}
