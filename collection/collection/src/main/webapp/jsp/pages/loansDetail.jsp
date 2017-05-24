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
	<div class="row"></div>
	<div class="well">
		<div class="row">
			<div class="col-sm-12">
				<div class="col-sm-4">
					<h3 class="darkpink" id="ld-eccode">委案编码：</h3>
				</div>
				<div class="col-sm-8">
					<div class="buttons-preview pull-right">
						<div class="btn-group">
							<button type="button" class="btn btn-default"  style="display:none"
								id="bootbox-click-to-working">设为工作中</button>
							<button type="button" class="btn btn-default"  style="display:none"
								id="bootbox-click-to-done">设为已退案</button>
						</div>
						<div class="btn-group">
							<button type="button" class="btn btn-default"  style="display:none"
								id="bootbox-modify-repayment">修改回款额</button>
						</div>
						<div class="btn-group">
							<button type="button" class="btn btn-default"  style="display:none"
								id="bootbox-record-work">工作记录</button>
							<button type="button" class="btn btn-default"  style="display:none"
								id="bootbox-record-work-by-phone">电话访谈</button>
						</div>
						<div class="btn-group">
							<button type="button" class="btn btn-default"  style="display:none"
								id="bootbox-loans-consulting">委案咨询</button>
						</div>
						<div class="btn-group">
							<button type="button" class="btn btn-default"  style="display:none"
								id="bootbox-modify-attachment-property">修改附件属性</button>
						</div>
					</div>
				</div>
			</div>
		</div>
		<hr class="wide" />
		<div class="row fontawesome-icon-list" id="ld-common">

		</div>
		<hr class="wide" />
		<div class="row fontawesome-icon-list" id="ld-special">

		</div>
		<hr class="wide" />
		<div class="row">
			<div class="col-sm-12">
				<ul class="timeline" id="ld-timeline">
					<li class="timeline-node"><a class="btn btn-lg btn-blue"
						id="bootbox-record-work-timeline">工作记录</a></li>
					<li class="timeline-node"><a class="btn btn-lg btn-darkorange"
						id="bootbox-loans-consulting-timeline">咨询记录</a></li>
				</ul>
			</div>
		</div>
	</div>
</div>
<!-- /Page Body -->

<!--Modal Templates-->
<!--report work Modal Templates-->
<div id="template_report_work" style="display: none;">
	<div class="row">
		<div class="col-md-12">
			<div class="form-group">
				<input type="text" class="form-control" placeholder="标题" required="">
			</div>
			<div class="form-group">
				<textarea class="form-control" placeholder="内容" rows="8" required=""></textarea>
			</div>
			<div>
				<div id="ld-dropzone"	class="dropzone"></div>
			</div>
		</div>
	</div>
</div>

<!--report work by phone Modal Templates-->
<div id="template_report_work_by_phone" style="display: none;">
	<div class="row">
		<div class="col-md-12">
			<div class="form-group" data-bv-notempty="true"
				data-bv-notempty-message="工作记录标题不能为空！">
				<input type="text" class="form-control" placeholder="标题" required="">
			</div>
			<div class="form-group">
				<textarea class="form-control" placeholder="内容" rows="8" required=""></textarea>
			</div>
			<div class="form-group">
				<input type="text" data-mask="999-9999-9999" class="form-control"
					placeholder="186-8888-8888">
			</div>
			<div>
	<a
	href="javascript:void(0);"
	class="btn btn-darkorange btn-circle btn-sm pull-right"><i
	class="glyphicon glyphicon-phone-alt"></i></a>
				<a href="javascript:void(0);"
					class="btn btn-palegreen btn-circle btn-sm"><i
					class="glyphicon glyphicon-earphone"></i></a>
			</div>
		</div>
	</div>
</div>

<!--consulting Modal Templates-->
<div id="template_consulting" style="display: none;">
	<div class="row">
		<div class="col-md-12">
			<div class="form-group">
				<input type="text" class="form-control" placeholder="标题" required="">
			</div>
			<div class="form-group">
				<textarea class="form-control" placeholder="内容" rows="8" required=""></textarea>
			</div>
		</div>
	</div>
</div>

<!--modify repayment Modal Templates-->
<div id="template_modify_repayment" style="display: none;">
	<div class="row">
		<div class="form-group">
			<div class="col-sm-6">
				<div class="form-group">
					<label>已还金额：</label> <span class="input-icon icon-right"> <input
						type="text" class="form-control" id="exampleInputyhje"
						placeholder="5000"> <i class="fa fa-rmb palegreen"></i>
					</span>
				</div>
			</div>
			<div class="col-sm-6">
				<div class="form-group">
					<label>剩余金额</label> <span class="input-icon icon-right"> <input
						type="text" class="form-control" id="exampleInputsyje"
						placeholder="2000"> <i class="fa fa-rmb darkorange"></i>
					</span>
				</div>
			</div>
		</div>
	</div>
</div>

<!--modify attachment property Modal Templates-->
<div id="template_modify_attachment_property" style="display: none;">

		<div class="row">
			<div class="col-md-12">
				<div class="form-group">
					<label class="col-sm-4 control-label no-padding-right">20170522_123433_外访表.doc</label>
					<div class="col-sm-4">
						<input class="form-control" placeholder="201705220_123433_外访表"
							data-edit="false">
					</div>
					<div class="col-sm-4">
						<input class="form-control" data-mask="9999-99-99 99:99:99"
							placeholder="2017-05-22 12:34:33">
					</div>
				</div>
			</div>
		</div>
		<div class="row">
			<div class="col-md-12">
				<div class="form-group">
					<label class="col-sm-4 control-label no-padding-right">20170522_123433_外访表.doc</label>
					<div class="col-sm-4">
						<input class="form-control" placeholder="201705220_123433_外访表"
							data-edit="false">
					</div>
					<div class="col-sm-4">
						<input class="form-control" data-mask="9999/99/99 99:99:99"
							placeholder="2017/05/22 12:34:33">
					</div>
				</div>
			</div>
		</div>
		<div class="row">
			<div class="col-md-12">
				<div class="form-group">
					<label class="col-sm-4 control-label no-padding-right">20170522_123433_外访表.doc</label>
					<div class="col-sm-4">
						<input class="form-control" placeholder="201705220_123433_外访表"
							data-edit="false">
					</div>
					<div class="col-sm-4">
						<input class="form-control" data-mask="9999/99/99 99:99:99"
							placeholder="2017/05/22 12:34:33">
					</div>
				</div>
			</div>
		</div>
</div>

<div id="workrecord" style="display: none;">
	<div class="row">
		<div class="col-md-12">
			<div class="form-group">
				<input type="text" class="form-control" placeholder="工作标题"
					required="">
			</div>
			<div class="form-group">
				<textarea class="form-control" placeholder="工作内容" rows="5"
					required=""></textarea>
			</div>
			<div class="form-group">
				<input type="text" class="form-control" placeholder="相关附件"
					required="">
			</div>
		</div>
	</div>
</div>

<div id="phone" style="display: none;">
	<div class="row">
		<div class="col-md-12">
			<div class="form-group">
				<input type="text" class="form-control" placeholder="选择或输入电话号码"
					required="">
			</div>
		</div>
	</div>
</div>

<script
	src="${pageContext.request.contextPath}/jsp/assets/js/slimscroll/jquery.slimscroll.min.js"></script>

<script
	src="${pageContext.request.contextPath}/jsp/assets/js/validation/bootstrapvalidator.js"></script>
<script
	src="${pageContext.request.contextPath}/jsp/pages/loansDetail.js"></script>