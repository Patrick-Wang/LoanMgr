///<reference path="protocol.ts"/>
///<reference path="net.ts"/>
var collection;
(function (collection) {
    var EntrustedCase = (function () {
        function EntrustedCase() {
        }
        EntrustedCase.search = function (type, qOpt) {
            return collection.Net.post(collection.Net.BASE_URL + "/entrusted_case/search.do", {
                type: type,
                query: JSON.stringify(qOpt)
            });
        };
        EntrustedCase.update = function (type, data) {
            return collection.Net.post(collection.Net.BASE_URL + "/entrusted_case/update.do", {
                type: type,
                data: JSON.stringify(data)
            });
        };
        EntrustedCase.getAssignSummary = function () {
            return collection.Net.post(collection.Net.BASE_URL + "/entrusted_case/assign/summary.do");
        };
        EntrustedCase.getAcceptSummary = function () {
            return collection.Net.post(collection.Net.BASE_URL + "/entrusted_case/accept/summary.do");
        };
        return EntrustedCase;
    })();
    collection.EntrustedCase = EntrustedCase;
})(collection || (collection = {}));
