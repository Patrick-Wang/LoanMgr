<%@ page language="java" contentType="text/html; charset=utf-8"
	pageEncoding="utf-8" session="false"%>
<style>
#rearangeOfficePage #ro-allLoans .widget {
	margin-bottom: -30px;
}
.pricing-container .dowebok li {
	margin: 0;
}
</style>
<div class="page-breadcrumbs">
	<ul class="breadcrumb">
		<li><i class="fa fa-home"></i> <a href="#">主页</a></li>
		<li><a href="#">系统管理</a></li>
		<li class="active">调整内勤人员</li>
	</ul>
</div>
<!-- /Page Breadcrumb -->
<!-- Page Header -->
<div class="page-header position-relative">
	<div class="header-title">
		<h1>调整内勤人员</h1>
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
	<div class="col-lg-12 col-sm-12 col-xs-12">
		<div id="ro-WiredWizard" class="wizard wizard-wired"
			data-target="#ro-WiredWizardsteps">
			<ul class="steps">
				<li data-target="#ro-wiredstep1" class="active"><span
					class="step">1</span><span class="title">选择委案</span><span
					class="chevron"></span></li>
				<li data-target="#ro-wiredstep2"><span class="step">2</span><span
					class="title">选择内勤人员</span> <span class="chevron"></span></li>
				<li data-target="#ro-wiredstep3"><span class="step">3</span><span
					class="title">确认调整信息</span> <span class="chevron"></span></li>
			</ul>
		</div>

		<div class="step-content" id="ro-WiredWizardsteps">
			<div class="step-pane active" id="ro-wiredstep1">
				<div class="row pricing-container">
					<div class="row">
						<div class="col-xs-12 col-md-12">
							<ul class="dowebok" style="float: left">
								<li><input type="radio" name="ro-radio" myid="0"
									data-labelauty="车贷" checked="checked"></li>
								<li><input type="radio" name="ro-radio" myid="1"
									data-labelauty="信贷"></li>
								<li><input type="radio" name="ro-radio" myid="2"
									data-labelauty="信用卡"></li>
							</ul>
							<!-- 							<div class="buttons-preview" style="float:right">
	<a href="javascript:void(0);" class="btn btn-info">查询</a>
	</div> -->
						</div>
					</div>
					<div class="row">
						<div class="col-xs-12 col-md-12">
							<div class="tabbable">
								<div class="tab-content tabs-flat">
									<div id="ro-allLoans" class="tab-pane active">
										<div class="row">
											<div class="col-xs-12 col-md-12">
												<div class="widget">
													<div class="widget-body">
														<div id="ro-tbAllLoans"></div>
													</div>
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div class="step-pane" id="ro-wiredstep2">
				<div class="row">
					<div class="col-lg-12 col-sm-12 col-xs-12">
						<div class="widget flat radius-bordered">

							<div class="widget-body">

								<div id="ro-treeOrg" class="tree tree-plus-minus">
									<div class="tree-folder" style="display: none;">
										<div class="tree-folder-header">
											<i class="fa fa-folder"></i>
											<div class="tree-folder-name"></div>
										</div>
										<div class="tree-folder-content"></div>
										<div class="tree-loader" style="display: none;"></div>
									</div>
									<div class="tree-item" style="display: none;">
										<i class="tree-dot"></i>
										<div class="tree-item-name"></div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div class="step-pane" id="ro-wiredstep3">
				<div class="row">
					<div class="col-xs-12 col-md-12">
						<div class="alert alert-info fade in">
							<i class="fa-fw fa fa-info"></i> <strong>请确认！</strong> 共计将如下 28
							条委案分配给 业务一部 业务员 张三。
						</div>
					</div>
				</div>
				<div class="row" id="ro-ensure-outer">
					<div class="col-xs-12 col-md-12">
						<div class="widget">
							<div class="widget-body">
								<div id="ro-ensure"></div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
		<div class="actions actions-footer" id="ro-WiredWizard-actions">
			<div class="btn-group">
				<button type="button" class="btn btn-default btn-sm btn-prev">
					<i class="fa fa-angle-left"></i>上一步
				</button>
				<button type="button" class="btn btn-default btn-sm btn-next"
					data-last="完成">
					下一步<i class="fa fa-angle-right"></i>
				</button>
			</div>
		</div>
	</div>
</div>
<!-- /Page Body -->
<script
	src="${pageContext.request.contextPath}/jsp/pages/rearangeOffice.js"></script>
