authority.register("/nav/tips/messages", function() {
    $("#accountarea").children(":last").before(ReactDOMServer.renderToStaticMarkup(
        <li>
            <a className="dropdown-toggle" data-toggle="dropdown" title="Tasks" href="#">
                <i className="icon fa fa-tasks"></i>
                <span id="msgCount" className="badge">0</span>
            </a>
            <ul className="pull-right dropdown-menu dropdown-messages dropdown-arrow ">
                <li id="msgCountDetail" className="dropdown-header bordered-darkorange">
                    <i className="fa fa-tasks"></i>
                    0 条待处理消息
                </li>
                <li className="dropdown-footer">
                    <a id="queryAllMsgs" href="#">
                        查看全部咨询信息
                    </a>
                </li>
            </ul>
        </li>
    ));
    navbar.NavBar.openMessageTips();
});
