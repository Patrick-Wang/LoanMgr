///<reference path="protocol.ts"/>
///<reference path="net.ts"/>
var collection;
(function (collection) {
    class EntrustedCase {
        static search(type, qOpt) {
            return collection.Net.post(collection.Net.BASE_URL + "/entrusted_case/search.do", {
                type: type,
                query: JSON.stringify(qOpt)
            });
        }
        static update(type, data) {
            return collection.Net.post(collection.Net.BASE_URL + "/entrusted_case/update.do", {
                type: type,
                data: JSON.stringify(data)
            });
        }
    }
    collection.EntrustedCase = EntrustedCase;
})(collection || (collection = {}));
