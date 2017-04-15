///<reference path="protocol.ts"/>
///<reference path="net.ts"/>
module collection{
    import Promise = collection.protocol.Promise;
    import Result = collection.protocol.Result;
    import ECQueryInfo = collection.protocol.ECQueryInfo;
    import QueryOption = collection.protocol.QueryOption;

    export class EntrustedCase{
        static search(type:number, qOpt:QueryOption):Promise<ECQueryInfo>{
            return Net.post(Net.BASE_URL + "/entrusted_case/search.do", {
                type:type,
                query:JSON.stringify(qOpt)
            });
        }

        static update(type:number, data:any):Promise<Result>{
            return Net.post(Net.BASE_URL + "/entrusted_case/update.do", {
                type: type,
                data: JSON.stringify(data)
            });
        }
    }
}
