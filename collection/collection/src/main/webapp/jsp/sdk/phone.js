///<reference path="protocol.ts"/>
///<reference path="net.ts"/>
var collection;
(function (collection) {
    var Phone = (function () {
        function Phone() {
        }
        Phone.getRecords = function (local) {
            if (local === void 0) { local = true; }
            if (local) {
                return collection.Net.postLocal(collection.Net.BASE_URL + "/phone/records.do");
            }
            return collection.Net.post(collection.Net.BASE_URL + "/phone/records.do");
        };
        Phone.updateStatus = function (recId, newStatus) {
            return collection.Net.post(collection.Net.BASE_URL + "/phone/update_status.do", {
                record: recId,
                status: newStatus
            });
        };
        return Phone;
    })();
    collection.Phone = Phone;
    var ActiveXPhone = (function () {
        function ActiveXPhone() {
            var _this = this;
            $(document).ready(function () {
                var obj = document.getElementById("softPhone");
                window["__onHaveCall"] = function (num, fileName) {
                    _this.fileName = fileName;
                    _this.disConnected = _this.onCall(num);
                };
                window["__onHangUp"] = function () {
                    if (_this.disConnected) {
                        _this.disConnected(_this.fileName);
                        _this.disConnected = undefined;
                    }
                };
                try {
                    obj.RegIncomingCallJs(window, "__onHaveCall");
                    obj.RegHangupJs(window, "__onHangUp");
                    _this.activeX = obj;
                }
                catch (e) {
                    console.log(e);
                }
            });
        }
        ActiveXPhone.prototype.isAvailable = function () {
            return true; //this.activeX != undefined;
        };
        ActiveXPhone.prototype.start = function (onCall) {
            this.onCall = onCall;
            if (this.activeX && this.activeX.Init(context.sipServerIP)) {
                this.onCall = onCall;
                return true;
            }
            return false;
        };
        ActiveXPhone.prototype.pickUp = function (onDisconnected) {
            this.disConnected = onDisconnected;
            return this.activeX && this.activeX.PickUp();
        };
        ActiveXPhone.prototype.ringUp = function (num, fileName, onDisconnected) {
            this.disConnected = onDisconnected;
            this.fileName = fileName;
            return this.activeX && this.activeX.CallOut(num, fileName);
        };
        ActiveXPhone.prototype.hangUp = function () {
            return this.activeX && this.activeX.HangUp();
        };
        return ActiveXPhone;
    })();
    collection.ActiveXPhone = ActiveXPhone;
    collection.phone = new ActiveXPhone();
})(collection || (collection = {}));
