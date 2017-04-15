///<reference path="protocol.ts"/>
///<reference path="net.ts"/>
module collection{
    import Organization = collection.protocol.Organization;
    import Promise = collection.protocol.Promise;
    import User = collection.protocol.User;
    import Result = collection.protocol.Result;
    import CreateUser = collection.protocol.CreateUser;
    export class Account{
        static getOrgs():Promise<Organization[]>{
            return Net.post(Net.BASE_URL + "/account/org/search.do");
        }

        static getUsers():Promise<User[]>{
            return Net.post(Net.BASE_URL + "/account/search.do");
        }

        static updateUsers(users:User[]):Promise<Result>{
            return Net.post(Net.BASE_URL + "/account/update.do",{
                users:JSON.stringify(users)
            });
        }

        static createUser(createUser:CreateUser):Promise<Result>{
            return Net.post(Net.BASE_URL + "/account/create.do",{
                user:JSON.stringify(createUser)
            });
        }
    }
}
