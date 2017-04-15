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
						<p>呼出电话列表。显示呼出电话内容，呼出时间，呼出电话所关联委案的id。ID可点击，点击后跳转到委案工作汇报页面，仅显示当条委案。</p>
					</div>

					<div id="missing-call" class="tab-pane">
						<p>未接来电列表。在每条未接来电后面点击忽略后，通知内的消息才会消失，否则会一直存在。另外，未接来电页面不能直接呼出，只能找到所关联的委案后，在委案工作汇报页面拨打电话。</p>
					</div>

					<div id="dropdown10" class="tab-pane">
						<p>全部呼入电话列表。无关联功能。已关联的委案会显示委案ID，点击id后跳转到委案汇报页面，仅显示当条委案。</p>
					</div>

					<div id="dropdown20" class="tab-pane">
						<p>未关联委案的呼入电话列表:
							每个电话条目后面有一个关联按钮，点击关联后需要输入委案的唯一编码。委案的编码需要在工作汇报页面查询。</p>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>
<!-- /Page Body -->

<script src="${pageContext.request.contextPath}/jsp/pages/callCenter.js"></script>
