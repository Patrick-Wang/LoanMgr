///<reference path="protocol.ts"/>
///<reference path="account.ts"/>
var collection;
(function (collection) {
    var Net = (function () {
        function Net() {
        }
        Net.post = function (url, data) {
            var deferred = $.Deferred();
            $.ajax({
                type: 'POST',
                url: url,
                data: data
            }).done(function (obj) {
                var jobj = JSON.parse(obj);
                if (jobj != undefined &&
                    jobj.redirect != undefined &&
                    jobj.error == "invalidate session") {
                    window.location.href = jobj.redirect;
                }
                else {
                    deferred.resolve(jobj);
                }
            }).fail(function (err) {
                deferred.reject(err);
            });
            return deferred.promise();
        };
        Net.postLocal = function (url, data) {
            var deferred = $.Deferred();
            $.ajax({
                type: 'POST',
                url: url,
                global: false,
                data: data
            }).done(function (obj) {
                var jobj = JSON.parse(obj);
                if (jobj != undefined &&
                    jobj.redirect != undefined &&
                    jobj.error == "invalidate session") {
                    window.location.href = jobj.redirect;
                }
                else {
                    deferred.resolve(jobj);
                }
            }).fail(function (err) {
                deferred.reject(err);
            });
            return deferred.promise();
        };
        Net.BASE_URL = window.document.location.pathname.substring(0, window.document.location.pathname.indexOf("/", 1));
        return Net;
    }());
    collection.Net = Net;
})(collection || (collection = {}));
