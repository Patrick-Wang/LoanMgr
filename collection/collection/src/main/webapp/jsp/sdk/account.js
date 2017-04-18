///<reference path="protocol.ts"/>
///<reference path="net.ts"/>
var collection;
(function (collection) {
    class Account {
        static getOrgs() {
            return collection.Net.post(collection.Net.BASE_URL + "/account/org/search.do");
        }
        static getUsers() {
            return collection.Net.post(collection.Net.BASE_URL + "/account/search.do");
        }
        static updateUsers(users) {
            return collection.Net.post(collection.Net.BASE_URL + "/account/update.do", {
                users: JSON.stringify(users)
            });
        }
        static createUser(createUser) {
            return collection.Net.post(collection.Net.BASE_URL + "/account/create.do", {
                user: JSON.stringify(createUser)
            });
        }
    }
    collection.Account = Account;
})(collection || (collection = {}));
