<%@ page language="java" contentType="text/html; charset=utf-8"
	pageEncoding="utf-8" session="false"%>
<!-- Navbar -->
	<style>
	.page-header.page-header-fixed+.page-body {
	margin-top: 125px;
	}
	</style>
<div class="navbar">
	<div class="navbar-inner">
		<div class="navbar-container">
			<!-- Navbar Barnd -->
			<div class="navbar-header pull-left">
				<a href="#" class="navbar-brand"> <small> <img
						src="${pageContext.request.contextPath}/jsp/assets/img/logo.png"
						alt="" />
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
					<ul id="accountarea" class="account-area">


						<li><a class="login-area dropdown-toggle"
							data-toggle="dropdown">
								<div class="avatar">
									<img class = "header-pic"
										src="${pageContext.request.contextPath}/jsp/assets/img/avatars/adam-jansen.jpg">
								</div>
								<section>
									<h2>
										<span class="profile"><span>${position}：
												${userName}</span></span>
									</h2>
								</section>
						</a> <!--Login Area Dropdown-->
							<ul
								class="pull-right dropdown-menu dropdown-arrow dropdown-login-area">
								<!--Avatar Area-->
								<li>
									<div class="avatar-area">
										<img 
											src="${pageContext.request.contextPath}/jsp/assets/img/avatars/adam-jansen.jpg"
											class="avatar header-pic"><!--  <span class="caption">修改头像</span> -->
									</div>
								</li>
								<!--Theme Selector Area-->
								<li class="theme-area">
									<ul class="colorpicker" id="skin-changer">
										<li><a class="colorpick-btn" href="#"
											style="background-color: #5DB2FF;"
											rel="${pageContext.request.contextPath}/jsp/assets/css/skins/blue.min.css"></a></li>
										<li><a class="colorpick-btn" href="#"
											style="background-color: #2dc3e8;"
											rel="${pageContext.request.contextPath}/jsp/assets/css/skins/azure.min.css"></a></li>
										<li><a class="colorpick-btn" href="#"
											style="background-color: #03B3B2;"
											rel="${pageContext.request.contextPath}/jsp/assets/css/skins/teal.min.css"></a></li>
										<li><a class="colorpick-btn" href="#"
											style="background-color: #53a93f;"
											rel="${pageContext.request.contextPath}/jsp/assets/css/skins/green.min.css"></a></li>
										<li><a class="colorpick-btn" href="#"
											style="background-color: #FF8F32;"
											rel="${pageContext.request.contextPath}/jsp/assets/css/skins/orange.min.css"></a></li>
										<li><a class="colorpick-btn" href="#"
											style="background-color: #cc324b;"
											rel="${pageContext.request.contextPath}/jsp/assets/css/skins/pink.min.css"></a></li>
										<li><a class="colorpick-btn" href="#"
											style="background-color: #AC193D;"
											rel="${pageContext.request.contextPath}/jsp/assets/css/skins/darkred.min.css"></a></li>
										<li><a class="colorpick-btn" href="#"
											style="background-color: #8C0095;"
											rel="${pageContext.request.contextPath}/jsp/assets/css/skins/purple.min.css"></a></li>
										<li><a class="colorpick-btn" href="#"
											style="background-color: #0072C6;"
											rel="${pageContext.request.contextPath}/jsp/assets/css/skins/darkblue.min.css"></a></li>
										<li><a class="colorpick-btn" href="#"
											style="background-color: #585858;"
											rel="${pageContext.request.contextPath}/jsp/assets/css/skins/gray.min.css"></a></li>
										<li><a class="colorpick-btn" href="#"
											style="background-color: #474544;"
											rel="${pageContext.request.contextPath}/jsp/assets/css/skins/black.min.css"></a></li>
										<li><a class="colorpick-btn" href="#"
											style="background-color: #001940;"
											rel="${pageContext.request.contextPath}/jsp/assets/css/skins/deepblue.min.css"></a></li>
									</ul>
								</li>
								<!--/Theme Selector Area-->
								<li class="dropdown-footer"><a
									href="${pageContext.request.contextPath}/logout.do"> 退出登录 </a>
								</li>
							</ul> <!--/Login Area Dropdown--></li>
						<!-- /Account Area -->
						<!--Note: notice that setting div must start right after account area list.
                            no space must be between these elements-->
						<!-- Settings -->
					</ul>
					<div class="setting">
						<a id="btn-setting" title="Setting" href="#"> <i
							class="icon glyphicon glyphicon-cog"></i>
						</a>
					</div>
					<div class="setting-container">
						<label> <input type="checkbox" id="checkbox_fixednavbar">
							<span class="text">固定页眉</span>
						</label> <label> <input type="checkbox" id="checkbox_fixedsidebar">
							<span class="text">固定导航栏</span>
						</label> <label> <input type="checkbox"
							id="checkbox_fixedbreadcrumbs"> <span class="text">固定路径栏</span>
						</label> <label> <input type="checkbox" id="checkbox_fixedheader">
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


