<%@ page language="java" contentType="text/html; charset=utf-8"
	pageEncoding="utf-8" session="false"%>


<!-- Page Breadcrumb -->
<div class="page-breadcrumbs">
	<ul class="breadcrumb">
		<li><i class="fa fa-home"></i> <a href="#">主页</a></li>
		<li><a href="#">委案管理</a></li>
		<li class="active">导入委案</li>
	</ul>
</div>
<!-- /Page Breadcrumb -->
<!-- Page Header -->
<div class="page-header position-relative">
	<div class="header-title">
		<h1>委案导入</h1>
	</div>
	<!--Header Buttons-->
	<div class="header-buttons">
		<a class="sidebar-toggler" href="#"> <i class="fa fa-arrows-h"></i>
		</a> <a class="refresh" id="refresh-toggler" href="importLoans.html">
			<i class="glyphicon glyphicon-refresh"></i>
		</a> <a class="fullscreen" id="fullscreen-toggler" href="#"> <i
			class="glyphicon glyphicon-fullscreen"></i>
		</a>
	</div>
	<!--Header Buttons End-->
</div>
<!-- /Page Header -->
<!-- Page Body -->
<div class="page-body">
	<div class="col-lg-12 col-sm-12 col-xs-12">
		<div id="il-WiredWizard" class="wizard wizard-wired"
			data-target="#il-WiredWizardsteps">
			<ul class="steps">
				<li id="step1" data-target="#il-wiredstep1" class="active"><span
					class="step">1</span><span class="title">选择导入类别</span><span
					class="chevron"></span></li>
				<li id="step2" data-target="#il-wiredstep2"><span class="step">2</span><span
					class="title">导入Excel</span> <span class="chevron"></span></li>
				<%--<li id="step3" data-target="#il-wiredstep3"><span class="step">3</span><span--%>
				<%--class="title">确认导入信息</span> <span class="chevron"></span></li>--%>
			</ul>
		</div>
		<div class="step-content" id="il-WiredWizardsteps">
			<div class="step-pane active" id="il-wiredstep1">
				<div class="row pricing-container">
					<div class="col-xs-12 col-sm-6 col-md-3">
						<div class="plan popular-plan animated bounce">
							<div class="header bordered-yellow">车贷</div>
							<a id="selcar" class="signup bg-yellow" href="#">选择</a>
						</div>
					</div>
					<div class="col-xs-12 col-sm-6 col-md-3">
						<div class="plan animated ">
							<div class="header bordered-palegreen">信贷</div>
							<a id="selloan" class="signup bg-palegreen" href="#">选择</a>
						</div>
					</div>
					<div class="col-xs-12 col-sm-6 col-md-3">
						<div class="plan animated ">
							<div class="header bordered-orange">信用卡</div>
							<a id="selcard" class="signup bg-orange" href="#">选择</a>
						</div>
					</div>
				</div>
			</div>
			<div class="step-pane" id="il-wiredstep2">
				<div class="row">
					<div class="col-lg-12">
						<div class="well with-header">
							<div class="header bordered-darkpink">选择文件或拖拽文件到此处</div>
							<form id="dropzone"
								action="${pageContext.request.contextPath}/entrusted_case/import.do"
								class="dropzone"></form>
						</div>
					</div>
				</div>
			</div>
		</div>
		<div class="actions actions-footer" id="il-WiredWizard-actions" style="display:none">
			<div class="btn-group">
			<button type="button" class="btn btn-default btn-sm btn-prev"> <i class="fa fa-angle-left"></i>上一步</button>
			<button type="button" class="btn btn-default btn-sm btn-next" data-last="导入">下一步<i class="fa fa-angle-right"></i></button>
			</div>
		</div>
	</div>
</div>

<!-- /Page Body -->
<script
	src="${pageContext.request.contextPath}/jsp/pages/importLoans.js"></script>