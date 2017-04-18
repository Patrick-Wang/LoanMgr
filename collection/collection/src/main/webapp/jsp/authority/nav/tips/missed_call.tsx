///<reference path="../../../navbar.ts"/>
module navbar {
    import MessageReceiver = authority.MessageReceiver;
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
                        <div id="navCallCenter" >
                            前往呼叫中心
                        </div>
                    </li>
                </ul>
            </li>
        );

        let missedCall:MissedCall = new MissedCall();
        route.router.register(new MessageReceiver(ADDR, (e:route.Event)=> {
            switch (e.id) {
                case ON_REFRESH:
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
        static ins:MissedCall;

        static createInstance():void {
            MissedCall.ins = new MissedCall();
        }

        constructor() {
            $("#navCallCenter").click(()=> {
                this.onClickCallCenter();
                return false;
            });
        }


        updateTips():void {
            collection.Phone.getRecords().done((prs:PhoneRecord[])=> {
                this.onLoadCallInfos(prs);
            });
        }

        onClickCallCenter() {
            alert("onClickCallCenter");
        }

        buildCallCenter(detailli:any, pr:PhoneRecord) {
            detailli.before(ReactDOMServer.renderToStaticMarkup(
                <li>
                    <a href="#">
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
        }

        onLoadCallInfos(prs:PhoneRecord[]):void {
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


}