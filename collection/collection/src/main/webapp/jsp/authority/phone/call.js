///<reference path="../../sdk/phone.ts"/>
if (collection.phone.isAvailable()) {
    authority.register("/phone/call", function () {
    });
}
