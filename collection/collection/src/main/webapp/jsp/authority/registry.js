///<reference path="../sdk/route/route.ts"/>
var authority;
(function (authority) {
    class MessageReceiver {
        constructor(addr, fn) {
            this.address = addr;
            this.FN = fn;
        }
        getAddr() {
            return this.address;
        }
        onEvent(e) {
            return this.FN(e);
        }
    }
    authority.MessageReceiver = MessageReceiver;
    function register(address, fn) {
        route.router.to(REG_ADDR).send(EvId.REGISTER, { addr: address, fn: fn });
    }
    authority.register = register;
    function call(address) {
        route.router.to(REG_ADDR).send(EvId.CALL, address);
    }
    authority.call = call;
    let REG_ADDR = "_auth_reg";
    var EvId;
    (function (EvId) {
        EvId[EvId["REGISTER"] = 0] = "REGISTER";
        EvId[EvId["CALL"] = 1] = "CALL"; // data : string  -- address
    })(EvId || (EvId = {}));
    class Registry {
        constructor() {
            this.reg = {};
            route.router.register(this);
        }
        getAddr() {
            return REG_ADDR;
        }
        onEvent(e) {
            switch (e.id) {
                case EvId.REGISTER:
                    let addrFn = e.data;
                    this.reg[addrFn.addr] = addrFn.fn;
                    break;
                case EvId.CALL:
                    let addr = e.data;
                    if (this.reg[addr] != undefined) {
                        this.reg[addr]();
                    }
                    break;
            }
        }
    }
    Registry.ins = new Registry();
})(authority || (authority = {}));
