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

			<table class="table table-striped table-bordered table-hover">
				<thead>
					<tr>
						<th><i class="fa fa-briefcase"></i> 委案编码</th>
						<th class="hidden-xs"><i class="fa fa-user"></i> 责任内勤</th>
						<th><i class="fa fa-calendar"></i> 回复时间</th>
						<th><i class="fa fa-comment"></i> 咨询标题</th>
						<th><i class="fa fa-file-text"></i> 咨询内容</th>
						<th><i class="fa fa-file-text"></i> 回复内容</th>
						<th><i class="fa fa-file"></i> 相关附件</th>
						<th></th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<td><a href="#">0100000234</a></td>
						<td class="hidden-xs">王五</td>
						<td>2017-04-10 12:21:32</td>
						<td>身份证信息问题</td>
						<td>编号为0100000234的委案信息中身份证号码不正确</td>
						<td>身份证号码为2201038382723433</td>
						<td><a href="#">身份证扫描件.pdf</a></td>
						<td><a href="#" class="btn btn-default btn-xs purple"><i
								class="fa fa-share"></i> 前往</a></td>
					</tr>
					<tr>
						<td><a href="#">0100000238</a></td>
						<td class="hidden-xs">王五</td>
						<td>2017-04-11 10:18:22</td>
						<td>身份证信息问题</td>
						<td>编号为0100000238的委案信息中身份证号码不正确</td>
						<td>身份证号码为2201038382723433</td>
						<td><a href="#">身份证扫描件.pdf</a></td>
						<td><a href="#" class="btn btn-default btn-xs purple"><i
								class="fa fa-share"></i> 前往</a></td>
					</tr>
				</tbody>
			</table>
		</div>
	</div>
</div>
<!-- /Page Body -->

<script src="${pageContext.request.contextPath}/jsp/pages/askSth.js"></script>
