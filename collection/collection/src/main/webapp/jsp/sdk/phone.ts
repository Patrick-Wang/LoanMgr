///<reference path="protocol.ts"/>
///<reference path="net.ts"/>
module collection {
    import Promise = collection.protocol.Promise;
    import PhoneRecord = collection.protocol.PhoneRecord;

    export class Phone {
        static getRecords(local:boolean = true):Promise<PhoneRecord[]> {
            if (local) {
                return Net.postLocal(Net.BASE_URL + "/phone/records.do");
            }
            return Net.post(Net.BASE_URL + "/phone/records.do");
        }

        static updateStatus(recId:number, newStatus:number):Promise<collection.protocol.Result> {
            return Net.post(Net.BASE_URL + "/phone/update_status.do", {
                record: recId,
                status: newStatus
            });
        }
    }


    interface ActiveX {
        Init(ip:string):boolean;
        CallOut(num:string, fileName:string):boolean;
        PickUp():boolean;
        HangUp():boolean;
        RegIncomingCallJs(wnd:any, callBackName:string):void;
        RegHangupJs(wnd:any, callBackName:string):void;
    }

    export class ActiveXPhone {
        activeX:ActiveX;
        disConnected:(fileName:string)=>void;
        onCall:(num:string)=>void;
        fileName:string;

        constructor() {
            $(document).ready(()=> {
                let obj:any = document.getElementById("softPhone");
                window["__onHaveCall"] = (num:string, fileName:string)=> {
                    this.fileName = fileName;
                    this.onCall(num);
                };
                window["__onHangUp"] = ()=> {
                    if (this.disConnected) {
                        this.disConnected(this.fileName);
                        this.disConnected = undefined;
                    }
                };
                try{
                    obj.RegIncomingCallJs(window, "__onHaveCall");
                    obj.RegHangupJs(window, "__onHangUp");
                    this.activeX = obj;
                }catch(e){
                    console.log(e);
                }
            });
        }

        isAvailable():boolean {
            return true;//this.activeX != undefined;
        }

        start(onCall:(num:string)=>void):boolean {
            if (this.activeX && this.activeX.Init(context.sipServerIP)) {
                this.onCall = onCall;
                return true;
            }
            return false;
        }

        pickUp(onDisconnected:(fileName:string)=>void):boolean {
            this.disConnected = onDisconnected;
            return this.activeX && this.activeX.PickUp();
        }

        ringUp(num:string, fileName:string, onDisconnected:(fileName:string)=>void):boolean {
            this.disConnected = onDisconnected;
            this.fileName = fileName;
            return this.activeX && this.activeX.CallOut(num, fileName);
        }
        ;

        hangUp():boolean {
            return this.activeX && this.activeX.HangUp();
        }
    }

    export let phone:ActiveXPhone = new ActiveXPhone();
}
