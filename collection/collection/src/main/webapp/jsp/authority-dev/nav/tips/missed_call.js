authority.register("/nav/tips/missed_call", function() {
    $("#accountarea").children(":first").before(ReactDOMServer.renderToStaticMarkup(
        <li>
            <a  className=" dropdown-toggle" data-toggle="dropdown" title="Notifications" href="#">
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
    ));
    //navbar.NavBar.openCallTips();
});
