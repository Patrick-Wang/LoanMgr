///<reference path="protocol.ts"/>
///<reference path="net.ts"/>
var collection;
(function (collection) {
    var Authority = (function () {
        function Authority() {
        }
        Authority.getRoles = function () {
            return collection.Net.post(collection.Net.BASE_URL + "/authority/role.do");
        };
        Authority.getIfs = function () {
            return collection.Net.post(collection.Net.BASE_URL + "/authority/interface.do");
        };
        Authority.getRoleIfs = function (role) {
            return collection.Net.post(collection.Net.BASE_URL + "/authority/search.do", {
                role: role
            });
        };
        Authority.deleteIfs = function (role, ifs) {
            return collection.Net.post(collection.Net.BASE_URL + "/authority/delete.do", {
                role: role,
                ifs: JSON.stringify(ifs)
            });
        };
        Authority.prototype.addIfs = function (role, ifs) {
            return collection.Net.post(collection.Net.BASE_URL + "/authority/add.do", {
                role: role,
                ifs: JSON.stringify(ifs)
            });
        };
        return Authority;
    })();
    collection.Authority = Authority;
})(collection || (collection = {}));
