<%@ page language="java" contentType="text/html; charset=utf-8"
	pageEncoding="utf-8" session="false"%>
<!-- Page Sidebar -->
>
<div class="page-sidebar" id="sidebar">
	<!-- Page Sidebar Header-->
	<div class="sidebar-header-wrapper">
		<input type="text" class="searchinput" /> <i
			class="searchicon fa fa-search"></i>
		<div class="searchhelper">搜索含有该关键字的委案</div>
	</div>
	<!-- /Page Sidebar Header -->
	<!-- Sidebar Menu -->
	<ul class="nav sidebar-menu">
		<!--Dashboard-->
		<!--<li class="active">-->
		<li><a id="console" href=""> <i
				class="menu-icon glyphicon glyphicon-home"></i> <span
				class="menu-text"> 我的工作台 </span>
		</a></li>

		<!--委案管理-->
		<li class="active open"><a href="#" class="menu-dropdown"> <i
				class="menu-icon fa fa-table"></i> <span class="menu-text">
					委案管理 </span> <i class="menu-expand"></i>
		</a>

			<ul class="submenu">
				<li><a id="importLoans" href="importLoans.html"> <span
						class="menu-text">导入委案</span>
				</a></li>
				<li><a id="assignLoans" href="assignLoans.html"> <span
						class="menu-text">分配委案</span>
				</a></li>
				<li><a id="loansMgr" href="loansMgr.html"> <span
						class="menu-text">委案信息查询和维护</span>
				</a></li>
				<li><a id="exportLoans" href="exportLoans.html"> <span
						class="menu-text">委案备份</span>
				</a></li>
				<li><a id="reportTask" href="reportTask.html"> <span
						class="menu-text">委案工作汇报</span>
				</a></li>
				<li><a id="askSth" href="askSth.html"> <span
						class="menu-text">委案咨询</span>
				</a></li>
				<li><a id="callCenter" href="callCenter.html"> <span
						class="menu-text">呼叫中心</span>
				</a></li>
			</ul></li>
		<!--系统管理-->
		<li><a href="#" class="menu-dropdown"> <i
				class="menu-icon glyphicon glyphicon-link"></i> <span
				class="menu-text"> 系统管理 </span> <i class="menu-expand"></i>
		</a>

			<ul class="submenu">
				<li><a id="userMgr" href="userMgr.html"> <span
						class="menu-text">用户管理</span>
				</a></li>

				<li><a id="propertyMgr" href="propertyMgr.html"> <span
						class="menu-text">权限配置</span>
				</a></li>
				<li><a id="backup" href="backup.html"> <span
						class="menu-text">数据备份</span>
				</a></li>
				<li><a href="#" class="menu-dropdown"> <span
						class="menu-text"> 人员调配 </span> <i class="menu-expand"></i>
				</a>

					<ul class="submenu">
						<li><a id="rearangeOffice" href="rearangeOffice.html"> <i
								class="menu-icon fa fa-user-md"></i> <span class="menu-text">调整内勤人员</span>
						</a></li>
						<li><a id="rearangeBussiness" href="rearangeBusiness.html">
								<i class="menu-icon fa fa-user"></i> <span class="menu-text">调整业务人员</span>
						</a></li>
					</ul></li>
			</ul></li>
		<li><a href="index.html"> <i
				class="menu-icon glyphicon glyphicon-gift themesecondary"></i> <span
				class="menu-text"> 贷款委案管理平台 v1.0 </span>
		</a></li>
	</ul>
	<!-- /Sidebar Menu -->
</div>
<!-- /Page Sidebar -->
<script src="${pageContext.request.contextPath}/jsp/pageSidebar.js"></script>