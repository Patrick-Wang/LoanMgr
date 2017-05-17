///<reference path="protocol.ts"/>
///<reference path="net.ts"/>
var collection;
(function (collection) {
    var EntrustedCaseReport = (function () {
        function EntrustedCaseReport() {
        }
        EntrustedCaseReport.createPhoneInReport = function (entrustedCaseId, num, recId) {
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
        EntrustedCaseReport.createPhoneOutReport = function (entrustedCaseId, title, content, fileName) {
            var dt = new Date();
            var ecr = {
                entrustedCaseId: entrustedCaseId,
                date: dt.getFullYear() + "-" + dt.getMonth() + "-" + dt.getDate(),
                title: title,
                content: content,
                attachements: [{
                        display: fileName
                    }]
            };
            return collection.Net.post(collection.Net.BASE_URL + "/entrusted_case/report/submit.do", {
                report: JSON.stringify(ecr)
            });
        };
        EntrustedCaseReport.createReport = function (entrustedCaseId, title, content) {
            var dt = new Date();
            var ecr = {
                entrustedCaseId: entrustedCaseId,
                date: dt.getFullYear() + "-" + dt.getMonth() + "-" + dt.getDate(),
                title: title,
                content: content
            };
            return collection.Net.post(collection.Net.BASE_URL + "/entrusted_case/report/submit.do", {
                report: JSON.stringify(ecr)
            });
        };
        EntrustedCaseReport.reportParams = function (entrustedCaseId, title, content) {
            var dt = new Date();
            var ecr = {
                entrustedCaseId: entrustedCaseId,
                date: dt.getFullYear() + "-" + dt.getMonth() + "-" + dt.getDate(),
                title: title,
                content: content
            };
            return JSON.stringify(ecr);
        };
        return EntrustedCaseReport;
    })();
    collection.EntrustedCaseReport = EntrustedCaseReport;
})(collection || (collection = {}));
