///<reference path="protocol.ts"/>
///<reference path="net.ts"/>
module collection{
    import Promise = collection.protocol.Promise;
    import Result = collection.protocol.Result;
    import ECQueryInfo = collection.protocol.ECQueryInfo;
    import QueryOption = collection.protocol.QueryOption;
    import EntrustedCaseManageInfo = collection.protocol.EntrustedCaseManageInfo;

    export class EntrustedCaseReport{

        static getReports(entrustedCase:number, date:string):Promise<EntrustedCaseReport[]>{
            return Net.post(Net.BASE_URL + "/entrusted_case/report/search.do",{
                entrustedCase:entrustedCase,
                date:date
            });
        }

    }
}
