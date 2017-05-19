var route;
(function (route) {
    function UUID() {
        var d = new Date().getTime();
        var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            var r = (d + Math.random() * 16) % 16 | 0;
            d = Math.floor(d / 16);
            return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
        });
        return uuid;
    }
    route.UUID = UUID;
    ;
    route.nextId = (function (idBase) {
        return function () {
            return ++idBase;
        };
    })(9988392);
    var MSG = (function () {
        function MSG() {
        }
        MSG.PAGE_REFRESH = route.nextId();
        MSG.NAV_REFRESH = route.nextId();
        MSG.CONSOLE_ASSIGNER_UNRESPMSGS = route.nextId();
        MSG.CONSOLE_OWNER_UNREADMSGS = route.nextId();
        MSG.CONSOLE_IS_MANAGER = route.nextId();
        MSG.LOANMGR_GET_QOPT = route.nextId();
        MSG.LOANMGR_GET_TYPE = route.nextId();
        MSG.LOANMGR_GET_SELECTED = route.nextId();
        MSG.EC_SELECT_REQUEST = route.nextId();
        MSG.EC_SELECT_RESPONSE = route.nextId();
        MSG.EC_DETAIL_ECINFO = route.nextId();
        MSG.EC_DETAIL_REFRESH = route.nextId();
        return MSG;
    })();
    route.MSG = MSG;
    var Receiver = (function () {
        function Receiver(addr, fn) {
            this.address = addr;
            this.FN = fn;
        }
        Receiver.prototype.getAddr = function () {
            return this.address;
        };
        Receiver.prototype.onEvent = function (e) {
            return this.FN(e);
        };
        return Receiver;
    })();
    route.Receiver = Receiver;
    var AnonymousReceiver = (function () {
        function AnonymousReceiver(fn) {
            this.receiverStub = new Receiver(route.nextId() + "", fn);
        }
        AnonymousReceiver.prototype.getAddr = function () {
            return this.receiverStub.getAddr();
        };
        AnonymousReceiver.prototype.onEvent = function (e) {
            return this.receiverStub.onEvent(e);
        };
        return AnonymousReceiver;
    })();
    route.AnonymousReceiver = AnonymousReceiver;
    route.DELAY_READY = -1;
    var Router = (function () {
        function Router() {
            this.mEndpoints = {};
            this.mEplist = [];
        }
        Router.prototype.register = function (endpoint) {
            var addr = endpoint.getAddr();
            this.mEndpoints[addr] = endpoint;
            this.mEplist.push(addr);
        };
        Router.prototype.unregister = function (endpoint) {
            this.mEndpoints[endpoint.getAddr()] = undefined;
        };
        Router.prototype.sendInternal = function (e, delay) {
            var toEndpoint = this.mEndpoints[e.to];
            var result = Router.FAILED;
            if (toEndpoint == undefined) {
                result = Router.UNKNOWNADDR;
            }
            else {
                if (undefined == delay) {
                    result = toEndpoint.onEvent(e);
                }
                else {
                    if (route.DELAY_READY == delay) {
                        $(document).ready(function () {
                            toEndpoint.onEvent(e);
                        });
                    }
                    else {
                        setTimeout(function () {
                            toEndpoint.onEvent(e);
                        }, delay);
                    }
                    result = Router.OK;
                }
            }
            return result;
        };
        Router.prototype.fromEp = function (from) {
            return this.from(from.getAddr());
        };
        Router.prototype.toEp = function (to) {
            return this.to(to.getAddr());
        };
        Router.prototype.from = function (from) {
            this.mCurEvent = {};
            this.mCurEvent.from = from;
            return this;
        };
        Router.prototype.to = function (target) {
            if (this.mCurEvent == undefined) {
                this.mCurEvent = {};
            }
            this.mCurEvent.to = target;
            return this;
        };
        Router.prototype.broadcast = function (evid, data, delay) {
            var _this = this;
            if (undefined == delay) {
                for (var i = 0; i < this.mEplist.length; ++i) {
                    var event_1 = {
                        from: this.mCurEvent == undefined ? undefined : this.mCurEvent.from,
                        to: undefined,
                        id: evid,
                        data: data,
                        isBroadcast: true
                    };
                    this.mEndpoints[this.mEplist[i]].onEvent(event_1);
                }
            }
            else {
                var from = this.mCurEvent == undefined ? undefined : this.mCurEvent.from;
                if (route.DELAY_READY == delay) {
                    $(document).ready(function () {
                        for (var i = 0; i < _this.mEplist.length; ++i) {
                            var event_2 = {
                                from: from,
                                to: undefined,
                                id: evid,
                                data: data,
                                isBroadcast: true
                            };
                            _this.mEndpoints[_this.mEplist[i]].onEvent(event_2);
                        }
                    });
                }
                else {
                    setTimeout(function () {
                        for (var i = 0; i < _this.mEplist.length; ++i) {
                            var event_3 = {
                                from: from,
                                to: undefined,
                                id: evid,
                                data: data,
                                isBroadcast: true
                            };
                            _this.mEndpoints[_this.mEplist[i]].onEvent(event_3);
                        }
                    }, delay);
                }
            }
            this.mCurEvent = undefined;
            return Router.OK;
        };
        Router.prototype.send = function (evid, data, delay) {
            if (this.mCurEvent != undefined) {
                this.mCurEvent.id = evid;
                this.mCurEvent.data = data;
                var event_4 = this.mCurEvent;
                this.mCurEvent = undefined;
                return this.sendInternal(event_4, delay);
            }
            return Router.FAILED;
        };
        Router.prototype.redirect = function (to, event) {
            if (to != undefined) {
                if (event.road == undefined) {
                    event.road = [];
                }
                event.road.push(event.to);
                event.to = to;
                return this.sendInternal(event);
            }
            return Router.FAILED;
        };
        Router.prototype.getEndpoint = function (addr) {
            return this.mEndpoints[addr];
        };
        Router.OK = "Route.OK";
        Router.FAILED = "Route.FAILED";
        Router.UNKNOWNADDR = "Route.UNKNOWNADDR";
        return Router;
    })();
    route.Router = Router;
    route.router = new route.Router();
})(route || (route = {}));
