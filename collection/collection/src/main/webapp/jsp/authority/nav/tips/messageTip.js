///<reference path="../../../navbar.ts"/>
var navbar;
(function (navbar) {
    var MsgTip = (function () {
        function MsgTip() {
            var _this = this;
            $("#queryAllMsgs").click(function () {
                _this.onClickQueryAllMessage();
                return false;
            });
        }
        MsgTip.updateTips = function () {
            collection.Message.getUnreadMessages()
                .done(function (mecs) {
                MsgTip.ins.onLoadMEC(mecs);
            });
        };
        MsgTip.prototype.onClickQueryAllMessage = function () {
        };
        MsgTip.prototype.clickMessage = function (msgId) {
            alert(msgId);
            return false;
        };
        MsgTip.prototype.onLoadMEC = function (ums) {
            $("#msgCount").text(ums.length);
            $("#msgCountDetail").text(ums.length + "条待处理消息");
            $("#navMsgTmp").remove();
            for (var i = 0; i < ums.length; ++i) {
                $("#msgCountDetail").after(buildMessageDetail(ums[i]));
            }
        };
        MsgTip.ins = new MsgTip();
        return MsgTip;
    })();
    navbar.MsgTip = MsgTip;
})(navbar || (navbar = {}));
