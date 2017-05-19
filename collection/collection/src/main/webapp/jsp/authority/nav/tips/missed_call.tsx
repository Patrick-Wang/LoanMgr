///<reference path="../../../navbar.ts"/>
///<reference path="../../registry.ts"/>
module authority.nav.tips.missedCall {
    import Receiver = route.Receiver;
    import PageType = pages.PageType;
    import CallStatus = collection.protocol.CallStatus;
    let ADDR:string = "/nav/tips/missed_call";
    authority.register(ADDR, function () {
        let html = ReactDOMServer.renderToStaticMarkup(
            <li>
                <a className=" dropdown-toggle" data-toggle="dropdown" title="Notifications" href="#">
                    <i className="icon fa fa-warning red"></i>
                    <span id="navCallCount" className="badge">0</span>
                </a>
                <ul id="navCallDetail" className="pull-right dropdown-menu dropdown-arrow dropdown-notifications">
                    <li className="dropdown-footer ">
                        <div id="navCallCenter">
                            前往呼叫中心
                        </div>
                    </li>
                </ul>
            </li>
        );

        let missedCall:MissedCall;
        route.router.register(new Receiver(ADDR, (e:route.Event)=> {
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

    class MissedCall {
        prs:collection.protocol.PhoneRecord[];

        constructor() {
            $("#navCallCenter").click(()=> {
                this.onClickCallCenter();
            });
        }


        updateTips():void {
            collection.Phone.getRecords().done((prs:collection.protocol.PhoneRecord[])=> {
                this.prs = prs;
                this.onLoadCallInfos(prs);
            });
        }

        onClickCallCenter() {
            let promises = [];
            $(this.prs).each((i, e:collection.protocol.PhoneRecord)=> {
                promises.push(collection.Phone.updateStatus(e.recId, CallStatus.missedSkip));
            });
            if (promises.length > 0) {
                $.when.apply($, promises).done(()=> {
                    //$.each(arguments, function (i, data) {
                    //    console.log(data); //data is the value returned by each of the ajax requests
                    //
                    //    total += data[0]; //if the result of the ajax request is a int value then
                    //});
                    sidebar.switchPage(PageType.callCenter);
                    this.updateTips();
                });
            } else {
                sidebar.switchPage(PageType.callCenter);
            }
        }

        buildCallCenter(detailli:any, pr:collection.protocol.PhoneRecord) {
            detailli.before(ReactDOMServer.renderToStaticMarkup(
                <li className="navMissedTmp">
                    <a href="#" id={pr.recId}>
                        <div className="clearfix">
                            <div className="notification-icon">
                                <i className="fa fa-phone bg-themeprimary white"></i>
                            </div>
                            <div className="notification-body">
                                <span className="title red">未接来电 {pr.phoneNum}</span>
                                <span className="description"> {pr.time}</span>
                            </div>
                        </div>
                    </a>
                </li>));

            $(".navMissedTmp #" + pr.recId).click(()=>{
                this.onClickMissedCall(pr.recId);
            })
        }

        onLoadCallInfos(prs:collection.protocol.PhoneRecord[]):void {
            let count = 5;
            $(".navMissedTmp").remove();
            for (let i = 0; i < prs.length && count > 0; ++i) {
                if (prs[i].status == collection.protocol.CallStatus.missed) {
                    this.buildCallCenter($("#navCallCenter").parent(), prs[i]);
                    --count;
                }
            }
            $("#navCallCount").text(5 - count);
        }

        private onClickMissedCall(recId:number):void {
            collection.Phone.updateStatus(recId, CallStatus.missedSkip).done(()=>{
                sidebar.switchPage(PageType.callCenter);
                this.updateTips();
            });
        }
    }


}