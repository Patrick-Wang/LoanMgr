<%@ page language="java" contentType="text/html; charset=utf-8"
	pageEncoding="utf-8" session="false"%>
<!-- Page Breadcrumb -->
<div class="page-breadcrumbs">
	<ul class="breadcrumb">
		<li><i class="fa fa-home"></i> <a href="#">主页</a></li>
		<li class="active">我的工作台</li>
	</ul>
</div>
<!-- /Page Breadcrumb -->
<!-- Page Header -->
<div class="page-header position-relative">
	<div class="header-title">
		<h1>数据备份</h1>
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
	</div>
</div>
<form id="bk-form" action="${pageContext.request.contextPath}/entrusted_case/manager/backup.do" style="display:none">
	<input id = "bk-batchNo" name="batchNo" type="text" >
</form>
<div id="bkup-backupDialog" style="display: none;">
	<div class="row">
	<div class="col-md-1"></div>
		<div class="col-md-10">
			<form role="form">
				<div class="form-title">批次号</div>
				<div class="form-group">
					 <select id="bkup-batchNo"
					style="width: 100%;" class="form-control">
				</select>
				</div>
			</form>
		</div>
		<div class="col-md-1"></div>
	</div>
</div>
<!-- /Page Body -->

<script src="${pageContext.request.contextPath}/jsp/pages/backup.js"></script>
