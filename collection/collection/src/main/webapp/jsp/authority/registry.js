///<reference path="../sdk/route/route.ts"/>
var authority;
(function (authority) {
    var MessageReceiver = (function () {
        function MessageReceiver(addr, fn) {
            this.address = addr;
            this.FN = fn;
        }
        MessageReceiver.prototype.getAddr = function () {
            return this.address;
        };
        MessageReceiver.prototype.onEvent = function (e) {
            return this.FN(e);
        };
        return MessageReceiver;
    })();
    authority.MessageReceiver = MessageReceiver;
    function register(address, fn) {
        route.router.to(REG_ADDR).send(EvId.REGISTER, { addr: address, fn: fn });
    }
    authority.register = register;
    function call(address) {
        route.router.to(REG_ADDR).send(EvId.CALL, address);
    }
    authority.call = call;
    var REG_ADDR = "_auth_reg";
    var EvId;
    (function (EvId) {
        EvId[EvId["REGISTER"] = 0] = "REGISTER";
        EvId[EvId["CALL"] = 1] = "CALL"; // data : string  -- address
    })(EvId || (EvId = {}));
    var Registry = (function () {
        function Registry() {
            this.reg = {};
            route.router.register(this);
        }
        Registry.prototype.getAddr = function () {
            return REG_ADDR;
        };
        Registry.prototype.onEvent = function (e) {
            switch (e.id) {
                case EvId.REGISTER:
                    var addrFn = e.data;
                    this.reg[addrFn.addr] = addrFn.fn;
                    break;
                case EvId.CALL:
                    var addr = e.data;
                    if (this.reg[addr] != undefined) {
                        this.reg[addr]();
                    }
                    break;
            }
        };
        Registry.ins = new Registry();
        return Registry;
    })();
})(authority || (authority = {}));
