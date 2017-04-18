///<reference path="sdk/message.ts"/>
///<reference path="sdk/phone.ts"/>
///<reference path="sdk/route/route.ts"/>
module navbar{
    import Message = collection.Message;
    import Net = collection.Net;
    import UnreadMessage = collection.protocol.UnreadMessage;
    import Phone = collection.Phone;
    import PhoneRecord = collection.protocol.PhoneRecord;
    import CallStatus = collection.protocol.CallStatus;
    export var ON_REFRESH:number = route.nextId();
    export class NavBar{

        static ins = new NavBar();
        constructor(){
            route.router.broadcast(navbar.ON_REFRESH);
        }

        static openMessageTips(){

            NavBar.ins.triggerRefreshMessageTips();
            $("#queryAllMsgs").click(()=>{
                NavBar.ins.onClickQueryAllMessage();
                return false;
            });
        }

        static openCallTips(){
            NavBar.ins.triggerRefreshCallCenterTips();
            $("#navCallCenter").click(()=>{
                NavBar.ins.onClicCallCenter();
                return false;
            });
        }

        triggerRefreshMessageTips():void{
            Message.getUnreadMessages()
                .done((mecs : UnreadMessage[])=>{
                    NavBar.ins.onLoadMEC(mecs);
                });
        }

        triggerRefreshCallCenterTips():void{
            Phone.getRecords().done((prs : PhoneRecord[])=>{
                NavBar.ins.onLoadCallInfos(prs);
            });
        }

        onClickQueryAllMessage(){

        }

        onClicCallCenter(){

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
            $("#msgCountDetail").text(ums.length + "条待处理消息");
            for(let i = 0; i < ums.length; ++i){
                this.buildMessageDetail($("#msgCountDetail"), ums[i]);
            }
        }


        buildCallCenter(detailli:any, pr:PhoneRecord){
            let detail = detailli.before(
            '<li>'+
                '<a href="#">'+
            '<div class="clearfix">'+
            '<div class="notification-icon">'+
            '<i class="fa fa-phone bg-themeprimary white"></i>'+
            '</div>'+
            '<div class="notification-body">'+
            '<span class="title red">未接来电：' + pr.phoneNum + '</span>'+
            '<span class="description">' + pr.time + '</span>'+
            '</div>'+
            '</div>'+
            '</a>'+
            '</li>');
        }

        onLoadCallInfos(prs:PhoneRecord[]):void {
            let count = 5;
            for (let i = 0; i < prs.length && count > 0; ++i){
                if (prs[i].status == CallStatus.missed){
                    this.buildCallCenter($("#navCallCenter").parent(), prs[i]);
                    --count;
                }
            }
            $("#navCallCount").text(5 - count);
        }
    }
}