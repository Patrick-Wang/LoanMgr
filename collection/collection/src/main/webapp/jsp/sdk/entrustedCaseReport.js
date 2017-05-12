///<reference path="protocol.ts"/>
///<reference path="net.ts"/>
var collection;
(function (collection) {
    var EntrustedCaseReport = (function () {
        function EntrustedCaseReport() {
        }
        EntrustedCaseReport.createPhoneReport = function (entrustedCaseId, num, recId) {
            var dt = new Date();
            var ecr = {
                entrustedCaseId: entrustedCaseId,
                date: dt.getFullYear() + "-" + dt.getMonth() + "-" + dt.getDate(),
                title: "呼入电话",
                content: num,
                phoneRecId: recId
            };
            return collection.Net.post(collection.Net.BASE_URL + "/entrusted_case/report/submit.do", {
                report: JSON.stringify(ecr)
            });
        };
        return EntrustedCaseReport;
    })();
    collection.EntrustedCaseReport = EntrustedCaseReport;
})(collection || (collection = {}));
