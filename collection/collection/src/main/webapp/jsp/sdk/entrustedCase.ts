///<reference path="protocol.ts"/>
///<reference path="net.ts"/>
module collection{
    import Promise = collection.protocol.Promise;
    import Result = collection.protocol.Result;
    import QueryOption = collection.protocol.QueryOption;
    import AssignSummary = collection.protocol.AssignSummary;
    import AcceptSummary = collection.protocol.AcceptSummary;
    import EC = collection.protocol.EC;
    import Attachement = collection.protocol.Attachement;
    import ManagerSummary = collection.protocol.ManagerSummary;

    export class EntrustedCase{
        static search(type:number, qOpt:QueryOption):Promise<EC[]>{
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

        static getAssignSummary():Promise<AssignSummary>{
            return Net.postLocal(Net.BASE_URL + "/entrusted_case/assign/summary.do");
        }

        static getManagerSummary():Promise<ManagerSummary>{
            return Net.postLocal(Net.BASE_URL + "/entrusted_case/manager/summary.do");
        }
        static getAcceptSummary():Promise<AcceptSummary>{
            return Net.postLocal(Net.BASE_URL + "/entrusted_case/accept/summary.do");
        }

        static updateAttachement(attachs : Attachement[]):Promise<Result>{
            return Net.post(Net.BASE_URL + "/entrusted_case/attach/update.do", {
                attachs: JSON.stringify(attachs)
            });
        }
    }
}
