///<reference path="../sdk/route/route.ts"/>
var authority;
(function (authority) {
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
        return Registry;
    })();
})(authority || (authority = {}));
