var route;
(function (route) {
    route.nextId = (function (idBase) {
        return function () {
            return ++idBase;
        };
    })(9988392);
    class Router {
        constructor() {
            this.mEndpoints = {};
            this.mEplist = [];
        }
        register(endpoint) {
            let addr = endpoint.getAddr();
            this.mEndpoints[addr] = endpoint;
            this.mEplist.push(addr);
        }
        unregister(endpoint) {
            this.mEndpoints[endpoint.getAddr()] = undefined;
        }
        sendInternal(e) {
            let toEndpoint = this.mEndpoints[e.to];
            if (toEndpoint != undefined) {
                return toEndpoint.onEvent(e);
            }
            return Router.FAILED;
        }
        fromEp(from) {
            return this.from(from.getAddr());
        }
        toEp(to) {
            return this.to(to.getAddr());
        }
        from(from) {
            this.mCurEvent = {};
            this.mCurEvent.from = from;
            return this;
        }
        to(target) {
            if (this.mCurEvent == undefined) {
                this.mCurEvent = {};
            }
            this.mCurEvent.to = target;
            return this;
        }
        broadcast(evid, data) {
            for (let i = 0; i < this.mEplist.length; ++i) {
                let event = {
                    from: this.mCurEvent == undefined ? undefined : this.mCurEvent.from,
                    to: undefined,
                    id: evid,
                    data: data,
                    isBroadcast: true
                };
                this.mEndpoints[this.mEplist[i]].onEvent(event);
            }
            this.mCurEvent = undefined;
            return Router.OK;
        }
        send(evid, data) {
            if (this.mCurEvent != undefined) {
                this.mCurEvent.id = evid;
                this.mCurEvent.data = data;
                let event = this.mCurEvent;
                this.mCurEvent = undefined;
                return this.sendInternal(event);
            }
            return Router.FAILED;
        }
        redirect(to, event) {
            if (to != undefined) {
                if (event.road == undefined) {
                    event.road = [];
                }
                event.road.push(event.to);
                event.to = to;
                return this.sendInternal(event);
            }
            return Router.FAILED;
        }
        getEndpoint(addr) {
            return this.mEndpoints[addr];
        }
    }
    Router.OK = "Route.OK";
    Router.FAILED = "Route.FAILED";
    route.Router = Router;
    route.router = new route.Router();
})(route || (route = {}));
