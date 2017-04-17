module route {

    export interface Event {
        id:number;
        from:string;
        to:string;
        road?:string[];
        data:any;
        isBroadcast?:boolean;
    }

    export let nextId : ()=>number = (function(idBase:number){
        return function(){
            return ++idBase;
        };
    })(9988392);


    export interface Endpoint {
        getAddr():string;
        onEvent(e:Event):any;
    }

    export class Router {
        static OK:string = "Route.OK";
        static FAILED:string = "Route.FAILED";

        private mEndpoints:any = {};
        private mEplist:string[] = [];
        private mCurEvent:Event;

        register(endpoint:Endpoint)  {
            let addr:string = endpoint.getAddr();
            this.mEndpoints[addr] = endpoint;
            this.mEplist.push(addr);
        }

        unregister(endpoint:Endpoint) {
            this.mEndpoints[endpoint.getAddr()] = undefined;
        }

        private sendInternal(e:Event):any {
            let toEndpoint = this.mEndpoints[e.to];
            if (toEndpoint != undefined) {
                return toEndpoint.onEvent(e);
            }
            return Router.FAILED;
        }

        public fromEp(from:Endpoint):Router {
            return this.from(from.getAddr());
        }

        public toEp(to:Endpoint):Router{
            return this.to(to.getAddr());
        }

        public from(from:string):Router {
            this.mCurEvent = <Event>{};
            this.mCurEvent.from = from;
            return this;
        }

        public to(target:string):Router {
            if (this.mCurEvent == undefined) {
                this.mCurEvent = <Event>{};
            }
            this.mCurEvent.to = target;
            return this;
        }

        public broadcast(evid:number, data?:any):any {
            for (let i = 0; i < this.mEplist.length; ++i) {
                let event = {
                    from: this.mCurEvent == undefined ? undefined : this.mCurEvent.from,
                    to: undefined,
                    id: evid,
                    data: data,
                    isBroadcast:true
                }
                this.mEndpoints[this.mEplist[i]].onEvent(event);
            }
            this.mCurEvent = undefined;
            return Router.OK;
        }

        public send(evid:number, data?:any):any {
            if (this.mCurEvent != undefined) {
                this.mCurEvent.id = evid;
                this.mCurEvent.data = data;
                let event = this.mCurEvent;
                this.mCurEvent = undefined;
                return this.sendInternal(event);
            }
            return Router.FAILED;
        }

        public redirect(to:string, event:Event):any {
            if (to != undefined) {
                if (event.road == undefined){
                    event.road = [];
                }
                event.road.push(event.to);
                event.to = to;
                return this.sendInternal(event);
            }
            return Router.FAILED;
        }

        private getEndpoint(addr:string):Endpoint {
            return this.mEndpoints[addr];
        }
    }
    export let router:route.Router = new route.Router();
}
