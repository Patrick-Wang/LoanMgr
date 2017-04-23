///<reference path="protocol.ts"/>
///<reference path="net.ts"/>
module collection{
    import Promise = collection.protocol.Promise;
    import Result = collection.protocol.Result;
    import ECQueryInfo = collection.protocol.ECQueryInfo;
    import QueryOption = collection.protocol.QueryOption;
    import EntrustedCaseManageInfo = collection.protocol.EntrustedCaseManageInfo;

    export class EntrustedCaseManager{

        static getManagerInfo(type:number, qOpt:QueryOption):Promise<EntrustedCaseManageInfo[]>{
            return Net.post(Net.BASE_URL + "/entrusted_case/manager/search.do");
        }

        static update(data:EntrustedCaseManageInfo):Promise<Result>{
            return Net.post(Net.BASE_URL + "/entrusted_case/manager/update.do", {
                data: JSON.stringify(data)
            });
        }

    }
}
