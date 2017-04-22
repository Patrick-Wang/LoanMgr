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
		<div id="WiredWizard" class="wizard wizard-wired"
			data-target="#WiredWizardsteps">
			<ul class="steps">
				<li id="step1" data-target="#wiredstep1" class="active"><span class="step">1</span><span
					class="title">选择导入类别</span><span class="chevron"></span></li>
				<li id="step2" data-target="#wiredstep2"><span class="step">2</span><span
					class="title">导入Excel</span> <span class="chevron"></span></li>
				<%--<li id="step3" data-target="#wiredstep3"><span class="step">3</span><span--%>
					<%--class="title">确认导入信息</span> <span class="chevron"></span></li>--%>
			</ul>
		</div>
		<div class="step-content" id="WiredWizardsteps">
			<div class="step-pane active" id="wiredstep1">
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
			<div class="step-pane" id="wiredstep2">
				<div class="row">
					<div class="col-lg-12">
						<div class="well with-header">
							<div class="header bordered-darkpink">选择文件或拖拽文件到此处</div>
							<form  id="dropzone" action="${pageContext.request.contextPath}/entrusted_case/import.do" class="dropzone"></form>
						</div>
					</div>
				</div>
			</div>
			<%--<div class="step-pane" id="wiredstep3">--%>
				<%--<div class="row">--%>
					<%--<div class="col-xs-12 col-md-12">--%>
						<%--<div class="alert alert-info fade in">--%>
							<%--<i class="fa-fw fa fa-info"></i> <strong>请确认！</strong> 共计导入如下 88--%>
							<%--条委案。--%>
						<%--</div>--%>
					<%--</div>--%>
				<%--</div>--%>
				<%--<div class="row">--%>
					<%--<div class="col-xs-12 col-md-12">--%>
						<%--<div class="widget">--%>
							<%--<div class="widget-body">--%>
								<%--<table class="table table-striped table-bordered table-hover"--%>
									<%--id="simpledatatable">--%>
									<%--<thead>--%>
										<%--<tr>--%>
											<%--<th><label> <input type="checkbox"> <span--%>
													<%--class="text"></span>--%>
											<%--</label></th>--%>
											<%--<th>客户号</th>--%>
											<%--<th>客户姓名</th>--%>
											<%--<th>账户号</th>--%>
											<%--<th>性别</th>--%>
											<%--<th>身份证号</th>--%>
											<%--<th>放款机构</th>--%>
											<%--<th>放款时间</th>--%>
											<%--<th>提前结清金额</th>--%>
											<%--<th>剩余本金</th>--%>
											<%--<th>逾期利息</th>--%>
										<%--</tr>--%>
									<%--</thead>--%>
									<%--<tbody>--%>
										<%--<tr>--%>
											<%--<td><label> <input type="checkbox"> <span--%>
													<%--class="text"></span>--%>
											<%--</label></td>--%>
											<%--<td><a href="index.html">XD00001226</a></td>--%>
											<%--<td><a href="index.html">孙七</a></td>--%>
											<%--<td>2220001119998230</td>--%>
											<%--<td>男</td>--%>
											<%--<td>210103198001203322</td>--%>
											<%--<td>中国农业银行</td>--%>
											<%--<td>2017-01-01</td>--%>
											<%--<td>200000</td>--%>
											<%--<td>108000</td>--%>
											<%--<td>12000</td>--%>
										<%--</tr>--%>
										<%--<tr>--%>
											<%--<td><label> <input type="checkbox"> <span--%>
													<%--class="text"></span>--%>
											<%--</label></td>--%>
											<%--<td><a href="index.html">XD00001226</a></td>--%>
											<%--<td><a href="index.html">孙七</a></td>--%>
											<%--<td>2220001119998230</td>--%>
											<%--<td>男</td>--%>
											<%--<td>210103198001203322</td>--%>
											<%--<td>中国农业银行</td>--%>
											<%--<td>2017-01-01</td>--%>
											<%--<td>200000</td>--%>
											<%--<td>108000</td>--%>
											<%--<td>12000</td>--%>
										<%--</tr>--%>
										<%--<tr>--%>
											<%--<td><label> <input type="checkbox"> <span--%>
													<%--class="text"></span>--%>
											<%--</label></td>--%>
											<%--<td><a href="index.html">XD00001226</a></td>--%>
											<%--<td><a href="index.html">孙七</a></td>--%>
											<%--<td>2220001119998230</td>--%>
											<%--<td>男</td>--%>
											<%--<td>210103198001203322</td>--%>
											<%--<td>中国农业银行</td>--%>
											<%--<td>2017-01-01</td>--%>
											<%--<td>200000</td>--%>
											<%--<td>108000</td>--%>
											<%--<td>12000</td>--%>
										<%--</tr>--%>
										<%--<tr class="odd gradeX">--%>
											<%--<td><label> <input type="checkbox"> <span--%>
													<%--class="text"></span>--%>
											<%--</label></td>--%>
											<%--<td><a href="index.html">XD00001226</a></td>--%>
											<%--<td><a href="index.html">孙七</a></td>--%>
											<%--<td>2220001119998230</td>--%>
											<%--<td>男</td>--%>
											<%--<td>210103198001203322</td>--%>
											<%--<td>中国农业银行</td>--%>
											<%--<td>2017-01-01</td>--%>
											<%--<td>200000</td>--%>
											<%--<td>108000</td>--%>
											<%--<td>12000</td>--%>
										<%--</tr>--%>
										<%--<tr>--%>
											<%--<td><label> <input type="checkbox"> <span--%>
													<%--class="text"></span>--%>
											<%--</label></td>--%>
											<%--<td><a href="index.html">XD00001226</a></td>--%>
											<%--<td><a href="index.html">孙七</a></td>--%>
											<%--<td>2220001119998230</td>--%>
											<%--<td>男</td>--%>
											<%--<td>210103198001203322</td>--%>
											<%--<td>中国农业银行</td>--%>
											<%--<td>2017-01-01</td>--%>
											<%--<td>200000</td>--%>
											<%--<td>108000</td>--%>
											<%--<td>12000</td>--%>
										<%--</tr>--%>
										<%--<tr>--%>
											<%--<td><label> <input type="checkbox"> <span--%>
													<%--class="text"></span>--%>
											<%--</label></td>--%>
											<%--<td><a href="index.html">XD00001226</a></td>--%>
											<%--<td><a href="index.html">孙七</a></td>--%>
											<%--<td>2220001119998230</td>--%>
											<%--<td>男</td>--%>
											<%--<td>210103198001203322</td>--%>
											<%--<td>中国农业银行</td>--%>
											<%--<td>2017-01-01</td>--%>
											<%--<td>200000</td>--%>
											<%--<td>108000</td>--%>
											<%--<td>12000</td>--%>
										<%--</tr>--%>
										<%--<tr>--%>
											<%--<td><label> <input type="checkbox"> <span--%>
													<%--class="text"></span>--%>
											<%--</label></td>--%>
											<%--<td><a href="index.html">XD00001226</a></td>--%>
											<%--<td><a href="index.html">孙七</a></td>--%>
											<%--<td>2220001119998230</td>--%>
											<%--<td>男</td>--%>
											<%--<td>210103198001203322</td>--%>
											<%--<td>中国农业银行</td>--%>
											<%--<td>2017-01-01</td>--%>
											<%--<td>200000</td>--%>
											<%--<td>108000</td>--%>
											<%--<td>12000</td>--%>
										<%--</tr>--%>

									<%--</tbody>--%>
								<%--</table>--%>
							<%--</div>--%>
						<%--</div>--%>
					<%--</div>--%>
				<%--</div>--%>
			<%--</div>--%>
		<%--</div>--%>
		<div class="actions actions-footer" id="WiredWizard-actions" style="display:none">
			<div class="btn-group">
				<button id="pre" type="button" class="btn btn-default btn-sm btn-prev">
					<i class="fa fa-angle-left"></i>返回
				</button>
				<%--<button id="next" type="button" class="btn btn-default btn-sm btn-next"--%>
					<%--data-last="Finish">--%>
					<%--Next<i class="fa fa-angle-right"></i>--%>
				<%--</button>--%>
			</div>
		</div>
	</div>
</div>
<!-- /Page Body -->
<script
	src="${pageContext.request.contextPath}/jsp/pages/importLoans.js"></script>