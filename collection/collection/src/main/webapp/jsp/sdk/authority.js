///<reference path="protocol.ts"/>
///<reference path="net.ts"/>
var collection;
(function (collection) {
    class Authority {
        static getRoles() {
            return collection.Net.post(collection.Net.BASE_URL + "/authority/role.do");
        }
        static getIfs() {
            return collection.Net.post(collection.Net.BASE_URL + "/authority/interface.do");
        }
        static getRoleIfs(role) {
            return collection.Net.post(collection.Net.BASE_URL + "/authority/search.do", {
                role: role
            });
        }
        static deleteIfs(role, ifs) {
            return collection.Net.post(collection.Net.BASE_URL + "/authority/delete.do", {
                role: role,
                ifs: JSON.stringify(ifs)
            });
        }
        addIfs(role, ifs) {
            return collection.Net.post(collection.Net.BASE_URL + "/authority/add.do", {
                role: role,
                ifs: JSON.stringify(ifs)
            });
        }
    }
    collection.Authority = Authority;
})(collection || (collection = {}));
