module route {

    export interface Event {
        id:number;
        from:string;
        to:string;
        road?:string[];
        data?:any;
        isBroadcast?:boolean;
    }

    export let nextId : ()=>number = (function(idBase:number){
        return function(){
            return ++idBase;
        };
    })(9988392);


    export class MSG{
        static PAGE_REFRESH:number = nextId();
        static NAV_REFRESH:number = nextId();
        static CONSOLE_ASSIGNER_UNRESPMSGS:number = route.nextId();
        static CONSOLE_OWNER_UNREADMSGS:number = route.nextId();
        static LOANMGR_GET_QOPT:number = route.nextId();
        static LOANMGR_GET_TYPE:number = route.nextId();
        static EC_SELECT_REQUEST:number = route.nextId();
        static EC_SELECT_RESPONSE:number = route.nextId();
        static EC_DETAIL_ECINFO:number = route.nextId();
    }

    export interface Endpoint {
        getAddr():string;
        onEvent(e:Event):any;
    }

    export class Receiver implements Endpoint{
        address:string;
        FN:(e:route.Event)=>any;
        constructor(addr:string, fn:(e:route.Event)=>any){
            this.address = addr;
            this.FN = fn;
        }
        getAddr():string {
            return this.address;
        }
        onEvent(e:route.Event):any {
            return this.FN(e);
        }
    }

    export class AnonymousReceiver implements Endpoint{
        receiverStub : Receiver;
        constructor(fn:(e:route.Event)=>any){
            this.receiverStub = new Receiver(nextId() + "", fn);
        }
        getAddr():string {
            return this.receiverStub.getAddr();
        }
        onEvent(e:route.Event):any {
            return this.receiverStub.onEvent(e);
        }
    }


    export let DELAY_READY : number = -1;

    export class Router {
        static OK:string = "Route.OK";
        static FAILED:string = "Route.FAILED";
        static UNKNOWNADDR:string = "Route.UNKNOWNADDR";


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

        private sendInternal(e:Event, delay?:number):any {
            let toEndpoint = this.mEndpoints[e.to];
            let result = Router.FAILED;
            if (toEndpoint == undefined) {
                result = Router.UNKNOWNADDR;
            }else{
                if (undefined == delay){
                    result = toEndpoint.onEvent(e);
                }else{
                    if (DELAY_READY == delay){
                        $(document).ready(()=>{
                            toEndpoint.onEvent(e);
                        });
                    }else {
                        setTimeout(()=> {
                            toEndpoint.onEvent(e);
                        }, delay);
                    }
                    result = Router.OK;
                }
            }
            return result;
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

        public broadcast(evid:number, data?:any, delay?:number):any {


            if (undefined == delay){
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
            }else{
                let from = this.mCurEvent == undefined ? undefined : this.mCurEvent.from;
                if (DELAY_READY == delay){
                    $(document).ready(()=>{
                        for (let i = 0; i < this.mEplist.length; ++i) {
                            let event = {
                                from: from,
                                to: undefined,
                                id: evid,
                                data: data,
                                isBroadcast:true
                            }
                            this.mEndpoints[this.mEplist[i]].onEvent(event);
                        }
                    });
                }else{
                    setTimeout(()=>{
                        for (let i = 0; i < this.mEplist.length; ++i) {
                            let event = {
                                from: from,
                                to: undefined,
                                id: evid,
                                data: data,
                                isBroadcast:true
                            }
                            this.mEndpoints[this.mEplist[i]].onEvent(event);
                        }
                    }, delay);
                }
            }
            this.mCurEvent = undefined;
            return Router.OK;
        }

        public send(evid:number, data?:any, delay?:number):any {
            if (this.mCurEvent != undefined) {
                this.mCurEvent.id = evid;
                this.mCurEvent.data = data;
                let event = this.mCurEvent;
                this.mCurEvent = undefined;
                return this.sendInternal(event, delay);
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
