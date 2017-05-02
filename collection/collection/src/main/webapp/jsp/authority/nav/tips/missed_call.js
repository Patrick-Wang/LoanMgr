///<reference path="../../../navbar.ts"/>
///<reference path="../../registry.ts"/>
var authority;
(function (authority) {
    var nav;
    (function (nav) {
        var tips;
        (function (tips) {
            var missedCall;
            (function (missedCall_1) {
                var Receiver = route.Receiver;
                var ADDR = "/nav/tips/missed_call";
                authority.register(ADDR, function () {
                    var html = ReactDOMServer.renderToStaticMarkup(React.createElement("li", null, React.createElement("a", {"className": " dropdown-toggle", "data-toggle": "dropdown", "title": "Notifications", "href": "#"}, React.createElement("i", {"className": "icon fa fa-warning red"}), React.createElement("span", {"id": "navCallCount", "className": "badge"}, "0")), React.createElement("ul", {"id": "navCallDetail", "className": "pull-right dropdown-menu dropdown-arrow dropdown-notifications"}, React.createElement("li", {"className": "dropdown-footer "}, React.createElement("div", {"id": "navCallCenter"}, "前往呼叫中心")))));
                    var missedCall = new MissedCall();
                    route.router.register(new Receiver(ADDR, function (e) {
                        switch (e.id) {
                            case route.MSG.NAV_REFRESH:
                                if (html != null) {
                                    $("#accountarea").children(":first").before(html);
                                    html = null;
                                }
                                setInterval(function () {
                                    missedCall.updateTips();
                                }, 30000);
                                missedCall.updateTips();
                                break;
                        }
                    }));
                    MissedCall.createInstance();
                });
                var MissedCall = (function () {
                    function MissedCall() {
                        var _this = this;
                        $("#navCallCenter").click(function () {
                            _this.onClickCallCenter();
                            return false;
                        });
                    }
                    MissedCall.createInstance = function () {
                        MissedCall.ins = new MissedCall();
                    };
                    MissedCall.prototype.updateTips = function () {
                        var _this = this;
                        collection.Phone.getRecords().done(function (prs) {
                            _this.onLoadCallInfos(prs);
                        });
                    };
                    MissedCall.prototype.onClickCallCenter = function () {
                        alert("onClickCallCenter");
                    };
                    MissedCall.prototype.buildCallCenter = function (detailli, pr) {
                        detailli.before(ReactDOMServer.renderToStaticMarkup(React.createElement("li", {"className": "navMissedTmp"}, React.createElement("a", {"href": "#"}, React.createElement("div", {"className": "clearfix"}, React.createElement("div", {"className": "notification-icon"}, React.createElement("i", {"className": "fa fa-phone bg-themeprimary white"})), React.createElement("div", {"className": "notification-body"}, React.createElement("span", {"className": "title red"}, "未接来电 ", pr.phoneNum), React.createElement("span", {"className": "description"}, " ", pr.time)))))));
                    };
                    MissedCall.prototype.onLoadCallInfos = function (prs) {
                        var count = 5;
                        $(".navMissedTmp").remove();
                        for (var i = 0; i < prs.length && count > 0; ++i) {
                            if (prs[i].status == collection.protocol.CallStatus.missed) {
                                this.buildCallCenter($("#navCallCenter").parent(), prs[i]);
                                --count;
                            }
                        }
                        $("#navCallCount").text(5 - count);
                    };
                    return MissedCall;
                })();
            })(missedCall = tips.missedCall || (tips.missedCall = {}));
        })(tips = nav.tips || (nav.tips = {}));
    })(nav = authority.nav || (authority.nav = {}));
})(authority || (authority = {}));
