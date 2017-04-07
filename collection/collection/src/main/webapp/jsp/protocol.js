/**
 * Created by Floyd on 2017/4/7.
 */
var collection;
(function (collection) {
    var protocol;
    (function (protocol) {
        (function (UseStatus) {
            UseStatus[UseStatus["inuse"] = 0] = "inuse";
            UseStatus[UseStatus["stop"] = 1] = "stop";
        })(protocol.UseStatus || (protocol.UseStatus = {}));
        var UseStatus = protocol.UseStatus;
        (function (EntrustedCaseType) {
        })(protocol.EntrustedCaseType || (protocol.EntrustedCaseType = {}));
        var EntrustedCaseType = protocol.EntrustedCaseType;
        (function (MessageStatus) {
            MessageStatus[MessageStatus["unread"] = 0] = "unread";
            MessageStatus[MessageStatus["read"] = 1] = "read";
        })(protocol.MessageStatus || (protocol.MessageStatus = {}));
        var MessageStatus = protocol.MessageStatus;
    })(protocol = collection.protocol || (collection.protocol = {}));
})(collection || (collection = {}));
//# sourceMappingURL=protocol.js.map