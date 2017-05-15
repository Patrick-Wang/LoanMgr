///<reference path="protocol.ts"/>
///<reference path="net.ts"/>
module collection{
    import Promise = collection.protocol.Promise;
    import Result = collection.protocol.Result;
    import QueryOption = collection.protocol.QueryOption;
    import EntrustedCaseManageInfo = collection.protocol.EntrustedCaseManageInfo;

    export class EntrustedCaseManager{

        static getManagerInfo():Promise<EntrustedCaseManageInfo[]>{
            return Net.post(Net.BASE_URL + "/entrusted_case/manager/search.do");
        }

        static update(data:EntrustedCaseManageInfo[]):Promise<Result>{
            return Net.post(Net.BASE_URL + "/entrusted_case/manager/update.do", {
                data: JSON.stringify(data)
            });
        }

        static getBatchNOs():Promise<number[]>{
            return Net.post(Net.BASE_URL + "/entrusted_case/manager/batch.do");
        }

    }
}
