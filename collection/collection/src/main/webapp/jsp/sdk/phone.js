///<reference path="protocol.ts"/>
///<reference path="net.ts"/>
var collection;
(function (collection) {
    var Phone = (function () {
        function Phone() {
        }
        Phone.getRecords = function () {
            return collection.Net.postLocal(collection.Net.BASE_URL + "/phone/records.do");
        };
        return Phone;
    })();
    collection.Phone = Phone;
})(collection || (collection = {}));
