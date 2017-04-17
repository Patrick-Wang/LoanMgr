<%@ page language="java" contentType="text/html; charset=utf-8"
	pageEncoding="utf-8" session="false"%>

<!-- Page Breadcrumb -->
<div class="page-breadcrumbs">
	<ul class="breadcrumb">
		<li><i class="fa fa-home"></i> <a href="#">主页</a></li>
		<li class="active">我的工作台</li>
	</ul>
</div>
<!-- /Page Breadcrumb -->
<!-- Page Header -->
<div class="page-header position-relative">
	<div class="header-title">
		<h1>我的工作台</h1>
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
		<div class="col-md-12">
			<div class="profile-container">
				<div class="profile-header row">
					<div class="col-lg-2 col-md-4 col-sm-12 text-center">
						<img
							src="${pageContext.request.contextPath}/jsp/assets/img/avatars/adam-jansen.jpg"
							alt="" class="header-avatar" />
					</div>
					<div class="col-lg-5 col-md-8 col-sm-12 profile-info">
						<div class="header-fullname">石鑫</div>
						<div class="header-information">
							管理层石鑫，主要负责系统的整体把控，监督和督促内勤及业务人员工作，隶属于 沈阳鑫久利商务代理服务有限公司。</div>
					</div>
					<div class="col-lg-5 col-md-12 col-sm-12 col-xs-12 profile-stats">
						<div id="console-status" class="row">
							<div class="col-lg-4 col-md-4 col-sm-4 col-xs-12 stats-col">
								<div class="stats-value pink">--</div>
								<div class="stats-title">--</div>
							</div>
							<div class="col-lg-4 col-md-4 col-sm-4 col-xs-12 stats-col">
								<div class="stats-value pink">--</div>
								<div class="stats-title">--</div>
							</div>
							<div class="col-lg-4 col-md-4 col-sm-4 col-xs-12 stats-col">
								<div class="stats-value pink">--</div>
								<div class="stats-title">--</div>
							</div>
						</div>
						<div class="row">
							<div class="col-lg-4 col-md-4 col-sm-4 col-xs-4 inlinestats-col">
								<i class="glyphicon glyphicon-map-marker"></i> 沈阳总公司
							</div>
							<div class="col-lg-4 col-md-4 col-sm-4 col-xs-4 inlinestats-col">
								综合完成率: <strong>95%</strong>
							</div>
							<div class="col-lg-4 col-md-4 col-sm-4 col-xs-4 inlinestats-col">
								部门： <strong>总经理</strong>
							</div>
						</div>
					</div>
				</div>
				<div class="profile-body">
					<div class="col-lg-12">
						<div class="tabbable">
							<ul class="nav nav-tabs tabs-flat  nav-justified" id="myTab11">
								<li class="active"><a data-toggle="tab" href="#allLoans">
										全部委案 </a></li>
								<li class="tab-red"><a data-toggle="tab"
									href="#notAssigned"> 未分配委案 </a></li>
								<li class="tab-palegreen"><a data-toggle="tab"
									id="contacttab" href="#notRepliedMsg"> 未处理咨询 </a></li>
								<li class="tab-yellow"><a data-toggle="tab"
									href="#settings"> 设置 </a></li>
							</ul>
							<div class="tab-content tabs-flat">
								<div id="allLoans" class="tab-pane active">
									<div class="row">
										<div class="col-xs-12 col-md-12">
											<div class="widget">
												<div class="widget-header ">
													<span class="widget-caption">全部委案</span>
													<div class="widget-buttons">
														<a href="#" data-toggle="maximize"> <i
															class="fa fa-expand"></i>
														</a> <a href="#" data-toggle="collapse"> <i
															class="fa fa-minus"></i>
														</a> <a href="#" data-toggle="dispose"> <i
															class="fa fa-times"></i>
														</a>
													</div>
												</div>
												<div class="widget-body">
													<table
														class="table table-striped table-bordered table-hover"
														id="simpledatatable">
														<thead>
															<tr>
																<th><label> <input type="checkbox">
																		<span class="text"></span>
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
																<td><label> <input type="checkbox">
																		<span class="text"></span>
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
																<td><label> <input type="checkbox">
																		<span class="text"></span>
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
																<td><label> <input type="checkbox">
																		<span class="text"></span>
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
																<td><label> <input type="checkbox">
																		<span class="text"></span>
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
																<td><label> <input type="checkbox">
																		<span class="text"></span>
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
																<td><label> <input type="checkbox">
																		<span class="text"></span>
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
																<td><label> <input type="checkbox">
																		<span class="text"></span>
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
																<td><label> <input type="checkbox">
																		<span class="text"></span>
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
																<td><label> <input type="checkbox">
																		<span class="text"></span>
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
																<td><label> <input type="checkbox">
																		<span class="text"></span>
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
																<td><label> <input type="checkbox">
																		<span class="text"></span>
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
																<td><label> <input type="checkbox">
																		<span class="text"></span>
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
																<td><label> <input type="checkbox">
																		<span class="text"></span>
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
																<td><label> <input type="checkbox">
																		<span class="text"></span>
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
																<td><label> <input type="checkbox">
																		<span class="text"></span>
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
																<td><label> <input type="checkbox">
																		<span class="text"></span>
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
																<td><label> <input type="checkbox">
																		<span class="text"></span>
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
																<td><label> <input type="checkbox">
																		<span class="text"></span>
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
																<td><label> <input type="checkbox">
																		<span class="text"></span>
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
								<div id="notAssigned" class="tab-pane">
									<div class="row">
										<div class="col-xs-12 col-md-12">
											<div class="widget">
												<div class="widget-header ">
													<span class="widget-caption">全部委案</span>
													<div class="widget-buttons">
														<a href="#" data-toggle="maximize"> <i
															class="fa fa-expand"></i>
														</a> <a href="#" data-toggle="collapse"> <i
															class="fa fa-minus"></i>
														</a> <a href="#" data-toggle="dispose"> <i
															class="fa fa-times"></i>
														</a>
													</div>
												</div>
												<div class="widget-body">
													<table class="table table-striped table-hover"
														id="simpledatatable">
														<thead>
															<tr>
																<th><label> <input type="checkbox">
																		<span class="text"></span>
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
																<td><label> <input type="checkbox">
																		<span class="text"></span>
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
																<td><label> <input type="checkbox">
																		<span class="text"></span>
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
																<td><label> <input type="checkbox">
																		<span class="text"></span>
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
																<td><label> <input type="checkbox">
																		<span class="text"></span>
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
																<td><label> <input type="checkbox">
																		<span class="text"></span>
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
																<td><label> <input type="checkbox">
																		<span class="text"></span>
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
																<td><label> <input type="checkbox">
																		<span class="text"></span>
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
																<td><label> <input type="checkbox">
																		<span class="text"></span>
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
																<td><label> <input type="checkbox">
																		<span class="text"></span>
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
																<td><label> <input type="checkbox">
																		<span class="text"></span>
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
																<td><label> <input type="checkbox">
																		<span class="text"></span>
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
																<td><label> <input type="checkbox">
																		<span class="text"></span>
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
																<td><label> <input type="checkbox">
																		<span class="text"></span>
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
																<td><label> <input type="checkbox">
																		<span class="text"></span>
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
																<td><label> <input type="checkbox">
																		<span class="text"></span>
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
																<td><label> <input type="checkbox">
																		<span class="text"></span>
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
																<td><label> <input type="checkbox">
																		<span class="text"></span>
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
																<td><label> <input type="checkbox">
																		<span class="text"></span>
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
																<td><label> <input type="checkbox">
																		<span class="text"></span>
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
								<div id="notRepliedMsg" class="tab-pane">
									<div class="row">
										<div class="col-xs-12 col-md-12">
											<div class="widget">
												<div class="widget-header ">
													<span class="widget-caption">全部委案</span>
													<div class="widget-buttons">
														<a href="#" data-toggle="maximize"> <i
															class="fa fa-expand"></i>
														</a> <a href="#" data-toggle="collapse"> <i
															class="fa fa-minus"></i>
														</a> <a href="#" data-toggle="dispose"> <i
															class="fa fa-times"></i>
														</a>
													</div>
												</div>
												<div class="widget-body">
													<table class="table table-striped table-hover"
														id="simpledatatable">
														<thead>
															<tr>
																<th><label> <input type="checkbox">
																		<span class="text"></span>
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
																<td><label> <input type="checkbox">
																		<span class="text"></span>
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
																<td><label> <input type="checkbox">
																		<span class="text"></span>
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
																<td><label> <input type="checkbox">
																		<span class="text"></span>
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
																<td><label> <input type="checkbox">
																		<span class="text"></span>
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
																<td><label> <input type="checkbox">
																		<span class="text"></span>
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
																<td><label> <input type="checkbox">
																		<span class="text"></span>
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
																<td><label> <input type="checkbox">
																		<span class="text"></span>
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
																<td><label> <input type="checkbox">
																		<span class="text"></span>
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
																<td><label> <input type="checkbox">
																		<span class="text"></span>
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
																<td><label> <input type="checkbox">
																		<span class="text"></span>
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
																<td><label> <input type="checkbox">
																		<span class="text"></span>
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
																<td><label> <input type="checkbox">
																		<span class="text"></span>
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
																<td><label> <input type="checkbox">
																		<span class="text"></span>
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
																<td><label> <input type="checkbox">
																		<span class="text"></span>
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
																<td><label> <input type="checkbox">
																		<span class="text"></span>
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
																<td><label> <input type="checkbox">
																		<span class="text"></span>
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
																<td><label> <input type="checkbox">
																		<span class="text"></span>
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
																<td><label> <input type="checkbox">
																		<span class="text"></span>
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
																<td><label> <input type="checkbox">
																		<span class="text"></span>
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
								<div id="settings" class="tab-pane">
									<form role="form">
										<div class="form-title">Personal Information</div>
										<div class="row">
											<div class="col-sm-6">
												<div class="form-group">
													<span class="input-icon icon-right"> <input
														type="text" class="form-control" placeholder="Name">
														<i class="fa fa-user blue"></i>
													</span>
												</div>
											</div>
											<div class="col-sm-6">
												<div class="form-group">
													<span class="input-icon icon-right"> <input
														type="text" class="form-control" placeholder="Family">
														<i class="fa fa-user orange"></i>
													</span>
												</div>
											</div>
										</div>
										<div class="row">
											<div class="col-sm-6">
												<div class="form-group">
													<span class="input-icon icon-right"> <input
														type="text" class="form-control" placeholder="Phone">
														<i class="glyphicon glyphicon-earphone yellow"></i>
													</span>
												</div>
											</div>
											<div class="col-sm-6">
												<div class="form-group">
													<span class="input-icon icon-right"> <input
														type="text" class="form-control" placeholder="Mobile">
														<i class="glyphicon glyphicon-phone palegreen"></i>
													</span>
												</div>
											</div>
										</div>
										<hr class="wide">
										<div class="row">
											<div class="col-sm-6">
												<div class="form-group">
													<span class="input-icon icon-right"> <input
														class="form-control date-picker" id="id-date-picker-1"
														type="text" data-date-format="dd-mm-yyyy"
														placeholder="Birth Date"> <i
														class="fa fa-calendar"></i>
													</span>
												</div>
											</div>
											<div class="col-sm-6">
												<div class="form-group">
													<span class="input-icon icon-right"> <input
														type="text" class="form-control" placeholder="Birth Place">
														<i class="fa fa-globe"></i>
													</span>
												</div>
											</div>
										</div>
										<div class="form-title">Social Networks</div>
										<div class="row">
											<div class="col-sm-6">
												<div class="form-group">
													<span class="input-icon icon-right"> <input
														type="text" class="form-control" placeholder="Facebook">
														<i class="fa fa-facebook purple"></i>
													</span>
												</div>
											</div>
											<div class="col-sm-6">
												<div class="form-group">
													<span class="input-icon icon-right"> <input
														type="text" class="form-control" placeholder="Twitter">
														<i class="fa fa-twitter azure"></i>
													</span>
												</div>
											</div>
										</div>
										<div class="row">
											<div class="col-sm-6">
												<div class="form-group">
													<span class="input-icon icon-right"> <input
														type="text" class="form-control" placeholder="Pinterest">
														<i class="fa fa-pinterest red"></i>
													</span>
												</div>
											</div>
											<div class="col-sm-6">
												<div class="form-group">
													<span class="input-icon icon-right"> <input
														type="text" class="form-control" placeholder="Flickr">
														<i class="fa fa-flickr blue"></i>
													</span>
												</div>
											</div>
										</div>
										<div class="form-title">Contact Information</div>
										<div class="row">
											<div class="col-sm-6">
												<div class="form-group">
													<span class="input-icon icon-right"> <input
														type="text" class="form-control" placeholder="Address 1">
													</span>
												</div>
											</div>
											<div class="col-sm-6">
												<div class="form-group">
													<span class="input-icon icon-right"> <input
														type="text" class="form-control" placeholder="Address 1">
													</span>
												</div>
											</div>
										</div>
										<button type="submit" class="btn btn-primary">Save
											Profile</button>
									</form>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>
<!-- /Page Body -->

<script
	src="${pageContext.request.contextPath}/jsp/pages/console.js"></script>
