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
    }());
    collection.Phone = Phone;
    var ActiveXPhone = (function () {
        function ActiveXPhone() {
            this.inited = false;
            this.activeXCode = new Date().getTime() + "";
        }
        ActiveXPhone.prototype.init = function () {
            var _this = this;
            if (this.inited) {
                return;
            }
            this.inited = true;
            var obj = document.getElementById("softPhone");
            window["__onHaveCall"] = function (num, fileName, tag) {
                if (_this.activeXCode == tag) {
                    _this.fileName = fileName;
                    _this.disConnected = _this.onCall(num);
                }
            };
            window["__onHangUp"] = function (code, tag) {
                if (_this.activeXCode == tag) {
                    if (_this.disConnected) {
                        if (code == 0) {
                            _this.disConnected(_this.fileName);
                        }
                        else {
                            _this.disConnected();
                        }
                        _this.disConnected = undefined;
                    }
                }
            };
            try {
                obj.RegIncomingCallJs(window, "__onHaveCall");
                obj.RegHangupJs(window, "__onHangUp");
                this.activeX = obj;
            }
            catch (e) {
                console.log(e);
            }
        };
        ActiveXPhone.prototype.isAvailable = function () {
            this.init();
            return this.activeX != undefined;
        };
        ActiveXPhone.prototype.start = function (onCall) {
            this.init();
            this.onCall = onCall;
            if (this.activeX && this.activeX.Init(context.sipServerIP, context.userName, this.activeXCode)) {
                this.onCall = onCall;
                return true;
            }
            return false;
        };
        ActiveXPhone.prototype.pickUp = function (onDisconnected) {
            this.init();
            this.disConnected = onDisconnected;
            return this.activeX && this.activeX.PickUp();
        };
        ActiveXPhone.prototype.ringUp = function (num, fileName, onDisconnected) {
            this.init();
            this.disConnected = onDisconnected;
            this.fileName = fileName;
            return this.activeX && this.activeX.CallOut(num, fileName);
        };
        ActiveXPhone.prototype.hangUp = function () {
            this.init();
            return this.activeX && this.activeX.HangUp();
        };
        return ActiveXPhone;
    }());
    collection.ActiveXPhone = ActiveXPhone;
    collection.phone = new ActiveXPhone();
})(collection || (collection = {}));
