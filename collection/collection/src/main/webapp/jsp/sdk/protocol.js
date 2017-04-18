var collection;
(function (collection) {
    var protocol;
    (function (protocol) {
        var PhoneRecordName = (function () {
            function PhoneRecordName() {
            }
            PhoneRecordName.isPhoneAttach = function (attach) {
                return attach.indexOf("phone:") == 0;
            };
            PhoneRecordName.prototype.toName = function () {
                return this.ecId + "_" + this.numb + "_" + this.time;
            };
            return PhoneRecordName;
        })();
        protocol.PhoneRecordName = PhoneRecordName;
        (function (UseStatus) {
            UseStatus[UseStatus["inuse"] = 0] = "inuse";
            UseStatus[UseStatus["stop"] = 1] = "stop";
        })(protocol.UseStatus || (protocol.UseStatus = {}));
        var UseStatus = protocol.UseStatus;
        (function (EntrustedCaseType) {
            EntrustedCaseType[EntrustedCaseType["carLoan"] = 0] = "carLoan";
            EntrustedCaseType[EntrustedCaseType["creditLoan"] = 1] = "creditLoan";
            EntrustedCaseType[EntrustedCaseType["creditCard"] = 2] = "creditCard";
        })(protocol.EntrustedCaseType || (protocol.EntrustedCaseType = {}));
        var EntrustedCaseType = protocol.EntrustedCaseType;
        (function (MessageStatus) {
            MessageStatus[MessageStatus["unread"] = 0] = "unread";
            MessageStatus[MessageStatus["read"] = 1] = "read";
        })(protocol.MessageStatus || (protocol.MessageStatus = {}));
        var MessageStatus = protocol.MessageStatus;
        (function (CallStatus) {
            CallStatus[CallStatus["callin"] = 0] = "callin";
            CallStatus[CallStatus["callout"] = 1] = "callout";
        })(protocol.CallStatus || (protocol.CallStatus = {}));
        var CallStatus = protocol.CallStatus;
    })(protocol = collection.protocol || (collection.protocol = {}));
})(collection || (collection = {}));
