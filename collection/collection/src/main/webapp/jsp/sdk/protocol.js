var collection;
(function (collection) {
    var protocol;
    (function (protocol) {
        protocol.carLoanTitle = [];
        protocol.creditLoanTitle = [];
        protocol.creditCardTitle = [];
        function getTitles(type) {
            var titles = undefined;
            if (type == collection.protocol.EntrustedCaseType.carLoan) {
                titles = collection.protocol.carLoanTitle;
            }
            else if (type == collection.protocol.EntrustedCaseType.creditCard) {
                titles = collection.protocol.creditCardTitle;
            }
            else if (type == collection.protocol.EntrustedCaseType.creditLoan) {
                titles = collection.protocol.creditLoanTitle;
            }
            return titles;
        }
        protocol.getTitles = getTitles;
        function getPhoneNums(type, ec) {
            var nums = [];
            if (type == collection.protocol.EntrustedCaseType.carLoan) {
                $(collection.protocol.carLoanTitle).each(function (i, e) {
                    if (e == "客户手机" || (e.indexOf("联系人") >= 0 && (e.indexOf("手机") > 0 || e.indexOf("电话") > 0))) {
                        if (ec[parseInt(i) + 1]) {
                            nums.push(ec[parseInt(i) + 1]);
                        }
                    }
                });
            }
            else if (type == collection.protocol.EntrustedCaseType.creditCard) {
                $(collection.protocol.creditCardTitle).each(function (i, e) {
                    if (e == "手机" || (e.indexOf("联系人") >= 0 && (e.indexOf("手机") > 0 || e.indexOf("电话") > 0))) {
                        if (ec[parseInt(i) + 1]) {
                            nums.push(ec[parseInt(i) + 1]);
                        }
                    }
                });
            }
            else if (type == collection.protocol.EntrustedCaseType.creditLoan) {
                $(collection.protocol.creditLoanTitle).each(function (i, e) {
                    if (e == "手机号码" || (e.indexOf("联系人") >= 0 && (e.indexOf("手机") > 0 || e.indexOf("电话") > 0))) {
                        if (ec[parseInt(i) + 1]) {
                            nums.push(ec[parseInt(i) + 1]);
                        }
                    }
                });
            }
            return nums;
        }
        protocol.getPhoneNums = getPhoneNums;
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
        protocol.ROLE = ["none", "管理员", "内勤管理员", "业务管理员", "内勤", "业务员"];
        (function (RoleEN) {
            RoleEN[RoleEN["NONE"] = 0] = "NONE";
            RoleEN[RoleEN["ADMIN"] = 1] = "ADMIN";
            RoleEN[RoleEN["INSIDE_MGR"] = 2] = "INSIDE_MGR";
            RoleEN[RoleEN["OUTSIDE_MGR"] = 3] = "OUTSIDE_MGR";
            RoleEN[RoleEN["INSIDE"] = 4] = "INSIDE";
            RoleEN[RoleEN["OUTSIDE"] = 5] = "OUTSIDE";
        })(protocol.RoleEN || (protocol.RoleEN = {}));
        var RoleEN = protocol.RoleEN;
        (function (EntrustedCaseType) {
            EntrustedCaseType[EntrustedCaseType["carLoan"] = 0] = "carLoan";
            EntrustedCaseType[EntrustedCaseType["creditLoan"] = 1] = "creditLoan";
            EntrustedCaseType[EntrustedCaseType["creditCard"] = 2] = "creditCard";
        })(protocol.EntrustedCaseType || (protocol.EntrustedCaseType = {}));
        var EntrustedCaseType = protocol.EntrustedCaseType;
        (function (ECStatus) {
            ECStatus[ECStatus["unassign"] = 0] = "unassign";
            ECStatus[ECStatus["assign"] = 1] = "assign";
            ECStatus[ECStatus["complete"] = 2] = "complete";
        })(protocol.ECStatus || (protocol.ECStatus = {}));
        var ECStatus = protocol.ECStatus;
        (function (MessageStatus) {
            MessageStatus[MessageStatus["unread"] = 0] = "unread";
            MessageStatus[MessageStatus["read"] = 1] = "read";
        })(protocol.MessageStatus || (protocol.MessageStatus = {}));
        var MessageStatus = protocol.MessageStatus;
        (function (CallStatus) {
            CallStatus[CallStatus["callin"] = 0] = "callin";
            CallStatus[CallStatus["callout"] = 1] = "callout";
            CallStatus[CallStatus["missed"] = 2] = "missed";
            CallStatus[CallStatus["missedSkip"] = 3] = "missedSkip";
            CallStatus[CallStatus["missedNotifySkip"] = 4] = "missedNotifySkip";
        })(protocol.CallStatus || (protocol.CallStatus = {}));
        var CallStatus = protocol.CallStatus;
    })(protocol = collection.protocol || (collection.protocol = {}));
})(collection || (collection = {}));
