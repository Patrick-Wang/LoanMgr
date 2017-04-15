///<reference path="protocol.ts"/>
///<reference path="net.ts"/>
module collection{
    import Promise = collection.protocol.Promise;
    import Result = collection.protocol.Result;
    import Role = collection.protocol.Role;
    import IF = collection.protocol.IF;

    export class Authority{
        static getRoles():Promise<Role[]>{
            return Net.post(Net.BASE_URL + "/authority/role.do");
        }

        static getIfs():Promise<IF[]>{
            return Net.post(Net.BASE_URL + "/authority/interface.do");
        }

        static getRoleIfs(role:number):Promise<number[]>{
            return Net.post(Net.BASE_URL + "/authority/search.do",{
                role:role
            });
        }

        static deleteIfs(role:number, ifs:number[]):Promise<Result>{
            return Net.post(Net.BASE_URL + "/authority/delete.do",{
                role:role,
                ifs:JSON.stringify(ifs)
            });
        }

        addIfs(role:number, ifs:number[]):Promise<Result>{
            return Net.post(Net.BASE_URL + "/authority/add.do",{
                role:role,
                ifs:JSON.stringify(ifs)
            });
        }
    }
}
