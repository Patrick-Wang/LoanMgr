///<reference path="protocol.ts"/>
///<reference path="net.ts"/>
var collection;
(function (collection) {
    var EntrustedCaseReport = (function () {
        function EntrustedCaseReport() {
        }
        EntrustedCaseReport.getReports = function (entrustedCase, date) {
            return collection.Net.post(collection.Net.BASE_URL + "/entrusted_case/report/search.do", {
                entrustedCase: entrustedCase,
                date: date
            });
        };
        return EntrustedCaseReport;
    })();
    collection.EntrustedCaseReport = EntrustedCaseReport;
})(collection || (collection = {}));
