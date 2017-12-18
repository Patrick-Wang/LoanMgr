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
        function getPhone(ec, index) {
            if (index >= 0) {
                return ec[1 + index];
            }
        }
        function getCommonPhone(lxr, titles, clientName, ec, nums) {
            var name = getPhone(ec, titles.indexOf(lxr + '姓名'));
            var num = getPhone(ec, titles.indexOf(lxr + '家庭电话'));
            if (num && name) {
                nums.push(lxr + " " + name + " 家庭电话:" + num);
            }
            num = getPhone(ec, titles.indexOf(lxr + '单位电话'));
            if (num && name) {
                nums.push(lxr + " " + name + " 单位电话:" + num);
            }
            num = getPhone(ec, titles.indexOf(lxr + '手机'));
            if (num && name) {
                nums.push(lxr + " " + name + " 手机:" + num);
            }
        }
        function getCommonNums(titles, clientName, ec, nums) {
            getCommonPhone("联系人1", titles, clientName, ec, nums);
            getCommonPhone("联系人2", titles, clientName, ec, nums);
            getCommonPhone("联系人3", titles, clientName, ec, nums);
            getCommonPhone("联系人4", titles, clientName, ec, nums);
            getCommonPhone("联系人5", titles, clientName, ec, nums);
            getCommonPhone("联系人6", titles, clientName, ec, nums);
            getCommonPhone("联系人7", titles, clientName, ec, nums);
            getCommonPhone("联系人8", titles, clientName, ec, nums);
            getCommonPhone("联系人9", titles, clientName, ec, nums);
            getCommonPhone("联系人10", titles, clientName, ec, nums);
        }
        function getCarloanPhone(ec) {
            var clientName = getPhone(ec, collection.protocol.carLoanTitle.indexOf('客户姓名'));
            var nums = [];
            var num = getPhone(ec, collection.protocol.carLoanTitle.indexOf('客户手机'));
            if (num) {
                nums.push(clientName + " 手机:" + num);
            }
            num = getPhone(ec, collection.protocol.carLoanTitle.indexOf('客户宅电'));
            if (num) {
                nums.push(clientName + " 宅电:" + num);
            }
            num = getPhone(ec, collection.protocol.carLoanTitle.indexOf('客户公司电话'));
            if (num) {
                nums.push(clientName + " 公司电话:" + num);
            }
            num = getPhone(ec, collection.protocol.carLoanTitle.indexOf('配偶手机'));
            if (num) {
                nums.push(clientName + " 配偶手机:" + num);
            }
            num = getPhone(ec, collection.protocol.carLoanTitle.indexOf('配偶公司电话'));
            if (num) {
                nums.push(clientName + " 配偶公司电话:" + num);
            }
            num = getPhone(ec, collection.protocol.carLoanTitle.indexOf('担保人手机'));
            if (num) {
                nums.push(clientName + " 担保人手机:" + num);
            }
            num = getPhone(ec, collection.protocol.carLoanTitle.indexOf('担保人公司电话'));
            if (num) {
                nums.push(clientName + " 担保人公司电话:" + num);
            }
            getCommonNums(collection.protocol.carLoanTitle, clientName, ec, nums);
            return nums;
        }
        function getCreditLoanPhone(ec) {
            var clientName = getPhone(ec, collection.protocol.creditLoanTitle.indexOf('客户姓名'));
            var nums = [];
            var num = getPhone(ec, collection.protocol.creditLoanTitle.indexOf('户籍电话'));
            if (num) {
                nums.push(clientName + " 户籍电话:" + num);
            }
            num = getPhone(ec, collection.protocol.creditLoanTitle.indexOf('手机号码'));
            if (num) {
                nums.push(clientName + " 手机:" + num);
            }
            num = getPhone(ec, collection.protocol.creditLoanTitle.indexOf('住宅电话'));
            if (num) {
                nums.push(clientName + " 住宅电话:" + num);
            }
            num = getPhone(ec, collection.protocol.creditLoanTitle.indexOf('公司电话'));
            if (num) {
                nums.push(clientName + " 公司电话:" + num);
            }
            getCommonNums(collection.protocol.creditLoanTitle, clientName, ec, nums);
            return nums;
        }
        function getCreditCardPhone(ec) {
            var clientName = getPhone(ec, collection.protocol.creditCardTitle.indexOf('姓名'));
            var nums = [];
            var num = getPhone(ec, collection.protocol.creditCardTitle.indexOf('手机'));
            if (num) {
                nums.push(clientName + " 手机:" + num);
            }
            num = getPhone(ec, collection.protocol.creditCardTitle.indexOf('家庭号码'));
            if (num) {
                nums.push(clientName + " 家庭号码:" + num);
            }
            num = getPhone(ec, collection.protocol.creditCardTitle.indexOf('单位号码'));
            if (num) {
                nums.push(clientName + " 单位号码:" + num);
            }
            getCommonNums(collection.protocol.creditCardTitle, clientName, ec, nums);
            return nums;
        }
        function getPhoneNums(type, ec) {
            var nums = [];
            if (type == collection.protocol.EntrustedCaseType.carLoan) {
                nums = getCarloanPhone(ec);
            }
            else if (type == collection.protocol.EntrustedCaseType.creditCard) {
                nums = getCreditCardPhone(ec);
            }
            else if (type == collection.protocol.EntrustedCaseType.creditLoan) {
                nums = getCreditLoanPhone(ec);
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
