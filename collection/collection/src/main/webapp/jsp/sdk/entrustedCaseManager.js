///<reference path="protocol.ts"/>
///<reference path="net.ts"/>
var collection;
(function (collection) {
    class EntrustedCaseManager {
        static getManagerInfo(type, qOpt) {
            return collection.Net.post(collection.Net.BASE_URL + "/entrusted_case/manager/search.do");
        }
        static update(data) {
            return collection.Net.post(collection.Net.BASE_URL + "/entrusted_case/manager/update.do", {
                data: JSON.stringify(data)
            });
        }
    }
    collection.EntrustedCaseManager = EntrustedCaseManager;
})(collection || (collection = {}));
