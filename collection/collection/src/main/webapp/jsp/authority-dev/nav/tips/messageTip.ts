///<reference path="../../../navbar.ts"/>
module navbar{
    declare var buildMessageDetail;
    import UnreadMessage = collection.protocol.UnreadMessage;
    export class MsgTip{
        static ins = new MsgTip();
        constructor(){
            $("#queryAllMsgs").click(()=>{
                this.onClickQueryAllMessage();
                return false;
            });
        }

        static updateTips(){
            collection.Message.getUnreadMessages()
                .done((mecs : UnreadMessage[])=>{
                    MsgTip.ins.onLoadMEC(mecs);
                });
        }


        onClickQueryAllMessage(){

        }

        clickMessage(msgId:number){
            alert(msgId);
            return false;
        }

        onLoadMEC(ums : UnreadMessage[]):void{
            $("#msgCount").text(ums.length);
            $("#msgCountDetail").text(ums.length + "条待处理消息");
            $("#navMsgTmp").remove();
            for(let i = 0; i < ums.length; ++i){
                $("#msgCountDetail").after(buildMessageDetail(ums[i]));
            }
        }
    }
}