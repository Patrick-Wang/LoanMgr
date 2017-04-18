///<reference path="protocol.ts"/>
///<reference path="net.ts"/>
var collection;
(function (collection) {
    class Phone {
        static getRecords() {
            return collection.Net.post(collection.Net.BASE_URL + "/phone/records.do");
        }
    }
    collection.Phone = Phone;
})(collection || (collection = {}));
