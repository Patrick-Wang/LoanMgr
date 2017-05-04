///<reference path="../sdk/route/route.ts"/>
declare var ReactDOMServer:any;
declare var React:any;
declare var $:any;
module authority{

    import Endpoint = route.Endpoint;

    export function register(address:string, fn:()=>void):void{
        route.router.to(REG_ADDR).send(EvId.REGISTER, {addr : address, fn: fn});
    }

    export function call(address:string):void{
        route.router.to(REG_ADDR).send(EvId.CALL, address);
    }

    export function ping(address:string):boolean{
        return route.router.to(REG_ADDR).send(EvId.PING, address);
    }

    let REG_ADDR : string = "_auth_reg";

    interface AuthFn{
        addr:string;
        fn:()=>void;
    }

    enum EvId{
        REGISTER, // data : AuthFn
        CALL,
        PING// data : string  -- address
    }

    class Registry implements route.Endpoint{

        static ins = new Registry();
        constructor(){
            route.router.register(this);
        }

        private reg : any = {};

        getAddr():string {
            return REG_ADDR;
        }

        onEvent(e:route.Event):any {
            switch (e.id){
                case EvId.REGISTER:
                    let addrFn : AuthFn = <AuthFn>e.data;
                    this.reg[addrFn.addr] = addrFn.fn;
                    break;
                case EvId.CALL:
                    let addr :string = e.data;
                    if (this.reg[addr] != undefined){
                        this.reg[addr]();
                    }
                    break;
                case EvId.PING:
                    return this.reg[e.data] != undefined;
            }
        }
    }

}