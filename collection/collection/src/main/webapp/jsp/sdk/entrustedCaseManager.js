///<reference path="protocol.ts"/>
///<reference path="net.ts"/>
var collection;
(function (collection) {
    var EntrustedCaseManager = (function () {
        function EntrustedCaseManager() {
        }
        EntrustedCaseManager.getManagerInfo = function (type, qOpt) {
            return collection.Net.post(collection.Net.BASE_URL + "/entrusted_case/manager/search.do");
        };
        EntrustedCaseManager.update = function (data) {
            return collection.Net.post(collection.Net.BASE_URL + "/entrusted_case/manager/update.do", {
                data: JSON.stringify(data)
            });
        };
        return EntrustedCaseManager;
    })();
    collection.EntrustedCaseManager = EntrustedCaseManager;
})(collection || (collection = {}));
