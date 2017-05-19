<%@ page language="java" contentType="text/html; charset=utf-8"
	pageEncoding="utf-8" session="false"%>
<style>
#qStatus{
	border-radius: 0px;
}
</style>
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
			<div class="col-xs-6 col-md-6">
				<ul class="dowebok pull-left">
					<li><input type="radio" checked="checked" name="lm-Radio"
						myid="0" data-labelauty="车贷"></li>
					<li><input type="radio" name="lm-Radio" myid="1"
						data-labelauty="信贷"></li>
					<li><input type="radio" name="lm-Radio" myid="2"
						data-labelauty="信用卡"></li>
				</ul>
				<ul class="dowebok pull-right" >
				<li style="display:none"><input type="radio" checked="checked" name="lm-Radio2"
				myid="0" data-labelauty="分配给我的"></li>
				<li style="display:none"><input type="radio" name="lm-Radio2" myid="1"
				data-labelauty="我分配的"></li>
				<li style="display:none"><input type="radio" name="lm-Radio2" myid="2"
				data-labelauty="全部"></li>
				</ul>
			</div>

			<div class="col-xs-5 col-md-6" id="lm-export">

			</div>
			<%--<div class="col-xs-12 col-md-6">--%>
				<%--<div class="buttons-preview" style="float:right;display:none">--%>
					<%--<a href="javascript:void(0);" class="btn btn-blue">确定</a>--%>
					<%--<a href="javascript:void(0);" class="btn btn-default">取消</a>--%>
				<%--</div>--%>
			<%--</div>--%>
		</div>
		<div class="row">
			<div class="col-xs-2 col-md-2">
				<div class="form-group">
					<label class="control-label">姓名</label> <input id="qName" type="text"
						class="form-control">
				</div>
			</div>
			<div class="col-xs-2 col-md-2">
				<div class="form-group">
					<label class="control-label">身份证</label> <input id="qPIN" type="text"
						class="form-control">
				</div>
			</div>
			<div class="col-xs-2 col-md-2">
				<div class="form-group">
					<label class="control-label">车牌号</label> <input id="qCode" type="text"
						class="form-control">
				</div>
			</div>
			<div class="col-xs-2 col-md-2">
				<div class="form-group">
					<label class="control-label">委外日期</label> <input id="qDate" type="text"
						data-mask="9999-99-99" class="form-control"
						placeholder="YYYY-MM-DD">
				</div>
			</div>
			<div class="col-xs-2 col-md-2">
				<div class="form-group">
					<label class="control-label">委外机构</label>
	<%----%>
			<%--<input id="qWwjg" type="text"--%>
						<%--class="form-control">--%>
					<select id="qWwjg" style="width:100%;" class="form-control">
						<option value="none" />
					</select>
				</div>
			</div>
			<div class="col-xs-2 col-md-2">
			<div class="form-group">
				<label class="control-label">委外状态</label>
					<select id="qStatus" style="width:100%;" class="form-control">
						<option value="none" />
	                    <option value="未分配" >未分配</option>
						<option value="已分配" >已分配</option>
						<option value="已结束" >已结案</option>
					</select>
				</div>
			</div>
		</div>
		<div class="row">
			<div class="col-xs-12 col-md-12">
				<div class="widget">
					<div class="widget-body" style="margin-bottom:0px">
						<div id="lm-table"></div>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>
<!-- /Page Body -->
<script src="${pageContext.request.contextPath}/jsp/pages/loansMgr.js"></script>
