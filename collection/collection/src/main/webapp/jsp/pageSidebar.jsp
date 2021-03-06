<%@ page language="java" contentType="text/html; charset=utf-8"
	pageEncoding="utf-8" session="false"%>
<!-- Page Sidebar -->
<div class="page-sidebar" id="sidebar">
	<!-- Page Sidebar Header-->
	<div class="sidebar-header-wrapper">
<!-- 		<input type="text" class="searchinput" /> <i
			class="searchicon fa fa-search"></i>
		<div class="searchhelper">搜索含有该关键字的委案</div> -->
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
		<li class="active"><a href="#" class="menu-dropdown"> <i
				class="menu-icon fa fa-table"></i> <span class="menu-text">
					委案管理 </span> <i class="menu-expand"></i>
		</a>

			<ul class="submenu">
				<c:if test='${address.contains("/ec/import")}'>
					<li><a id="importLoans" href="importLoans.html"> <span
							class="menu-text">导入委案</span>
					</a></li>
				</c:if>
				<c:if test='${address.contains("/ec/assign")}'>
					<li><a id="assignLoans" href="assignLoans.html"> <span
							class="menu-text">分配委案</span>
					</a></li>
				</c:if>

				<li><a id="loansMgr" href="loansMgr.html"> <span
						class="menu-text">委案信息查询和维护</span>
				</a></li>
				
				<li><a id="loansDetail" href="loansMgr.html" style="display:none"> <span
						class="menu-text">委案详细信息</span>
				</a></li>

				<c:if
					test='${address.contains("/ec/ask") || address.contains("/ec/answer")}'>
					<li><a id="askSth" href="askSth.html"> <span
							class="menu-text">委案咨询</span>
					</a></li>
				</c:if>

				<c:if test='${address.contains("/phone/call")}'>
					<li><a id="callCenter" href="callCenter.html"> <span
							class="menu-text">呼叫中心</span>
					</a></li>
				</c:if>
			</ul></li>
		<!--系统管理-->

		<c:if
			test='${address.contains("/user/manager") || address.contains("/ec/backup")}'>
			<li><a href="#" class="menu-dropdown"> <i
					class="menu-icon glyphicon glyphicon-link"></i> <span
					class="menu-text"> 系统管理 </span> <i class="menu-expand"></i>
			</a>
				<ul class="submenu">
					<c:if test='${address.contains("/user/manager")}'>
						<li><a id="userMgr" href="userMgr.html"> <span
								class="menu-text">用户管理</span>
						</a></li>
					</c:if>

					<!-- 				<li><a id="propertyMgr" href="propertyMgr.html"> <span
						class="menu-text">权限配置</span>
				</a></li> -->

					<c:if test='${address.contains("/ec/backup")}'>
						<li><a id="backup" href="backup.html"> <span
								class="menu-text">数据备份</span>
						</a></li>
					</c:if>

					<c:if test='${address.contains("/user/manager")}'>
						<li><a id="rearangeOffice" href="backup.html"> <span
								class="menu-text">调整内勤人员</span>
						</a></li>
					</c:if>

				</ul></li>
		</c:if>
		<li><a href="#"> <i
				class="menu-icon glyphicon glyphicon-gift themesecondary"></i> <span
				class="menu-text"> 贷款委案管理平台 v1.0 </span>
		</a></li>
	</ul>
	<!-- /Sidebar Menu -->
</div>
<!-- /Page Sidebar -->
<script src="${pageContext.request.contextPath}/jsp/pageSidebar.js"></script>