<%@ page language="java" contentType="text/html; charset=utf-8"
	pageEncoding="utf-8" session="false"%>
<!-- Page Breadcrumb -->
<div class="page-breadcrumbs">
	<ul class="breadcrumb">
		<li><i class="fa fa-home"></i> <a href="#">主页</a></li>
		<li><a href="#">委案管理</a></li>
		<li class="active">呼叫中心</li>
	</ul>
</div>
<!-- /Page Breadcrumb -->
<!-- Page Header -->
<div class="page-header position-relative">
	<div class="header-title">
		<h1>呼叫中心</h1>
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
		<div class="col-lg-12 col-sm-12 col-xs-12">
			<div class="tabbable">
				<ul class="nav nav-tabs nav-justified" id="myTab10">
					<li class="active"><a data-toggle="tab" href="#call-out">
							呼出电话 </a></li>

					<li class="tab-red"><a data-toggle="tab" href="#missing-call">
							未接来电 </a></li>

					<li class="dropdown"><a data-toggle="dropdown"
						class="dropdown-toggle" href="call-in"> 呼入电话 <b class="caret"></b>
					</a>

						<ul class="dropdown-menu dropdown-info">
							<li><a data-toggle="tab" href="#dropdown10">全部</a></li>

							<li><a data-toggle="tab" href="#dropdown20">未关联委案</a></li>
						</ul></li>
				</ul>

				<div class="tab-content">
					<div id="call-out" class="tab-pane in active">
<div id="cc-callOut"></div>
					</div>

					<div id="missing-call" class="tab-pane">
				<div id="cc-callMissed"></div>
					</div>

					<div id="dropdown10" class="tab-pane">
						<div id="cc-callIn"></div>
					</div>

					<div id="dropdown20" class="tab-pane">
						<div id="cc-callInNoec"></div>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>
<!-- /Page Body -->

<script src="${pageContext.request.contextPath}/jsp/pages/callCenter.js"></script>
