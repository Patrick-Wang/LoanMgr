///<reference path="../../../navbar.ts"/>
///<reference path="../../registry.ts"/>
var navbar;
(function (navbar) {
    var MessageReceiver = authority.MessageReceiver;
    let ADDR = "/nav/tips/missed_call";
    authority.register(ADDR, function () {
        let html = ReactDOMServer.renderToStaticMarkup(React.createElement("li", null, React.createElement("a", {"className": " dropdown-toggle", "data-toggle": "dropdown", "title": "Notifications", "href": "#"}, React.createElement("i", {"className": "icon fa fa-warning red"}), React.createElement("span", {"id": "navCallCount", "className": "badge"}, "0")), React.createElement("ul", {"id": "navCallDetail", "className": "pull-right dropdown-menu dropdown-arrow dropdown-notifications"}, React.createElement("li", {"className": "dropdown-footer "}, React.createElement("div", {"id": "navCallCenter"}, "前往呼叫中心")))));
        let missedCall = new MissedCall();
        route.router.register(new MessageReceiver(ADDR, (e) => {
            switch (e.id) {
                case navbar.ON_REFRESH:
                    if (html != null) {
                        $("#accountarea").children(":first").before(html);
                        html = null;
                    }
                    missedCall.updateTips();
                    break;
            }
        }));
        MissedCall.createInstance();
    });
    class MissedCall {
        constructor() {
            $("#navCallCenter").click(() => {
                this.onClickCallCenter();
                return false;
            });
        }
        static createInstance() {
            MissedCall.ins = new MissedCall();
        }
        updateTips() {
            collection.Phone.getRecords().done((prs) => {
                this.onLoadCallInfos(prs);
            });
        }
        onClickCallCenter() {
            alert("onClickCallCenter");
        }
        buildCallCenter(detailli, pr) {
            detailli.before(ReactDOMServer.renderToStaticMarkup(React.createElement("li", null, React.createElement("a", {"href": "#"}, React.createElement("div", {"className": "clearfix"}, React.createElement("div", {"className": "notification-icon"}, React.createElement("i", {"className": "fa fa-phone bg-themeprimary white"})), React.createElement("div", {"className": "notification-body"}, React.createElement("span", {"className": "title red"}, "未接来电 ", pr.phoneNum), React.createElement("span", {"className": "description"}, " ", pr.time)))))));
        }
        onLoadCallInfos(prs) {
            let count = 5;
            for (let i = 0; i < prs.length && count > 0; ++i) {
                if (prs[i].status == collection.protocol.CallStatus.missed) {
                    this.buildCallCenter($("#navCallCenter").parent(), prs[i]);
                    --count;
                }
            }
            $("#navCallCount").text(5 - count);
        }
    }
})(navbar || (navbar = {}));
