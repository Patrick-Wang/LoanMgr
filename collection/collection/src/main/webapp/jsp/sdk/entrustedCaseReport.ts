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

        static createPhoneInReport(entrustedCaseId:number, num:string, recId:number):Promise<Result>{
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

        static createPhoneOutReport(entrustedCaseId:number, num:string, fileName:string):Promise<Result>{
            let dt = new Date();
            let ecr : collection.protocol.EntrustedCaseReport = {
                entrustedCaseId : entrustedCaseId,
                date: dt.getFullYear() + "-" + dt.getMonth() + "-" + dt.getDate(),
                title:"呼出电话",
                content:num,
                attachements:[{
                    display:fileName
                }]
            };
            return Net.post(Net.BASE_URL + "/entrusted_case/report/submit.do",{
                report:JSON.stringify(ecr)
            });
        }

        static createReport(entrustedCaseId:number, title:string, content:string):Promise<Result>{
            let dt = new Date();
            let ecr : collection.protocol.EntrustedCaseReport = {
                entrustedCaseId : entrustedCaseId,
                date: dt.getFullYear() + "-" + dt.getMonth() + "-" + dt.getDate(),
                title:title,
                content:content
            };
            return Net.post(Net.BASE_URL + "/entrusted_case/report/submit.do",{
                report:JSON.stringify(ecr)
            });
        }

        static reportParams(entrustedCaseId:number, title:string, content:string):string{
            let dt = new Date();
            let ecr : collection.protocol.EntrustedCaseReport = {
                entrustedCaseId : entrustedCaseId,
                date: dt.getFullYear() + "-" + dt.getMonth() + "-" + dt.getDate(),
                title:title,
                content:content
            };
            return JSON.stringify(ecr);
        }
    }
}
