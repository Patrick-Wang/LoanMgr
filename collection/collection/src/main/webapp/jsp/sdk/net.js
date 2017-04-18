///<reference path="protocol.ts"/>
///<reference path="account.ts"/>
var collection;
(function (collection) {
    class Net {
        static post(url, data) {
            let deferred = $.Deferred();
            $.ajax({
                type: 'POST',
                url: url,
                data: data
            }).done((obj) => {
                let jobj = JSON.parse(obj);
                if (jobj != undefined &&
                    jobj.redirect != undefined &&
                    jobj.error == "invalidate session") {
                    window.location.href = jobj.redirect;
                }
                else {
                    deferred.resolve(jobj);
                }
            }).fail((err) => {
                deferred.reject(err);
            });
            return deferred.promise();
        }
    }
    Net.BASE_URL = window.document.location.pathname.substring(0, window.document.location.pathname.indexOf("/", 1));
    collection.Net = Net;
})(collection || (collection = {}));
