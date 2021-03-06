<%@ page language="java" contentType="text/html; charset=utf-8"
	pageEncoding="utf-8" session="false"%>

<!-- Page Breadcrumb -->
<div class="page-breadcrumbs">
	<ul class="breadcrumb">
		<li><i class="fa fa-home"></i> <a href="#">主页</a></li>
		<li><a href="#">委案管理</a></li>
		<li class="active">委案咨询</li>
	</ul>
</div>
<!-- /Page Breadcrumb -->
<!-- Page Header -->
<div class="page-header position-relative">
	<div class="header-title">
		<h1>委案咨询回复列表</h1>
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
			<div id="as-msgs"></div>
		</div>
	</div>
</div>
<form id="as-downloadForm" style="display: none"
	action="${pageContext.request.contextPath}/message/download.do">
	<input type="text" name="entrusted_case" /> <input type="text"
		name="from" /> <input type="text" name="to" /> <input type="text"
		name="attachement" />
</form>

<div id="as-replyDialog" style="display: none;">
	<div class="row">
		<div class="col-md-12">
			<form role="form">
				<div class="form-group">
					<textarea id="content" class="form-control" placeholder="Content" rows="5" required=""></textarea>
				</div>
				<div class="form-group">
					<div id="as-dropzone"	class="dropzone"></div>
				</div>
			</form>
		</div>
	</div>
</div>
<!-- /Page Body -->

<script src="${pageContext.request.contextPath}/jsp/pages/askSth.js"></script>
