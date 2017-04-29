<%@ page language="java" contentType="text/html; charset=utf-8"
	pageEncoding="utf-8" session="false"%>

<!-- Page Breadcrumb -->
<div class="page-breadcrumbs">
	<ul class="breadcrumb">
		<li><i class="fa fa-home"></i> <a href="#">主页</a></li>
		<li><a href="#">委案管理</a></li>
		<li class="active">委案信息查询和管理</li>
	</ul>
</div>
<!-- /Page Breadcrumb -->
<!-- Page Header -->
<div class="page-header position-relative">
	<div class="header-title">
		<h1>委案信息查询和管理</h1>
	</div>
	<!--Header Buttons-->
	<div class="header-buttons">
		<a class="sidebar-toggler" href="#"> <i class="fa fa-arrows-h"></i>
		</a> <a class="refresh" id="refresh-toggler" href="indexOffice.htm"> <i
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
	<div class="tab-content tabs-flat">
		<div class="row">
			<div class="col-xs-12 col-md-8">

				<ul class="dowebok">
					<li><input type="radio" checked="checked" name="lm-Radio"
						myid="0" data-labelauty="车贷"></li>
					<li><input type="radio" name="lm-Radio" myid="1"
						data-labelauty="信贷"></li>
					<li><input type="radio" name="lm-Radio" myid="2"
						data-labelauty="信用卡"></li>
				</ul>

			</div>
			<div class="col-xs-12 col-md-4">
				<div class="buttons-preview">
					<a href="javascript:void(0);" class="btn btn-default">编辑委案信息</a> <a
						href="javascript:void(0);" class="btn btn-primary">修改回款额</a>
				</div>
			</div>
		</div>
		<div class="row">
			<div class="col-xs-12 col-md-12">
				<div class="widget">
					<div class="widget-body">
						<div id="lm-table"></div>
					</div>
				</div>

			</div>
		</div>
	</div>

</div>
<!-- /Page Body -->
<script src="${pageContext.request.contextPath}/jsp/pages/loansMgr.js"></script>
