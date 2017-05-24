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
        EntrustedCase.getWwjgs = function (type) {
            return collection.Net.post(collection.Net.BASE_URL + "/entrusted_case/wwjgs.do", {
                type: type
            });
        };
        EntrustedCase.getAssignSummary = function () {
            return collection.Net.postLocal(collection.Net.BASE_URL + "/entrusted_case/assign/summary.do");
        };
        EntrustedCase.getManagerSummary = function () {
            return collection.Net.postLocal(collection.Net.BASE_URL + "/entrusted_case/manager/summary.do");
        };
        EntrustedCase.getAcceptSummary = function () {
            return collection.Net.postLocal(collection.Net.BASE_URL + "/entrusted_case/accept/summary.do");
        };
        EntrustedCase.updateAttachement = function (attachs) {
            return collection.Net.post(collection.Net.BASE_URL + "/entrusted_case/attach/update.do", {
                attachs: JSON.stringify(attachs)
            });
        };
        EntrustedCase.delete = function (type, ids) {
            return collection.Net.post(collection.Net.BASE_URL + "/entrusted_case/delete.do", {
                ids: JSON.stringify(ids),
                type: type
            });
        };
        return EntrustedCase;
    })();
    collection.EntrustedCase = EntrustedCase;
})(collection || (collection = {}));
