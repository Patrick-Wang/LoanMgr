<%@ page language="java" contentType="text/html; charset=utf-8"
	pageEncoding="utf-8" session="false"%>
<!-- Page Breadcrumb -->
<div class="page-breadcrumbs">
	<ul class="breadcrumb">
		<li><i class="fa fa-home"></i> <a href="#">主页</a></li>
		<li><a href="#">委案管理</a></li>
		<li class="active">分配委案</li>
	</ul>
</div>
<!-- /Page Breadcrumb -->
<!-- Page Header -->
<div class="page-header position-relative">
	<div class="header-title">
		<h1>分配委案</h1>
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
		<div id="WiredWizard" class="wizard wizard-wired"
			data-target="#WiredWizardsteps">
			<ul class="steps">
				<li data-target="#wiredstep1" class="active"><span class="step">1</span><span
					class="title">选择委案</span><span class="chevron"></span></li>
				<li data-target="#wiredstep2"><span class="step">2</span><span
					class="title">选择业务员</span> <span class="chevron"></span></li>
				<li data-target="#wiredstep3"><span class="step">3</span><span
					class="title">确认分配信息</span> <span class="chevron"></span></li>
			</ul>
		</div>
		<div class="step-content" id="WiredWizardsteps">
			<div class="step-pane active" id="wiredstep1">
				<div class="row pricing-container">
					<div class="row">
						<div class="col-xs-12 col-md-12">
							<div class="buttons-preview">
								<a href="javascript:void(0);" class="btn btn-info">查询</a>
							</div>
						</div>
					</div>
					<div class="row">
						<div class="col-xs-12 col-md-12">
							<div class="table-scrollable">
								<table class="table table-striped table-bordered table-hover"
									id="simpledatatable">
									<thead>
										<tr>
											<th><label> <input type="checkbox"> <span
													class="text"></span>
											</label></th>
											<th>客户号</th>
											<th>客户姓名</th>
											<th>账户号</th>
											<th>性别</th>
											<th>身份证号</th>
											<th>放款机构</th>
											<th>放款时间</th>
											<th>提前结清金额</th>
											<th>剩余本金</th>
											<th>逾期利息</th>
										</tr>
									</thead>
									<tbody>
										<tr>
											<td><label> <input type="checkbox"> <span
													class="text"></span>
											</label></td>
											<td><a href="index.html">XD00001226</a></td>
											<td><a href="index.html">孙七</a></td>
											<td>2220001119998230</td>
											<td>男</td>
											<td>210103198001203322</td>
											<td>中国农业银行</td>
											<td>2017-01-01</td>
											<td>200000</td>
											<td>108000</td>
											<td>12000</td>
										</tr>
										<tr>
											<td><label> <input type="checkbox"> <span
													class="text"></span>
											</label></td>
											<td><a href="index.html">XD00001226</a></td>
											<td><a href="index.html">孙七</a></td>
											<td>2220001119998230</td>
											<td>男</td>
											<td>210103198001203322</td>
											<td>中国农业银行</td>
											<td>2017-01-01</td>
											<td>200000</td>
											<td>108000</td>
											<td>12000</td>
										</tr>
										<tr>
											<td><label> <input type="checkbox"> <span
													class="text"></span>
											</label></td>
											<td><a href="index.html">XD00001226</a></td>
											<td><a href="index.html">孙七</a></td>
											<td>2220001119998230</td>
											<td>男</td>
											<td>210103198001203322</td>
											<td>中国农业银行</td>
											<td>2017-01-01</td>
											<td>200000</td>
											<td>108000</td>
											<td>12000</td>
										</tr>
										<tr class="odd gradeX">
											<td><label> <input type="checkbox"> <span
													class="text"></span>
											</label></td>
											<td><a href="index.html">XD00001226</a></td>
											<td><a href="index.html">孙七</a></td>
											<td>2220001119998230</td>
											<td>男</td>
											<td>210103198001203322</td>
											<td>中国农业银行</td>
											<td>2017-01-01</td>
											<td>200000</td>
											<td>108000</td>
											<td>12000</td>
										</tr>
										<tr>
											<td><label> <input type="checkbox"> <span
													class="text"></span>
											</label></td>
											<td><a href="index.html">XD00001226</a></td>
											<td><a href="index.html">孙七</a></td>
											<td>2220001119998230</td>
											<td>男</td>
											<td>210103198001203322</td>
											<td>中国农业银行</td>
											<td>2017-01-01</td>
											<td>200000</td>
											<td>108000</td>
											<td>12000</td>
										</tr>
										<tr>
											<td><label> <input type="checkbox"> <span
													class="text"></span>
											</label></td>
											<td><a href="index.html">XD00001226</a></td>
											<td><a href="index.html">孙七</a></td>
											<td>2220001119998230</td>
											<td>男</td>
											<td>210103198001203322</td>
											<td>中国农业银行</td>
											<td>2017-01-01</td>
											<td>200000</td>
											<td>108000</td>
											<td>12000</td>
										</tr>
										<tr>
											<td><label> <input type="checkbox"> <span
													class="text"></span>
											</label></td>
											<td><a href="index.html">XD00001226</a></td>
											<td><a href="index.html">孙七</a></td>
											<td>2220001119998230</td>
											<td>男</td>
											<td>210103198001203322</td>
											<td>中国农业银行</td>
											<td>2017-01-01</td>
											<td>200000</td>
											<td>108000</td>
											<td>12000</td>
										</tr>
										<tr>
											<td><label> <input type="checkbox"> <span
													class="text"></span>
											</label></td>
											<td><a href="index.html">XD00001226</a></td>
											<td><a href="index.html">孙七</a></td>
											<td>2220001119998230</td>
											<td>男</td>
											<td>210103198001203322</td>
											<td>中国农业银行</td>
											<td>2017-01-01</td>
											<td>200000</td>
											<td>108000</td>
											<td>12000</td>
										</tr>
										<tr>
											<td><label> <input type="checkbox"> <span
													class="text"></span>
											</label></td>
											<td><a href="index.html">XD00001226</a></td>
											<td><a href="index.html">孙七</a></td>
											<td>2220001119998230</td>
											<td>男</td>
											<td>210103198001203322</td>
											<td>中国农业银行</td>
											<td>2017-01-01</td>
											<td>200000</td>
											<td>108000</td>
											<td>12000</td>
										</tr>
										<tr>
											<td><label> <input type="checkbox"> <span
													class="text"></span>
											</label></td>
											<td><a href="index.html">XD00001226</a></td>
											<td><a href="index.html">孙七</a></td>
											<td>2220001119998230</td>
											<td>男</td>
											<td>210103198001203322</td>
											<td>中国农业银行</td>
											<td>2017-01-01</td>
											<td>200000</td>
											<td>108000</td>
											<td>12000</td>
										</tr>
										<tr>
											<td><label> <input type="checkbox"> <span
													class="text"></span>
											</label></td>
											<td><a href="index.html">XD00001226</a></td>
											<td><a href="index.html">孙七</a></td>
											<td>2220001119998230</td>
											<td>男</td>
											<td>210103198001203322</td>
											<td>中国农业银行</td>
											<td>2017-01-01</td>
											<td>200000</td>
											<td>108000</td>
											<td>12000</td>
										</tr>
										<tr>
											<td><label> <input type="checkbox"> <span
													class="text"></span>
											</label></td>
											<td><a href="index.html">XD00001226</a></td>
											<td><a href="index.html">孙七</a></td>
											<td>2220001119998230</td>
											<td>男</td>
											<td>210103198001203322</td>
											<td>中国农业银行</td>
											<td>2017-01-01</td>
											<td>200000</td>
											<td>108000</td>
											<td>12000</td>
										</tr>
										<tr>
											<td><label> <input type="checkbox"> <span
													class="text"></span>
											</label></td>
											<td><a href="index.html">XD00001226</a></td>
											<td><a href="index.html">孙七</a></td>
											<td>2220001119998230</td>
											<td>男</td>
											<td>210103198001203322</td>
											<td>中国农业银行</td>
											<td>2017-01-01</td>
											<td>200000</td>
											<td>108000</td>
											<td>12000</td>
										</tr>
										<tr>
											<td><label> <input type="checkbox"> <span
													class="text"></span>
											</label></td>
											<td><a href="index.html">XD00001226</a></td>
											<td><a href="index.html">孙七</a></td>
											<td>2220001119998230</td>
											<td>男</td>
											<td>210103198001203322</td>
											<td>中国农业银行</td>
											<td>2017-01-01</td>
											<td>200000</td>
											<td>108000</td>
											<td>12000</td>
										</tr>
										<tr>
											<td><label> <input type="checkbox"> <span
													class="text"></span>
											</label></td>
											<td><a href="index.html">XD00001226</a></td>
											<td><a href="index.html">孙七</a></td>
											<td>2220001119998230</td>
											<td>男</td>
											<td>210103198001203322</td>
											<td>中国农业银行</td>
											<td>2017-01-01</td>
											<td>200000</td>
											<td>108000</td>
											<td>12000</td>
										</tr>
										<tr>
											<td><label> <input type="checkbox"> <span
													class="text"></span>
											</label></td>
											<td><a href="index.html">XD00001226</a></td>
											<td><a href="index.html">孙七</a></td>
											<td>2220001119998230</td>
											<td>男</td>
											<td>210103198001203322</td>
											<td>中国农业银行</td>
											<td>2017-01-01</td>
											<td>200000</td>
											<td>108000</td>
											<td>12000</td>
										</tr>
										<tr>
											<td><label> <input type="checkbox"> <span
													class="text"></span>
											</label></td>
											<td><a href="index.html">XD00001226</a></td>
											<td><a href="index.html">孙七</a></td>
											<td>2220001119998230</td>
											<td>男</td>
											<td>210103198001203322</td>
											<td>中国农业银行</td>
											<td>2017-01-01</td>
											<td>200000</td>
											<td>108000</td>
											<td>12000</td>
										</tr>
										<tr>
											<td><label> <input type="checkbox"> <span
													class="text"></span>
											</label></td>
											<td><a href="index.html">XD00001226</a></td>
											<td><a href="index.html">孙七</a></td>
											<td>2220001119998230</td>
											<td>男</td>
											<td>210103198001203322</td>
											<td>中国农业银行</td>
											<td>2017-01-01</td>
											<td>200000</td>
											<td>108000</td>
											<td>12000</td>
										</tr>
										<tr>
											<td><label> <input type="checkbox"> <span
													class="text"></span>
											</label></td>
											<td><a href="index.html">XD00001226</a></td>
											<td><a href="index.html">孙七</a></td>
											<td>2220001119998230</td>
											<td>男</td>
											<td>210103198001203322</td>
											<td>中国农业银行</td>
											<td>2017-01-01</td>
											<td>200000</td>
											<td>108000</td>
											<td>12000</td>
										</tr>
									</tbody>
								</table>
							</div>

						</div>
					</div>
				</div>
			</div>
			<div class="step-pane" id="wiredstep2">
				<div class="row">
					<div class="col-lg-12 col-sm-12 col-xs-12">
						<div class="widget flat radius-bordered">
							<div class="widget-header bg-blue">
								<span class="widget-caption">组织人员列表</span>
							</div>

							<div class="widget-body">
								<div id="MyTree2" class="tree tree-plus-minus">
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
			<div class="step-pane" id="wiredstep3">
				<div class="row">
					<div class="col-xs-12 col-md-12">
						<div class="alert alert-info fade in">
							<i class="fa-fw fa fa-info"></i> <strong>请确认！</strong> 共计将如下 28
							条委案分配给 业务一部 业务员 张三。
						</div>
					</div>
				</div>
				<div class="row">
					<div class="col-xs-12 col-md-12">
						<div class="table-scrollable">
							<table class="table table-striped table-bordered table-hover"
								id="expandabledatatable">
								<thead>
									<tr>
										<th><label> <input type="checkbox"> <span
												class="text"></span>
										</label></th>
										<th>客户号</th>
										<th>客户姓名</th>
										<th>账户号</th>
										<th>性别</th>
										<th>身份证号</th>
										<th>放款机构</th>
										<th>放款时间</th>
										<th>提前结清金额</th>
										<th>剩余本金</th>
										<th>逾期利息</th>
									</tr>
								</thead>
								<tbody>
									<tr>
										<td><label> <input type="checkbox"> <span
												class="text"></span>
										</label></td>
										<td><a href="index.html">XD00001226</a></td>
										<td><a href="index.html">孙七</a></td>
										<td>2220001119998230</td>
										<td>男</td>
										<td>210103198001203322</td>
										<td>中国农业银行</td>
										<td>2017-01-01</td>
										<td>200000</td>
										<td>108000</td>
										<td>12000</td>
									</tr>
									<tr>
										<td><label> <input type="checkbox"> <span
												class="text"></span>
										</label></td>
										<td><a href="index.html">XD00001226</a></td>
										<td><a href="index.html">孙七</a></td>
										<td>2220001119998230</td>
										<td>男</td>
										<td>210103198001203322</td>
										<td>中国农业银行</td>
										<td>2017-01-01</td>
										<td>200000</td>
										<td>108000</td>
										<td>12000</td>
									</tr>
									<tr>
										<td><label> <input type="checkbox"> <span
												class="text"></span>
										</label></td>
										<td><a href="index.html">XD00001226</a></td>
										<td><a href="index.html">孙七</a></td>
										<td>2220001119998230</td>
										<td>男</td>
										<td>210103198001203322</td>
										<td>中国农业银行</td>
										<td>2017-01-01</td>
										<td>200000</td>
										<td>108000</td>
										<td>12000</td>
									</tr>
									<tr class="odd gradeX">
										<td><label> <input type="checkbox"> <span
												class="text"></span>
										</label></td>
										<td><a href="index.html">XD00001226</a></td>
										<td><a href="index.html">孙七</a></td>
										<td>2220001119998230</td>
										<td>男</td>
										<td>210103198001203322</td>
										<td>中国农业银行</td>
										<td>2017-01-01</td>
										<td>200000</td>
										<td>108000</td>
										<td>12000</td>
									</tr>
									<tr>
										<td><label> <input type="checkbox"> <span
												class="text"></span>
										</label></td>
										<td><a href="index.html">XD00001226</a></td>
										<td><a href="index.html">孙七</a></td>
										<td>2220001119998230</td>
										<td>男</td>
										<td>210103198001203322</td>
										<td>中国农业银行</td>
										<td>2017-01-01</td>
										<td>200000</td>
										<td>108000</td>
										<td>12000</td>
									</tr>
									<tr>
										<td><label> <input type="checkbox"> <span
												class="text"></span>
										</label></td>
										<td><a href="index.html">XD00001226</a></td>
										<td><a href="index.html">孙七</a></td>
										<td>2220001119998230</td>
										<td>男</td>
										<td>210103198001203322</td>
										<td>中国农业银行</td>
										<td>2017-01-01</td>
										<td>200000</td>
										<td>108000</td>
										<td>12000</td>
									</tr>
									<tr>
										<td><label> <input type="checkbox"> <span
												class="text"></span>
										</label></td>
										<td><a href="index.html">XD00001226</a></td>
										<td><a href="index.html">孙七</a></td>
										<td>2220001119998230</td>
										<td>男</td>
										<td>210103198001203322</td>
										<td>中国农业银行</td>
										<td>2017-01-01</td>
										<td>200000</td>
										<td>108000</td>
										<td>12000</td>
									</tr>
									<tr>
										<td><label> <input type="checkbox"> <span
												class="text"></span>
										</label></td>
										<td><a href="index.html">XD00001226</a></td>
										<td><a href="index.html">孙七</a></td>
										<td>2220001119998230</td>
										<td>男</td>
										<td>210103198001203322</td>
										<td>中国农业银行</td>
										<td>2017-01-01</td>
										<td>200000</td>
										<td>108000</td>
										<td>12000</td>
									</tr>
									<tr>
										<td><label> <input type="checkbox"> <span
												class="text"></span>
										</label></td>
										<td><a href="index.html">XD00001226</a></td>
										<td><a href="index.html">孙七</a></td>
										<td>2220001119998230</td>
										<td>男</td>
										<td>210103198001203322</td>
										<td>中国农业银行</td>
										<td>2017-01-01</td>
										<td>200000</td>
										<td>108000</td>
										<td>12000</td>
									</tr>
									<tr>
										<td><label> <input type="checkbox"> <span
												class="text"></span>
										</label></td>
										<td><a href="index.html">XD00001226</a></td>
										<td><a href="index.html">孙七</a></td>
										<td>2220001119998230</td>
										<td>男</td>
										<td>210103198001203322</td>
										<td>中国农业银行</td>
										<td>2017-01-01</td>
										<td>200000</td>
										<td>108000</td>
										<td>12000</td>
									</tr>
									<tr>
										<td><label> <input type="checkbox"> <span
												class="text"></span>
										</label></td>
										<td><a href="index.html">XD00001226</a></td>
										<td><a href="index.html">孙七</a></td>
										<td>2220001119998230</td>
										<td>男</td>
										<td>210103198001203322</td>
										<td>中国农业银行</td>
										<td>2017-01-01</td>
										<td>200000</td>
										<td>108000</td>
										<td>12000</td>
									</tr>
									<tr>
										<td><label> <input type="checkbox"> <span
												class="text"></span>
										</label></td>
										<td><a href="index.html">XD00001226</a></td>
										<td><a href="index.html">孙七</a></td>
										<td>2220001119998230</td>
										<td>男</td>
										<td>210103198001203322</td>
										<td>中国农业银行</td>
										<td>2017-01-01</td>
										<td>200000</td>
										<td>108000</td>
										<td>12000</td>
									</tr>
									<tr>
										<td><label> <input type="checkbox"> <span
												class="text"></span>
										</label></td>
										<td><a href="index.html">XD00001226</a></td>
										<td><a href="index.html">孙七</a></td>
										<td>2220001119998230</td>
										<td>男</td>
										<td>210103198001203322</td>
										<td>中国农业银行</td>
										<td>2017-01-01</td>
										<td>200000</td>
										<td>108000</td>
										<td>12000</td>
									</tr>
									<tr>
										<td><label> <input type="checkbox"> <span
												class="text"></span>
										</label></td>
										<td><a href="index.html">XD00001226</a></td>
										<td><a href="index.html">孙七</a></td>
										<td>2220001119998230</td>
										<td>男</td>
										<td>210103198001203322</td>
										<td>中国农业银行</td>
										<td>2017-01-01</td>
										<td>200000</td>
										<td>108000</td>
										<td>12000</td>
									</tr>
									<tr>
										<td><label> <input type="checkbox"> <span
												class="text"></span>
										</label></td>
										<td><a href="index.html">XD00001226</a></td>
										<td><a href="index.html">孙七</a></td>
										<td>2220001119998230</td>
										<td>男</td>
										<td>210103198001203322</td>
										<td>中国农业银行</td>
										<td>2017-01-01</td>
										<td>200000</td>
										<td>108000</td>
										<td>12000</td>
									</tr>
									<tr>
										<td><label> <input type="checkbox"> <span
												class="text"></span>
										</label></td>
										<td><a href="index.html">XD00001226</a></td>
										<td><a href="index.html">孙七</a></td>
										<td>2220001119998230</td>
										<td>男</td>
										<td>210103198001203322</td>
										<td>中国农业银行</td>
										<td>2017-01-01</td>
										<td>200000</td>
										<td>108000</td>
										<td>12000</td>
									</tr>
									<tr>
										<td><label> <input type="checkbox"> <span
												class="text"></span>
										</label></td>
										<td><a href="index.html">XD00001226</a></td>
										<td><a href="index.html">孙七</a></td>
										<td>2220001119998230</td>
										<td>男</td>
										<td>210103198001203322</td>
										<td>中国农业银行</td>
										<td>2017-01-01</td>
										<td>200000</td>
										<td>108000</td>
										<td>12000</td>
									</tr>
									<tr>
										<td><label> <input type="checkbox"> <span
												class="text"></span>
										</label></td>
										<td><a href="index.html">XD00001226</a></td>
										<td><a href="index.html">孙七</a></td>
										<td>2220001119998230</td>
										<td>男</td>
										<td>210103198001203322</td>
										<td>中国农业银行</td>
										<td>2017-01-01</td>
										<td>200000</td>
										<td>108000</td>
										<td>12000</td>
									</tr>
									<tr>
										<td><label> <input type="checkbox"> <span
												class="text"></span>
										</label></td>
										<td><a href="index.html">XD00001226</a></td>
										<td><a href="index.html">孙七</a></td>
										<td>2220001119998230</td>
										<td>男</td>
										<td>210103198001203322</td>
										<td>中国农业银行</td>
										<td>2017-01-01</td>
										<td>200000</td>
										<td>108000</td>
										<td>12000</td>
									</tr>
								</tbody>
							</table>
						</div>

					</div>
				</div>
			</div>
		</div>
		<div class="actions actions-footer" id="WiredWizard-actions">
			<div class="btn-group">
				<button type="button" class="btn btn-default btn-sm btn-prev">
					<i class="fa fa-angle-left"></i>Prev
				</button>
				<button type="button" class="btn btn-default btn-sm btn-next"
					data-last="Finish">
					Next<i class="fa fa-angle-right"></i>
				</button>
			</div>
		</div>
	</div>
</div>
<!-- /Page Body -->
<script
	src="${pageContext.request.contextPath}/jsp/pages/assignLoans.js"></script>