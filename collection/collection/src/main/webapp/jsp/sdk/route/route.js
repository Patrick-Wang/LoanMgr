var route;
(function (route) {
    route.nextId = (function (idBase) {
        return function () {
            return ++idBase;
        };
    })(9988392);
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
        Router.prototype.sendInternal = function (e) {
            var toEndpoint = this.mEndpoints[e.to];
            if (toEndpoint != undefined) {
                return toEndpoint.onEvent(e);
            }
            return Router.FAILED;
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
        Router.prototype.broadcast = function (evid, data) {
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
            this.mCurEvent = undefined;
            return Router.OK;
        };
        Router.prototype.send = function (evid, data) {
            if (this.mCurEvent != undefined) {
                this.mCurEvent.id = evid;
                this.mCurEvent.data = data;
                var event_2 = this.mCurEvent;
                this.mCurEvent = undefined;
                return this.sendInternal(event_2);
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
        return Router;
    })();
    route.Router = Router;
    route.router = new route.Router();
})(route || (route = {}));
