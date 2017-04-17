///<reference path="sdk/message.ts"/>
module navbar{
    import Message = collection.Message;
    import Net = collection.Net;
    import UnreadMessage = collection.protocol.UnreadMessage;
    export class NavBar{
        static ins = new NavBar();

        constructor(){

        }

        static openMessageTips(){
            Message.getEntrustedCases()
                .done((mecs : UnreadMessage[])=>{
                    NavBar.ins.onLoadMEC(mecs);
                });

            $("#queryAllMsgs").click(()=>{
                NavBar.ins.onClickQueryAllMessage();
            });
        }

        onClickQueryAllMessage(){

        }


        getDateFromTime(time:string){
            let dt:Date = new Date(Date.parse(time));
            let now:Date = new Date(Date.now());
            if (dt.getFullYear() == now.getFullYear() &&
                dt.getMonth() == now.getMonth()){
                if (dt.getDate() == now.getDate()){
                    return "今天";
                }
                now = new Date(now.getTime() - 24 * 60 * 3600);
                if (dt.getDate() == now.getDate()){
                    return "昨天";
                }

                now = new Date(now.getTime() - 24 * 60 * 3600);
                if (dt.getDate() == now.getDate()){
                    return "前天天";
                }
            }
            return time;
        }

        clickMessage(msgId:number){
            alert(msgId);
            return false;
        }

        buildMessageDetail(detailli : any, um : UnreadMessage){
            let detail = detailli.after(
                "<li> " +
                    "<a onclick='navbar.NavBar.ins.clickMessage(" + um.msgId + ")' href='#'>" +
                    '<img src="' + Net.BASE_URL + '/jsp/assets/img/avatars/bing.png" class="message-avatar" alt="Microsoft Bing">' +
                    '<div class="message">'+
                        '<span class="message-sender">' +
                            um.fromName +
                        '</span>' +
                        '<span class="message-time">'+
                            this.getDateFromTime(um.sendTime) +
                         '</span>'+
                        '<span class="message-subject">'+
                            um.title +
                         '</span>'+
                        '<span class="message-body">'+
                            um.content +
                        '</span>'+
                    '</div>' +
                    "</a>" +
                 "</li>");
        }

        onLoadMEC(ums : UnreadMessage[]):void{
            $("#msgCount").text(ums.length);
            $("#msgCountDetail").text(ums.length + "消息待处理");
            for(let i = 0; i < ums.length; ++i){
                this.buildMessageDetail($("#msgCountDetail"), ums[i]);
            }
        }
    }
}