function missed_call() {
    $("#accountarea").children(":last").before("<li></li>");
    ReactDOM.render(
        <div>
            <li>
                <a class="dropdown-toggle" data-toggle="dropdown" title="Tasks" href="#">
                    <i class="icon fa fa-tasks"></i>
                    <span id="msgCount" class="badge">0</span>
                </a>
                <!--Tasks Dropdown-->
                <ul class="pull-right dropdown-menu dropdown-messages dropdown-arrow ">
                    <li id="msgCountDetail" class="dropdown-header bordered-darkorange">
                        <i class="fa fa-tasks"></i>
                        0 条委消息
                    </li>
                    <li class="dropdown-footer">
                        <a id="queryAllMsgs" href="#">
                            查看全部咨询信息
                        </a>
                    </li>
                </ul>
                <!--/Tasks Dropdown-->
            </li>
        </div>,
        $("#accountarea").children(":first")[0]
    );
    navbar.NavBar.openMessageTips();
}
authority.register("/nav/tips/missed_call", missed_call);
