///<reference path="protocol.ts"/>
///<reference path="net.ts"/>
module collection{
    import Promise = collection.protocol.Promise;
    import PhoneRecord = collection.protocol.PhoneRecord;

    export class Phone{
        static getRecords(local:boolean = true):Promise<PhoneRecord[]>{
            if (local) {
                return Net.postLocal(Net.BASE_URL + "/phone/records.do");
            }
            return Net.post(Net.BASE_URL + "/phone/records.do");
        }

        static updateStatus(recId:number, newStatus:number):Promise<collection.protocol.Result>{
            return Net.post(Net.BASE_URL + "/phone/update_status.do", {
                record:recId,
                status:newStatus
            });
        }
    }


    interface ActiveX{
        init(ip:string):boolean;
        callOut(num:string, fileName:string):boolean;
        pickUp():boolean;
        hangUp():boolean;
        onHaveCall:(num:string, fileName:string)=>void;
        onHangUp:()=>void;
    }

    export class ActiveXPhone{

        activeX:ActiveX;
        disConnected:(fileName:string)=>void;
        onCall : (num:string)=>void;
        fileName:string;
        constructor(){
            try {
                this.activeX = new ActiveXObject("phone");
            }
            catch (e) {
                console.log(e);
            }
        }

        isAvailable():boolean{
            return true;//this.activeX != undefined;
        }

        start(onCall : (num:string)=>void):boolean{
            if (this.activeX.init(context.sipServerIP)){
                this.onCall = onCall;

                this.activeX.onHaveCall = (num:string, fileName:string)=>{
                    this.fileName = fileName;
                    this.onCall(num);
                };

                this.activeX.onHangUp = ()=>{
                    if (this.disConnected){
                        this.disConnected(this.fileName);
                        this.disConnected = undefined;
                    }
                }
                return true;
            }
            return false;
        }

        pickUp(onDisconnected:(fileName:string)=>void):boolean{
            this.disConnected = onDisconnected;
            return this.activeX.pickUp();
        }

        ringUp(num:string, fileName:string, onDisconnected:(fileName:string)=>void):boolean{
            this.disConnected = onDisconnected;
            this.fileName = fileName;
            return this.activeX.callOut(num, fileName);
        };

        hangUp():boolean{
            return this.activeX.hangUp();
        }
    }

    export let phone:ActiveXPhone = new ActiveXPhone();
}
