<%@ page language="java" contentType="text/html; charset=utf-8"
	pageEncoding="utf-8" session="false"%>

                <!-- Page Breadcrumb -->
                <div class="page-breadcrumbs">
                    <ul class="breadcrumb">
                        <li>
                            <i class="fa fa-home"></i>
                            <a href="#">主页</a>
                        </li>
                        <li>
                            <a href="#">委案管理</a>
                        </li>
                        <li class="active">委案信息查询和管理</li>
                    </ul>
                </div>
                <!-- /Page Breadcrumb -->
                <!-- Page Header -->
                <div class="page-header position-relative">
                    <div class="header-title">
                        <h1>
                            委案信息查询和管理
                        </h1>
                    </div>
                    <!--Header Buttons-->
                    <div class="header-buttons">
                        <a class="sidebar-toggler" href="#">
                            <i class="fa fa-arrows-h"></i>
                        </a>
                        <a class="refresh" id="refresh-toggler" href="indexOffice.htm">
                            <i class="glyphicon glyphicon-refresh"></i>
                        </a>
                        <a class="fullscreen" id="fullscreen-toggler" href="#">
                            <i class="glyphicon glyphicon-fullscreen"></i>
                        </a>
                    </div>
                    <!--Header Buttons End-->
                </div>
                <!-- /Page Header -->
                <!-- Page Body -->
                <div class="page-body">
                    <div class="row">
                        <div class="col-xs-12 col-md-8">
                            <div class="buttons-preview">
                                <a href="javascript:void(0);" class="btn btn-info">查询</a>
                            </div>
                        </div>
                        <div class="col-xs-12 col-md-4">
                            <div class="buttons-preview">
                                <a href="javascript:void(0);" class="btn btn-default">编辑委案信息</a>
                                <a href="javascript:void(0);" class="btn btn-primary">修改回款额</a>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-xs-12 col-md-12">
                                 <div class="table-scrollable">
                                    <table class="table table-striped table-bordered table-hover" id="expandabledatatable">
                                        <thead>
                                        <tr>
                                            <th>
                                                <label>
                                                    <input type="checkbox">
                                                    <span class="text"></span>
                                                </label>
                                            </th>
                                            <th>
                                                客户号
                                            </th>
                                            <th>
                                                客户姓名
                                            </th>
                                            <th>
                                                账户号
                                            </th>
                                            <th>
                                                性别
                                            </th>
                                            <th>
                                                身份证号
                                            </th>
                                            <th>
                                                放款机构
                                            </th>
                                            <th>
                                                放款时间
                                            </th>
                                            <th>
                                                提前结清金额
                                            </th>
                                            <th>
                                                剩余本金
                                            </th>
                                            <th>
                                                逾期利息
                                            </th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        <tr>
                                            <td>
                                                <label>
                                                    <input type="checkbox">
                                                    <span class="text"></span>
                                                </label>
                                            </td>
                                            <td>
                                                <a href="index.html">XD00001226</a>
                                            </td>
                                            <td>
                                                <a href="index.html">孙七</a>
                                            </td>
                                            <td>
                                                2220001119998230
                                            </td>
                                            <td>
                                                男
                                            </td>
                                            <td>
                                                210103198001203322
                                            </td>
                                            <td>
                                                中国农业银行
                                            </td>
                                            <td>
                                                2017-01-01
                                            </td>
                                            <td>
                                                200000
                                            </td>
                                            <td>
                                                108000
                                            </td>
                                            <td>
                                                12000
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <label>
                                                    <input type="checkbox">
                                                    <span class="text"></span>
                                                </label>
                                            </td>
                                            <td>
                                                <a href="index.html">XD00001226</a>
                                            </td>
                                            <td>
                                                <a href="index.html">孙七</a>
                                            </td>
                                            <td>
                                                2220001119998230
                                            </td>
                                            <td>
                                                男
                                            </td>
                                            <td>
                                                210103198001203322
                                            </td>
                                            <td>
                                                中国农业银行
                                            </td>
                                            <td>
                                                2017-01-01
                                            </td>
                                            <td>
                                                200000
                                            </td>
                                            <td>
                                                108000
                                            </td>
                                            <td>
                                                12000
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <label>
                                                    <input type="checkbox">
                                                    <span class="text"></span>
                                                </label>
                                            </td>
                                            <td>
                                                <a href="index.html">XD00001226</a>
                                            </td>
                                            <td>
                                                <a href="index.html">孙七</a>
                                            </td>
                                            <td>
                                                2220001119998230
                                            </td>
                                            <td>
                                                男
                                            </td>
                                            <td>
                                                210103198001203322
                                            </td>
                                            <td>
                                                中国农业银行
                                            </td>
                                            <td>
                                                2017-01-01
                                            </td>
                                            <td>
                                                200000
                                            </td>
                                            <td>
                                                108000
                                            </td>
                                            <td>
                                                12000
                                            </td>
                                        </tr>
                                        <tr class="odd gradeX">
                                            <td>
                                                <label>
                                                    <input type="checkbox">
                                                    <span class="text"></span>
                                                </label>
                                            </td>
                                            <td>
                                                <a href="index.html">XD00001226</a>
                                            </td>
                                            <td>
                                                <a href="index.html">孙七</a>
                                            </td>
                                            <td>
                                                2220001119998230
                                            </td>
                                            <td>
                                                男
                                            </td>
                                            <td>
                                                210103198001203322
                                            </td>
                                            <td>
                                                中国农业银行
                                            </td>
                                            <td>
                                                2017-01-01
                                            </td>
                                            <td>
                                                200000
                                            </td>
                                            <td>
                                                108000
                                            </td>
                                            <td>
                                                12000
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <label>
                                                    <input type="checkbox">
                                                    <span class="text"></span>
                                                </label>
                                            </td>
                                            <td>
                                                <a href="index.html">XD00001226</a>
                                            </td>
                                            <td>
                                                <a href="index.html">孙七</a>
                                            </td>
                                            <td>
                                                2220001119998230
                                            </td>
                                            <td>
                                                男
                                            </td>
                                            <td>
                                                210103198001203322
                                            </td>
                                            <td>
                                                中国农业银行
                                            </td>
                                            <td>
                                                2017-01-01
                                            </td>
                                            <td>
                                                200000
                                            </td>
                                            <td>
                                                108000
                                            </td>
                                            <td>
                                                12000
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <label>
                                                    <input type="checkbox">
                                                    <span class="text"></span>
                                                </label>
                                            </td>
                                            <td>
                                                <a href="index.html">XD00001226</a>
                                            </td>
                                            <td>
                                                <a href="index.html">孙七</a>
                                            </td>
                                            <td>
                                                2220001119998230
                                            </td>
                                            <td>
                                                男
                                            </td>
                                            <td>
                                                210103198001203322
                                            </td>
                                            <td>
                                                中国农业银行
                                            </td>
                                            <td>
                                                2017-01-01
                                            </td>
                                            <td>
                                                200000
                                            </td>
                                            <td>
                                                108000
                                            </td>
                                            <td>
                                                12000
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <label>
                                                    <input type="checkbox">
                                                    <span class="text"></span>
                                                </label>
                                            </td>
                                            <td>
                                                <a href="index.html">XD00001226</a>
                                            </td>
                                            <td>
                                                <a href="index.html">孙七</a>
                                            </td>
                                            <td>
                                                2220001119998230
                                            </td>
                                            <td>
                                                男
                                            </td>
                                            <td>
                                                210103198001203322
                                            </td>
                                            <td>
                                                中国农业银行
                                            </td>
                                            <td>
                                                2017-01-01
                                            </td>
                                            <td>
                                                200000
                                            </td>
                                            <td>
                                                108000
                                            </td>
                                            <td>
                                                12000
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <label>
                                                    <input type="checkbox">
                                                    <span class="text"></span>
                                                </label>
                                            </td>
                                            <td>
                                                <a href="index.html">XD00001226</a>
                                            </td>
                                            <td>
                                                <a href="index.html">孙七</a>
                                            </td>
                                            <td>
                                                2220001119998230
                                            </td>
                                            <td>
                                                男
                                            </td>
                                            <td>
                                                210103198001203322
                                            </td>
                                            <td>
                                                中国农业银行
                                            </td>
                                            <td>
                                                2017-01-01
                                            </td>
                                            <td>
                                                200000
                                            </td>
                                            <td>
                                                108000
                                            </td>
                                            <td>
                                                12000
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <label>
                                                    <input type="checkbox">
                                                    <span class="text"></span>
                                                </label>
                                            </td>
                                            <td>
                                                <a href="index.html">XD00001226</a>
                                            </td>
                                            <td>
                                                <a href="index.html">孙七</a>
                                            </td>
                                            <td>
                                                2220001119998230
                                            </td>
                                            <td>
                                                男
                                            </td>
                                            <td>
                                                210103198001203322
                                            </td>
                                            <td>
                                                中国农业银行
                                            </td>
                                            <td>
                                                2017-01-01
                                            </td>
                                            <td>
                                                200000
                                            </td>
                                            <td>
                                                108000
                                            </td>
                                            <td>
                                                12000
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <label>
                                                    <input type="checkbox">
                                                    <span class="text"></span>
                                                </label>
                                            </td>
                                            <td>
                                                <a href="index.html">XD00001226</a>
                                            </td>
                                            <td>
                                                <a href="index.html">孙七</a>
                                            </td>
                                            <td>
                                                2220001119998230
                                            </td>
                                            <td>
                                                男
                                            </td>
                                            <td>
                                                210103198001203322
                                            </td>
                                            <td>
                                                中国农业银行
                                            </td>
                                            <td>
                                                2017-01-01
                                            </td>
                                            <td>
                                                200000
                                            </td>
                                            <td>
                                                108000
                                            </td>
                                            <td>
                                                12000
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <label>
                                                    <input type="checkbox">
                                                    <span class="text"></span>
                                                </label>
                                            </td>
                                            <td>
                                                <a href="index.html">XD00001226</a>
                                            </td>
                                            <td>
                                                <a href="index.html">孙七</a>
                                            </td>
                                            <td>
                                                2220001119998230
                                            </td>
                                            <td>
                                                男
                                            </td>
                                            <td>
                                                210103198001203322
                                            </td>
                                            <td>
                                                中国农业银行
                                            </td>
                                            <td>
                                                2017-01-01
                                            </td>
                                            <td>
                                                200000
                                            </td>
                                            <td>
                                                108000
                                            </td>
                                            <td>
                                                12000
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <label>
                                                    <input type="checkbox">
                                                    <span class="text"></span>
                                                </label>
                                            </td>
                                            <td>
                                                <a href="index.html">XD00001226</a>
                                            </td>
                                            <td>
                                                <a href="index.html">孙七</a>
                                            </td>
                                            <td>
                                                2220001119998230
                                            </td>
                                            <td>
                                                男
                                            </td>
                                            <td>
                                                210103198001203322
                                            </td>
                                            <td>
                                                中国农业银行
                                            </td>
                                            <td>
                                                2017-01-01
                                            </td>
                                            <td>
                                                200000
                                            </td>
                                            <td>
                                                108000
                                            </td>
                                            <td>
                                                12000
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <label>
                                                    <input type="checkbox">
                                                    <span class="text"></span>
                                                </label>
                                            </td>
                                            <td>
                                                <a href="index.html">XD00001226</a>
                                            </td>
                                            <td>
                                                <a href="index.html">孙七</a>
                                            </td>
                                            <td>
                                                2220001119998230
                                            </td>
                                            <td>
                                                男
                                            </td>
                                            <td>
                                                210103198001203322
                                            </td>
                                            <td>
                                                中国农业银行
                                            </td>
                                            <td>
                                                2017-01-01
                                            </td>
                                            <td>
                                                200000
                                            </td>
                                            <td>
                                                108000
                                            </td>
                                            <td>
                                                12000
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <label>
                                                    <input type="checkbox">
                                                    <span class="text"></span>
                                                </label>
                                            </td>
                                            <td>
                                                <a href="index.html">XD00001226</a>
                                            </td>
                                            <td>
                                                <a href="index.html">孙七</a>
                                            </td>
                                            <td>
                                                2220001119998230
                                            </td>
                                            <td>
                                                男
                                            </td>
                                            <td>
                                                210103198001203322
                                            </td>
                                            <td>
                                                中国农业银行
                                            </td>
                                            <td>
                                                2017-01-01
                                            </td>
                                            <td>
                                                200000
                                            </td>
                                            <td>
                                                108000
                                            </td>
                                            <td>
                                                12000
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <label>
                                                    <input type="checkbox">
                                                    <span class="text"></span>
                                                </label>
                                            </td>
                                            <td>
                                                <a href="index.html">XD00001226</a>
                                            </td>
                                            <td>
                                                <a href="index.html">孙七</a>
                                            </td>
                                            <td>
                                                2220001119998230
                                            </td>
                                            <td>
                                                男
                                            </td>
                                            <td>
                                                210103198001203322
                                            </td>
                                            <td>
                                                中国农业银行
                                            </td>
                                            <td>
                                                2017-01-01
                                            </td>
                                            <td>
                                                200000
                                            </td>
                                            <td>
                                                108000
                                            </td>
                                            <td>
                                                12000
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <label>
                                                    <input type="checkbox">
                                                    <span class="text"></span>
                                                </label>
                                            </td>
                                            <td>
                                                <a href="index.html">XD00001226</a>
                                            </td>
                                            <td>
                                                <a href="index.html">孙七</a>
                                            </td>
                                            <td>
                                                2220001119998230
                                            </td>
                                            <td>
                                                男
                                            </td>
                                            <td>
                                                210103198001203322
                                            </td>
                                            <td>
                                                中国农业银行
                                            </td>
                                            <td>
                                                2017-01-01
                                            </td>
                                            <td>
                                                200000
                                            </td>
                                            <td>
                                                108000
                                            </td>
                                            <td>
                                                12000
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <label>
                                                    <input type="checkbox">
                                                    <span class="text"></span>
                                                </label>
                                            </td>
                                            <td>
                                                <a href="index.html">XD00001226</a>
                                            </td>
                                            <td>
                                                <a href="index.html">孙七</a>
                                            </td>
                                            <td>
                                                2220001119998230
                                            </td>
                                            <td>
                                                男
                                            </td>
                                            <td>
                                                210103198001203322
                                            </td>
                                            <td>
                                                中国农业银行
                                            </td>
                                            <td>
                                                2017-01-01
                                            </td>
                                            <td>
                                                200000
                                            </td>
                                            <td>
                                                108000
                                            </td>
                                            <td>
                                                12000
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <label>
                                                    <input type="checkbox">
                                                    <span class="text"></span>
                                                </label>
                                            </td>
                                            <td>
                                                <a href="index.html">XD00001226</a>
                                            </td>
                                            <td>
                                                <a href="index.html">孙七</a>
                                            </td>
                                            <td>
                                                2220001119998230
                                            </td>
                                            <td>
                                                男
                                            </td>
                                            <td>
                                                210103198001203322
                                            </td>
                                            <td>
                                                中国农业银行
                                            </td>
                                            <td>
                                                2017-01-01
                                            </td>
                                            <td>
                                                200000
                                            </td>
                                            <td>
                                                108000
                                            </td>
                                            <td>
                                                12000
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <label>
                                                    <input type="checkbox">
                                                    <span class="text"></span>
                                                </label>
                                            </td>
                                            <td>
                                                <a href="index.html">XD00001226</a>
                                            </td>
                                            <td>
                                                <a href="index.html">孙七</a>
                                            </td>
                                            <td>
                                                2220001119998230
                                            </td>
                                            <td>
                                                男
                                            </td>
                                            <td>
                                                210103198001203322
                                            </td>
                                            <td>
                                                中国农业银行
                                            </td>
                                            <td>
                                                2017-01-01
                                            </td>
                                            <td>
                                                200000
                                            </td>
                                            <td>
                                                108000
                                            </td>
                                            <td>
                                                12000
                                            </td>
                                        </tr>
                                        </tbody>
                                    </table>
                                </div>

                        </div>
                    </div>
                </div>
                <!-- /Page Body -->
<script src="${pageContext.request.contextPath}/jsp/pages/loansMgr.js"></script>
