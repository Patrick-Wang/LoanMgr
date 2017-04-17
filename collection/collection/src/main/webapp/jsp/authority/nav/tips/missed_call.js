function missed_call() {
    $("#accountarea").children(":first").before("<li></li>");
    ReactDOM.render(
        <div>
            <a class=" dropdown-toggle" data-toggle="dropdown" title="Notifications" href="#">
                <i class="icon fa fa-warning red"></i>
                <span class="badge">2</span>
            </a>
            <ul class="pull-right dropdown-menu dropdown-arrow dropdown-notifications">
                <li>
                    <a href="#">
                        <div class="clearfix">
                            <div class="notification-icon">
                                <i class="fa fa-phone bg-themeprimary white"></i>
                            </div>
                            <div class="notification-body">
                                <span class="title red">未接来电：138-0240-9977</span>
                                <span class="description">今天 上午 9点18分30秒</span>
                            </div>
                        </div>
                    </a>
                </li>
                <li>
                    <a href="#">
                        <div class="clearfix">
                            <div class="notification-icon">
                                <i class="fa fa-phone bg-themeprimary white"></i>
                            </div>
                            <div class="notification-body">
                                <span class="title red">未接来电：186-2402-0715</span>
                                <span class="description">今天 下午 3点42分18秒</span>
                            </div>
                        </div>
                    </a>
                </li>
                <li class="dropdown-footer ">
			                    <span>
			                        前往呼叫中心
			                    </span>
                </li>
            </ul>
        </div>,
        $("#accountarea").children(":first")[0]
    );
}
authority.register("/nav/tips/missed_call", missed_call);
