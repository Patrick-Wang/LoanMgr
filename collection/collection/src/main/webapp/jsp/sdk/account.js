///<reference path="protocol.ts"/>
///<reference path="net.ts"/>
var collection;
(function (collection) {
    var Account = (function () {
        function Account() {
        }
        Account.getOrgs = function () {
            return collection.Net.post(collection.Net.BASE_URL + "/account/org/search.do");
        };
        Account.getUsers = function (ifs) {
            return collection.Net.post(collection.Net.BASE_URL + "/account/search.do", {
                ifs: JSON.stringify(ifs),
            });
        };
        Account.updateUsers = function (users) {
            return collection.Net.post(collection.Net.BASE_URL + "/account/update.do", {
                users: JSON.stringify(users)
            });
        };
        Account.createUser = function (createUser) {
            return collection.Net.post(collection.Net.BASE_URL + "/account/create.do", {
                user: JSON.stringify(createUser)
            });
        };
        return Account;
    })();
    collection.Account = Account;
})(collection || (collection = {}));
