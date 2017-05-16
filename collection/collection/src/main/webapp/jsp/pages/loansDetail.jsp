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
					<h3 class="darkpink">委案编码：XD00001232 （工作中）</h3>
				</div>
				<div class="col-sm-8">
					<div class="buttons-preview pull-right">
						<div class="btn-group">
							<button type="button" class="btn btn-default"
								id="bootbox-click-to-working">设为工作中</button>
							<button type="button" class="btn btn-default"
								id="bootbox-click-to-done">设为已退案</button>
						</div>
						<div class="btn-group">
							<button type="button" class="btn btn-default"
								id="bootbox-modify-repayment">修改回款额</button>
						</div>
						<div class="btn-group">
							<button type="button" class="btn btn-default"
								id="bootbox-record-work">工作记录</button>
							<button type="button" class="btn btn-default"
								id="bootbox-record-work-by-phone">电话访谈</button>
						</div>
						<div class="btn-group">
							<button type="button" class="btn btn-default"
								id="bootbox-loans-consulting">委案咨询</button>
						</div>
						<div class="btn-group">
							<button type="button" class="btn btn-default"
								id="bootbox-modify-attachment-property">修改附件属性</button>
						</div>
					</div>
				</div>
			</div>
		</div>
		<hr class="wide" />
		<div class="row fontawesome-icon-list" id="ld-common">
			<div class="fa-hover col-md-4 col-sm-6">
				<i class="fa fa-square-o darkpink"></i><b>批次号：</b>PT002311
			</div>
			<div class="fa-hover col-md-4 col-sm-6">
				<i class="fa fa-square-o darkpink"></i><b>委外日期：</b>2017/1/31
			</div>
			<div class="fa-hover col-md-4 col-sm-6">
				<i class="fa fa-square-o darkpink"></i><b>委外状态：</b>工作中
			</div>
			<div class="fa-hover col-md-4 col-sm-6">
				<i class="fa fa-square-o darkpink"></i><b>委外机构：</b>建设银行
			</div>
			<div class="fa-hover col-md-4 col-sm-6">
				<i class="fa fa-square-o darkpink"></i><b>委外金额：</b>20665元
			</div>
			<div class="fa-hover col-md-4 col-sm-6">
				<i class="fa fa-square-o darkpink"></i><b>已还金额：</b>1000元
			</div>
			<div class="fa-hover col-md-4 col-sm-6">
				<i class="fa fa-square-o darkpink"></i><b>委外到期日：</b>2017/3/31
			</div>
			<div class="fa-hover col-md-4 col-sm-6">
				<i class="fa fa-square-o darkpink"></i><b>结案日期：</b>2017/3/31
			</div>
		</div>
		<hr class="wide" />
		<div class="row fontawesome-icon-list" id="ld-special">
			<div class="fa-hover col-md-4 col-sm-6">
				<i class="fa fa-caret-right darkpink"></i><b>客户姓名：</b>赵六
			</div>
			<div class="fa-hover col-md-4 col-sm-6">
				<i class="fa fa-caret-right darkpink"></i><b>合同编号：</b>XD000123221
			</div>
			<div class="fa-hover col-md-4 col-sm-6">
				<i class="fa fa-caret-right darkpink"></i><b>外包商编号：</b>WBS00231
			</div>
			<div class="fa-hover col-md-4 col-sm-6">
				<i class="fa fa-caret-right darkpink"></i><b>委外类型：</b>委外催收
			</div>
			<div class="fa-hover col-md-4 col-sm-6">
				<i class="fa fa-caret-right darkpink"></i><b>客户性别：</b>男
			</div>
			<div class="fa-hover col-md-4 col-sm-6">
				<i class="fa fa-caret-right darkpink"></i><b>客户出生日期：</b>1975/5/22
			</div>
			<div class="fa-hover col-md-4 col-sm-6">
				<i class="fa fa-caret-right darkpink"></i><b>客户身份证号：</b>220103197505221023
			</div>
			<div class="fa-hover col-md-4 col-sm-6">
				<i class="fa fa-caret-right darkpink"></i><b>外访期数：</b>24
			</div>
			<div class="fa-hover col-md-4 col-sm-6">
				<i class="fa fa-caret-right darkpink"></i><b>外访金额：</b>20000元
			</div>
			<div class="fa-hover col-md-4 col-sm-6">
				<i class="fa fa-caret-right darkpink"></i><b>逾期天数：</b>20天
			</div>
			<div class="fa-hover col-md-4 col-sm-6">
				<i class="fa fa-caret-right darkpink"></i><b>逾期金额：</b>20000元
			</div>
			<div class="fa-hover col-md-4 col-sm-6">
				<i class="fa fa-caret-right darkpink"></i><b>月供车款金额：</b>200元
			</div>
			<div class="fa-hover col-md-4 col-sm-6">
				<i class="fa fa-caret-right darkpink"></i><b>贷款期限：</b>36个月
			</div>
			<div class="fa-hover col-md-4 col-sm-6">
				<i class="fa fa-caret-right darkpink"></i><b>逾期期数：</b>20期
			</div>
			<div class="fa-hover col-md-4 col-sm-6">
				<i class="fa fa-caret-right darkpink"></i><b>曾经逾期次数：</b>2期
			</div>
			<div class="fa-hover col-md-4 col-sm-6">
				<i class="fa fa-caret-right darkpink"></i><b>还款期数：</b>12期
			</div>
			<div class="fa-hover col-md-4 col-sm-6">
				<i class="fa fa-caret-right darkpink"></i><b>城市：</b>沈阳
			</div>
		</div>
		<hr class="wide" />
		<div class="row">
			<div class="col-sm-12">
				<ul class="timeline" id="ld-timeline">
					<li class="timeline-node"><a class="btn btn-lg btn-blue"
						id="bootbox-record-work-timeline">工作记录 +</a></li>
					<li>
						<div class="timeline-datetime">
							<span class="timeline-time"> 8:19 </span><span
								class="timeline-date">2017年5月12日</span>
						</div>
						<div class="timeline-badge">
							<i class="fa fa-tag sky font-120"></i>
						</div>
						<div class="timeline-panel bordered-top-3 bordered-azure">
							<div class="timeline-header bordered-bottom bordered-blue">
								<span class="timeline-title"> 进行现场催收 </span>
								<p class="timeline-datetime">
									<small class="text-muted"> <i
										class="glyphicon glyphicon-time"> </i> <span
										class="timeline-date">2017年5月12日</span> - <span
										class="timeline-time">8:19</span>
									</small>
								</p>
							</div>
							<div class="timeline-body">
								<p>对客户赵六进行了现场催收</p>
								现场催收后客户对还款的反馈积极，能够及时按照前款金额在2017年5月20日前将余款返回。
								<p>
									<b>附件：</b>
								</p>
								<a href="#">现场访谈录音.mp3</a>
								<p>
									<a href="#">现场催收信息表.xls</a>
							</div>
						</div>
					</li>
					<li class="timeline-inverted">
						<div class="timeline-datetime">
							<span class="timeline-time"> 8:19 </span><span
								class="timeline-date">2017年5月12日</span>
						</div>
						<div class="timeline-badge">
							<i class="fa fa-tag sky font-120"></i>
						</div>
						<div class="timeline-panel bordered-top-3 bordered-azure">
							<div class="timeline-header bordered-bottom bordered-blue">
								<span class="timeline-title"> 进行现场催收 </span>
								<p class="timeline-datetime">
									<small class="text-muted"> <i
										class="glyphicon glyphicon-time"> </i> <span
										class="timeline-date">2017年5月12日</span> - <span
										class="timeline-time">8:19</span>
									</small>
								</p>
							</div>
							<div class="timeline-body">
								<p>对客户赵六进行了现场催收</p>
								现场催收后客户对还款的反馈积极，能够及时按照前款金额在2017年5月20日前将余款返回。
								<p>
									<b>附件：</b>
								</p>
								<a href="#">现场访谈录音.mp3</a>
								<p>
									<a href="#">现场催收信息表.xls</a>
							</div>
						</div>
					</li>
					<li>
						<div class="timeline-datetime">
							<span class="timeline-time"> 8:19 </span><span
								class="timeline-date">2017年5月12日</span>
						</div>
						<div class="timeline-badge">
							<i class="fa fa-tag sky font-120"></i>
						</div>
						<div class="timeline-panel bordered-top-3 bordered-azure">
							<div class="timeline-header bordered-bottom bordered-blue">
								<span class="timeline-title"> 进行现场催收 </span>
								<p class="timeline-datetime">
									<small class="text-muted"> <i
										class="glyphicon glyphicon-time"> </i> <span
										class="timeline-date">2017年5月12日</span> - <span
										class="timeline-time">8:19</span>
									</small>
								</p>
							</div>
							<div class="timeline-body">
								<p>对客户赵六进行了现场催收</p>
								现场催收后客户对还款的反馈积极，能够及时按照前款金额在2017年5月20日前将余款返回。
								<p>
									<b>附件：</b>
								</p>
								<a href="#">现场访谈录音.mp3</a>
								<p>
									<a href="#">现场催收信息表.xls</a>
							</div>
						</div>
					</li>
					<li class="timeline-node"><a class="btn btn-lg btn-darkorange"
						id="bootbox-loans-consulting-timeline">咨询记录 +</a></li>
					<li class="timeline-inverted">
						<div class="timeline-datetime">
							<span class="timeline-time"> 8:19 </span><span
								class="timeline-date">2017年5月12日</span>
						</div>
						<div class="timeline-badge">
							<i class="fa fa-question darkorange font-120"></i>
						</div>
						<div class="timeline-panel">
							<div class="timeline-header bordered-bottom bordered-blue">
								<span class="timeline-title darkorange"> 咨询身份证信息 </span>
								<p class="timeline-datetime">
									<small class="text-muted"> <i
										class="glyphicon glyphicon-time"> </i> <span
										class="timeline-date">2017年5月12日</span> - <span
										class="timeline-time">8:19</span>
									</small>
								</p>
							</div>
							<div class="timeline-body">
								<p>客户身份证信息不正确，需要重新询问身份证号及扫描件</p>
								<p>
									<b>答复：</b>
								</p>
								<p>身份证号为：220103197505221232</p>
								<p>
									附件： <span><a class="danger" href="#">身份证扫描件.pdf</a></span>
								</p>
							</div>
						</div>
					</li>
					<li>
						<div class="timeline-datetime">
							<span class="timeline-time"> 8:19 </span><span
								class="timeline-date">2017年5月12日</span>
						</div>
						<div class="timeline-badge">
							<i class="fa fa-question darkorange font-120"></i>
						</div>
						<div class="timeline-panel">
							<div class="timeline-header bordered-bottom bordered-blue">
								<span class="timeline-title darkorange"> 咨询身份证信息 </span>
								<p class="timeline-datetime">
									<small class="text-muted"> <i
										class="glyphicon glyphicon-time"> </i> <span
										class="timeline-date">2017年5月12日</span> - <span
										class="timeline-time">8:19</span>
									</small>
								</p>
							</div>
							<div class="timeline-body">
								<p>客户身份证信息不正确，需要重新询问身份证号及扫描件</p>
								<p>
									<b>未答复</b>
								</p>
							</div>
						</div>
					</li>
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
				<a href="javascript:void(0);"
					class="btn btn-palegreen btn-circle btn-sm"><i
					class="glyphicon glyphicon-earphone"></i></a> <a
					href="javascript:void(0);"
					class="btn btn-darkorange btn-circle btn-sm pull-right"><i
					class="glyphicon glyphicon-phone-alt"></i></a>
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