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
                var PageType = pages.PageType;
                var CallStatus = collection.protocol.CallStatus;
                var ADDR = "/nav/tips/missed_call";
                authority.register(ADDR, function () {
                    var html = ReactDOMServer.renderToStaticMarkup(React.createElement("li", null, React.createElement("a", {"className": " dropdown-toggle", "data-toggle": "dropdown", "title": "Notifications", "href": "#"}, React.createElement("i", {"className": "icon fa fa-warning red"}), React.createElement("span", {"id": "navCallCount", "className": "badge"}, "0")), React.createElement("ul", {"id": "navCallDetail", "className": "pull-right dropdown-menu dropdown-arrow dropdown-notifications"}, React.createElement("li", {"className": "dropdown-footer "}, React.createElement("div", {"id": "navCallCenter"}, "前往呼叫中心")))));
                    var missedCall;
                    route.router.register(new Receiver(ADDR, function (e) {
                        switch (e.id) {
                            case route.MSG.NAV_REFRESH:
                                if (html != null) {
                                    $("#accountarea").children(":first").before(html);
                                    missedCall = new MissedCall();
                                    html = null;
                                }
                                missedCall.updateTips();
                                break;
                        }
                    }));
                });
                var MissedCall = (function () {
                    function MissedCall() {
                        var _this = this;
                        $("#navCallCenter").click(function () {
                            _this.onClickCallCenter();
                        });
                    }
                    MissedCall.prototype.updateTips = function () {
                        var _this = this;
                        collection.Phone.getRecords().done(function (prs) {
                            _this.prs = prs;
                            _this.onLoadCallInfos(prs);
                        });
                    };
                    MissedCall.prototype.onClickCallCenter = function () {
                        var _this = this;
                        var promises = [];
                        $(this.prs).each(function (i, e) {
                            if (e.status == CallStatus.missed) {
                                promises.push(collection.Phone.updateStatus(e.recId, CallStatus.missedNotifySkip));
                            }
                        });
                        if (promises.length > 0) {
                            $.when.apply($, promises).done(function () {
                                //$.each(arguments, function (i, data) {
                                //    console.log(data); //data is the value returned by each of the ajax requests
                                //
                                //    total += data[0]; //if the result of the ajax request is a int value then
                                //});
                                sidebar.switchPage(PageType.callCenter);
                                _this.updateTips();
                            });
                        }
                        else {
                            sidebar.switchPage(PageType.callCenter);
                        }
                    };
                    MissedCall.prototype.buildCallCenter = function (detailli, pr) {
                        var _this = this;
                        detailli.before(ReactDOMServer.renderToStaticMarkup(React.createElement("li", {"className": "navMissedTmp"}, React.createElement("a", {"href": "#", "id": pr.recId}, React.createElement("div", {"className": "clearfix"}, React.createElement("div", {"className": "notification-icon"}, React.createElement("i", {"className": "fa fa-phone bg-themeprimary white"})), React.createElement("div", {"className": "notification-body"}, React.createElement("span", {"className": "title red"}, "未接来电 ", pr.phoneNum), React.createElement("span", {"className": "description"}, " ", pr.time)))))));
                        $(".navMissedTmp #" + pr.recId).click(function () {
                            _this.onClickMissedCall(pr.recId);
                        });
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
                    MissedCall.prototype.onClickMissedCall = function (recId) {
                        var _this = this;
                        collection.Phone.updateStatus(recId, CallStatus.missedNotifySkip).done(function () {
                            sidebar.switchPage(PageType.callCenter);
                            _this.updateTips();
                        });
                    };
                    return MissedCall;
                })();
            })(missedCall = tips.missedCall || (tips.missedCall = {}));
        })(tips = nav.tips || (nav.tips = {}));
    })(nav = authority.nav || (authority.nav = {}));
})(authority || (authority = {}));
