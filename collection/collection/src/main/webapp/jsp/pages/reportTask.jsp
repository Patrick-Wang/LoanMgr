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
                        <li class="active">委案工作汇报</li>
                    </ul>
                </div>
                <!-- /Page Breadcrumb -->
                <!-- Page Header -->
                <div class="page-header position-relative">
                    <div class="header-title">
                        <h1>
                            委案信息查询与工作汇报
                        </h1>
                    </div>
                    <!--Header Buttons-->
                    <div class="header-buttons">
                        <a class="sidebar-toggler" href="#">
                            <i class="fa fa-arrows-h"></i>
                        </a>
                        <a class="refresh" id="refresh-toggler" href="index.htm">
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
                                <a href="javascript:void(0);" class="btn btn-default">汇报委案工作</a>
                                <a href="javascript:void(0);" class="btn btn-blue">咨询委案信息</a>
                                <a href="javascript:void(0);" class="btn btn-blue">拨打电话</a>
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
                    <div class="row">
                        <div class="col-lg-12 col-sm-12 col-xs-12">
                            <div class="well with-header">
                                <div class="btn-toolbar wysiwyg-toolbar" data-role="editor-toolbar" data-target="#editor">
                                    <div class="btn-group">
                                        <a class="btn btn-default dropdown-toggle" data-toggle="dropdown" title="Font"><i
                                                class="fa fa-font"></i><b class="caret"></b></a>
                                        <ul class="dropdown-menu"></ul>
                                    </div>
                                    <div class="btn-group">
                                        <a class="btn btn-default dropdown-toggle" data-toggle="dropdown" title="Font Size"><i
                                                class="fa fa-text-height"></i>&nbsp;<b class="caret"></b></a>
                                        <ul class="dropdown-menu dropdown-default">
                                            <li><a data-edit="fontSize 5"><font size="5">Huge</font></a></li>
                                            <li><a data-edit="fontSize 3"><font size="3">Normal</font></a></li>
                                            <li><a data-edit="fontSize 1"><font size="1">Small</font></a></li>
                                        </ul>
                                    </div>
                                    <div class="btn-group">
                                        <a class="btn btn-default" data-edit="bold" title="Bold (Ctrl/Cmd+B)"><i
                                                class="fa fa-bold"></i></a>
                                        <a class="btn btn-default" data-edit="italic" title="Italic (Ctrl/Cmd+I)"><i
                                                class="fa fa-italic"></i></a>
                                        <a class="btn btn-default" data-edit="strikethrough" title="Strikethrough"><i
                                                class="fa fa-strikethrough"></i></a>
                                        <a class="btn btn-default" data-edit="underline" title="Underline (Ctrl/Cmd+U)"><i
                                                class="fa fa-underline"></i></a>
                                    </div>
                                    <div class="btn-group">
                                        <a class="btn btn-default" data-edit="insertunorderedlist" title="Bullet list"><i
                                                class="fa fa-list-ul"></i></a>
                                        <a class="btn btn-default" data-edit="insertorderedlist" title="Number list"><i
                                                class="fa fa-list-ol"></i></a>
                                        <a class="btn btn-default" data-edit="outdent" title="Reduce indent (Shift+Tab)"><i
                                                class="fa fa-outdent"></i></a>
                                        <a class="btn btn-default" data-edit="indent" title="Indent (Tab)"><i
                                                class="fa fa-indent"></i></a>
                                    </div>
                                    <div class="btn-group">
                                        <a class="btn btn-default" data-edit="justifyleft"
                                           title="Align Left (Ctrl/Cmd+L)"><i class="fa fa-align-left"></i></a>
                                        <a class="btn btn-default" data-edit="justifycenter" title="Center (Ctrl/Cmd+E)"><i
                                                class="fa fa-align-center"></i></a>
                                        <a class="btn btn-default" data-edit="justifyright"
                                           title="Align Right (Ctrl/Cmd+R)"><i class="fa fa-align-right"></i></a>
                                        <a class="btn btn-default" data-edit="justifyfull" title="Justify (Ctrl/Cmd+J)"><i
                                                class="fa fa-align-justify"></i></a>
                                    </div>
                                    <div class="btn-group">
                                        <a class="btn btn-default dropdown-toggle" data-toggle="dropdown" title="Hyperlink"><i
                                                class="fa fa-link"></i></a>
                                        <div class="dropdown-menu dropdown-arrow">
                                            <div class="input-group">
                                                <input class="form-control" placeholder="URL" type="text"
                                                       data-edit="createLink">
                                                    <span class="input-group-btn">
                                                        <button class="btn btn-default" type="button">Add</button>
                                                    </span>
                                            </div>
                                        </div>
                                        <a class="btn btn-default" data-edit="unlink" title="Remove Hyperlink"><i
                                                class="fa fa-cut"></i></a>
                                    </div>

                                    <div class="btn-group">
                                        <a class="btn btn-default" title="Insert picture (or just drag & drop)"
                                           id="pictureBtn"><i class="fa fa-picture-o"></i></a>
                                        <input type="file" data-role="magic-overlay" data-target="#pictureBtn"
                                               data-edit="insertImage"/>
                                    </div>
                                    <div class="btn-group">
                                        <a class="btn btn-default" data-edit="undo" title="Undo (Ctrl/Cmd+Z)"><i
                                                class="fa fa-undo"></i></a>
                                        <a class="btn btn-default" data-edit="redo" title="Redo (Ctrl/Cmd+Y)"><i
                                                class="fa fa-repeat"></i></a>
                                    </div>
                                    <input type="text" data-edit="inserttext" class="wysiwyg-voiceBtn" id="voiceBtn"
                                           x-webkit-speech="">
                                </div>
                                <div class="wysiwyg-editor" id="editor"></div>
                            </div>
                        </div>
                    </div>

                    <div class="row">
                        <div class="col-lg-12 col-sm-12 col-xs-12">
                            <div class="well with-header">
                                <div class="header bordered-pink">
                                    <span class="file-input btn btn-azure btn-file">
                                    选择附件 <input type="file" multiple>
                                    </span>
                                </div>
                                <div class="row">
                                    <div class="col-lg-2 col-sm-2 col-xs-2">
                                        <div class="well bg-magenta bordered-left bordered-yellow">
                                            <h4 class="block">身份证扫描件.pdf</h4>
                                            <p>
                                                身份证扫描件.pdf
                                            </p>
                                        </div>
                                    </div>
                                    <div class="col-lg-3 col-sm-3 col-xs-3">
                                        <div class="well bg-magenta bordered-left bordered-yellow">
                                            <h4 class="block">身份证扫描件2.pdf</h4>
                                            <p>
                                                身份证扫描件2.pdf
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- /Page Body -->

<script
	src="${pageContext.request.contextPath}/jsp/pages/reportTask.js"></script>
