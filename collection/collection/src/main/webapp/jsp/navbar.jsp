<%@ page language="java" contentType="text/html; charset=utf-8"
	pageEncoding="utf-8" session="false"%>
    <!-- Navbar -->
    <div class="navbar">
        <div class="navbar-inner">
            <div class="navbar-container">
                <!-- Navbar Barnd -->
                <div class="navbar-header pull-left">
                    <a href="#" class="navbar-brand">
                        <small>
                            <img src="${pageContext.request.contextPath}/jsp/assets/img/logo.png" alt="" />
                        </small>
                    </a>
                </div>
                <!-- /Navbar Barnd -->
                <!-- Sidebar Collapse -->
                <div class="sidebar-collapse" id="sidebar-collapse">
                    <i class="collapse-icon fa fa-bars"></i>
                </div>
                <!-- /Sidebar Collapse -->
                <!-- Account Area and Settings --->
                <div class="navbar-header pull-right">
                    <div class="navbar-account">
                        <ul class="account-area">

                            <li>
                                <a class=" dropdown-toggle" data-toggle="dropdown" title="Notifications" href="#">
                                    <i class="icon fa fa-warning red"></i>
                                    <span class="badge">2</span>
                                </a>
                                <!--Notification Dropdown-->
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
                                <!--/Notification Dropdown-->
                            </li>

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

                            <li>
                                <a class="login-area dropdown-toggle" data-toggle="dropdown">
                                    <div class="avatar" title="View your public profile">
                                        <img src="${pageContext.request.contextPath}/jsp/assets/img/avatars/bing.png">
                                    </div>
                                    <section>
                                        <h2><span class="profile"><span>
												${roles.contains("ROLE_ADMIN") ? "管理员 " : ""}
												${roles.contains("ROLE_MANAGER") ? "管理层 " : ""}
												${roles.contains("ROLE_INSIDE_STAFF") ? "内勤 " : ""}
												${roles.contains("ROLE_OUTSIDE_STAFF") ? "外勤 " : ""} ：${userName} </span></span></h2>
                                    </section>
                                </a>
                                <!--Login Area Dropdown-->
                                <ul class="pull-right dropdown-menu dropdown-arrow dropdown-login-area">
                                    <!--Avatar Area-->
                                    <li>
                                        <div class="avatar-area">
                                            <img src="${pageContext.request.contextPath}/jsp/assets/img/avatars/bing.png" class="avatar">
                                            <span class="caption">修改头像</span>
                                        </div>
                                    </li>
                                    <!--Avatar Area-->
                                    <li class="edit">
                                        <a href="profile.html" class="pull-left">账户信息</a>
                                        <a href="#" class="pull-right">设置</a>
                                    </li>
                                    <!--Theme Selector Area-->
                                    <li class="theme-area">
                                        <ul class="colorpicker" id="skin-changer">
                                            <li><a class="colorpick-btn" href="#" style="background-color:#5DB2FF;" rel="${pageContext.request.contextPath}/jsp/assets/css/skins/blue.min.css"></a></li>
                                            <li><a class="colorpick-btn" href="#" style="background-color:#2dc3e8;" rel="${pageContext.request.contextPath}/jsp/assets/css/skins/azure.min.css"></a></li>
                                            <li><a class="colorpick-btn" href="#" style="background-color:#03B3B2;" rel="${pageContext.request.contextPath}/jsp/assets/css/skins/teal.min.css"></a></li>
                                            <li><a class="colorpick-btn" href="#" style="background-color:#53a93f;" rel="${pageContext.request.contextPath}/jsp/assets/css/skins/green.min.css"></a></li>
                                            <li><a class="colorpick-btn" href="#" style="background-color:#FF8F32;" rel="${pageContext.request.contextPath}/jsp/assets/css/skins/orange.min.css"></a></li>
                                            <li><a class="colorpick-btn" href="#" style="background-color:#cc324b;" rel="${pageContext.request.contextPath}/jsp/assets/css/skins/pink.min.css"></a></li>
                                            <li><a class="colorpick-btn" href="#" style="background-color:#AC193D;" rel="${pageContext.request.contextPath}/jsp/assets/css/skins/darkred.min.css"></a></li>
                                            <li><a class="colorpick-btn" href="#" style="background-color:#8C0095;" rel="${pageContext.request.contextPath}/jsp/assets/css/skins/purple.min.css"></a></li>
                                            <li><a class="colorpick-btn" href="#" style="background-color:#0072C6;" rel="${pageContext.request.contextPath}/jsp/assets/css/skins/darkblue.min.css"></a></li>
                                            <li><a class="colorpick-btn" href="#" style="background-color:#585858;" rel="${pageContext.request.contextPath}/jsp/assets/css/skins/gray.min.css"></a></li>
                                            <li><a class="colorpick-btn" href="#" style="background-color:#474544;" rel="${pageContext.request.contextPath}/jsp/assets/css/skins/black.min.css"></a></li>
                                            <li><a class="colorpick-btn" href="#" style="background-color:#001940;" rel="${pageContext.request.contextPath}/jsp/assets/css/skins/deepblue.min.css"></a></li>
                                        </ul>
                                    </li>
                                    <!--/Theme Selector Area-->
                                    <li class="dropdown-footer">
                                        <a href="${pageContext.request.contextPath}/logout.do">
                                            退出登录
                                        </a>
                                    </li>
                                </ul>
                                <!--/Login Area Dropdown-->
                            </li>
                            <!-- /Account Area -->
                            <!--Note: notice that setting div must start right after account area list.
                            no space must be between these elements-->
                            <!-- Settings -->
                        </ul><div class="setting">
                        <a id="btn-setting" title="Setting" href="#">
                            <i class="icon glyphicon glyphicon-cog"></i>
                        </a>
                    </div><div class="setting-container">
                        <label>
                            <input type="checkbox" id="checkbox_fixednavbar">
                            <span class="text">固定页眉</span>
                        </label>
                        <label>
                            <input type="checkbox" id="checkbox_fixedsidebar">
                            <span class="text">固定导航栏</span>
                        </label>
                        <label>
                            <input type="checkbox" id="checkbox_fixedbreadcrumbs">
                            <span class="text">固定路径栏</span>
                        </label>
                        <label>
                            <input type="checkbox" id="checkbox_fixedheader">
                            <span class="text">固定所有页头</span>
                        </label>
                    </div>
                        <!-- Settings -->
                    </div>
                </div>
                <!-- /Account Area and Settings -->
            </div>
        </div>
    </div>
    <!-- /Navbar -->
    <script src="${pageContext.request.contextPath}/jsp/navbar.js"></script>