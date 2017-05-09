<%@ page language="java" contentType="text/html; charset=utf-8"
	pageEncoding="utf-8" session="false"%>

<!-- Page Breadcrumb -->
<div class="page-breadcrumbs">
	<ul class="breadcrumb">
		<li><i class="fa fa-home"></i> <a href="#">主页</a></li>
		<li><a href="#">系统管理</a></li>
		<li class="active">用户管理</li>
	</ul>
</div>
<!-- /Page Breadcrumb -->
<!-- Page Header -->
<div class="page-header position-relative">
	<div class="header-title">
		<h1>用户管理</h1>
	</div>
	<!--Header Buttons-->
	<div class="header-buttons">
		<a class="sidebar-toggler" href="#"> <i class="fa fa-arrows-h"></i>
		</a> <a class="refresh" id="refresh-toggler" href="index.htm"> <i
			class="glyphicon glyphicon-refresh"></i>
		</a> <a class="fullscreen" id="fullscreen-toggler" href="#"> <i
			class="glyphicon glyphicon-fullscreen"></i>
		</a>
	</div>
	<!--Header Buttons End-->
</div>
<!-- /Page Header -->
<!-- Page Body -->
<div class="page-body">
	<div class="row">
		<div class="col-xs-12 col-md-12">
			<div class="buttons-preview">
				<a id="um-createUser" href="#" class="btn btn-info">创建用户</a> <a
					id="um-editUser" href="#" class="btn btn-info">编辑用户</a>
			</div>
		</div>
	</div>
	<div class="row">
		<div class="col-xs-12 col-md-12">
			<div class="widget">
				<div class="widget-body">
					<div id="um-tbUsers"></div>
				</div>
			</div>
		</div>
	</div>
	<div id="um-createUserDialog" style="display: none;">
		<div class="row">
			<div class="col-md-12">
				<form role="form">
					<div class="form-title">基本信息</div>
					<div class="form-group">
						<span class="input-icon icon-right"> <input type="text"
							class="form-control" id="um-userame" placeholder="用户名">
							<i class="glyphicon glyphicon-user circular"></i>
						</span>
					</div>
					<div class="form-group">
						<span class="input-icon icon-right"> <input type="password"
							class="form-control" id="um-password" placeholder="密码">
							<i class="fa fa-lock circular"></i>
						</span>
					</div>
					<div class="form-group">
						<span class="input-icon icon-right"> <input type="password"
							class="form-control" id="um-confirmPassword" placeholder="确认密码">
							<i class="fa fa-lock circular"></i>
						</span>
					</div>
					<div class="form-group">
						<span class="input-icon icon-right"> <input type="text"
							class="form-control" id="um-position" placeholder="职称">
							<i class="glyphicon glyphicon-user circular"></i>
						</span>
					</div>
					<%--<hr class="wide">--%>
					<div class="form-title">角色信息</div>

					<div class="row">
						<div class="col-sm-4">
							<div class="form-group">
								<div class="checkbox">
									<label> <input type="checkbox" class="colored-blue" id="um-insideMgr" value="2">
										<span class="text">内勤管理员</span>
									</label>
								</div>
							</div>
						</div>
						<div class="col-sm-4">
							<div class="form-group">
								<div class="checkbox">
									<label> <input type="checkbox" class="colored-blue" id="um-inside" value="4">
										<span class="text">内勤</span>
									</label>
								</div>
							</div>
						</div>
						<div class="col-sm-4">
							<div class="form-group">
								<div class="checkbox">
									<label> <input type="checkbox" class="colored-blue" id="um-outsideMgr" value="3">
										<span class="text">业务管理员</span>
									</label>
								</div>
							</div>
						</div>
					</div>

					<div class="row">
						<div class="col-sm-4">
							<div class="form-group">
								<div class="checkbox">
									<label> <input type="checkbox" class="colored-blue" id="um-outside" value="5">
										<span class="text">业务员</span>
									</label>
								</div>
							</div>
						</div>
						<div class="col-sm-4">
							<div class="form-group">
								<div class="checkbox">
									<label> <input type="checkbox" class="colored-blue" id="um-admin" value="1">
										<span class="text">管理员</span>
									</label>
								</div>
							</div>
						</div>
					</div>
					<%--<hr class="wide">--%>
					<div class="form-title">组织信息</div>
					<div class="form-group">
					<div id="um-Orgs"></div>
					</div>
				</form>
			</div>
		</div>
	</div>
</div>


<!-- /Page Body -->
<script src="${pageContext.request.contextPath}/jsp/pages/userMgr.js"></script>
