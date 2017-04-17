authority.register("/nav/tips/missed_call", function() {
    $("#accountarea").children(":first").before(ReactDOMServer.renderToStaticMarkup(
        <li>
            <a className=" dropdown-toggle" data-toggle="dropdown" title="Notifications" href="#">
                <i className="icon fa fa-warning red"></i>
                <span className="badge">2</span>
            </a>
            <ul className="pull-right dropdown-menu dropdown-arrow dropdown-notifications">
                <li>
                    <a href="#">
                        <div className="clearfix">
                            <div className="notification-icon">
                                <i className="fa fa-phone bg-themeprimary white"></i>
                            </div>
                            <div className="notification-body">
                                <span className="title red">未接来电：138-0240-9977</span>
                                <span className="description">今天 上午 9点18分30秒</span>
                            </div>
                        </div>
                    </a>
                </li>
                <li>
                    <a href="#">
                        <div className="clearfix">
                            <div className="notification-icon">
                                <i className="fa fa-phone bg-themeprimary white"></i>
                            </div>
                            <div className="notification-body">
                                <span className="title red">未接来电：186-2402-0715</span>
                                <span className="description">今天 下午 3点42分18秒</span>
                            </div>
                        </div>
                    </a>
                </li>
                <li className="dropdown-footer ">
			                    <span>
			                        前往呼叫中心
			                    </span>
                </li>
            </ul>
        </li>
    ));
});
