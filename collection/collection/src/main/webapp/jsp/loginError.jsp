<%@ page language="java" contentType="text/html; charset=utf-8"
    pageEncoding="utf-8" session="false"%>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<!DOCTYPE html>
<!--
BeyondAdmin - Responsive Admin Dashboard Template build with Twitter Bootstrap 3.3.6
Version: 1.6.0
Purchase: https://wrapbootstrap.com/theme/beyondadmin-adminapp-angularjs-mvc-WB06R48S4
-->

<html xmlns="http://www.w3.org/1999/xhtml">
<!--Head-->
<head>
    <meta charset="utf-8" />
    <title>贷款委案管理平台</title>

    <meta name="description" content="login page" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <link rel="shortcut icon" href="${pageContext.request.contextPath}/jsp/assets/img/favicon.png" type="image/x-icon">

    <!--Basic Styles-->
    <link href="${pageContext.request.contextPath}/jsp/assets/css/bootstrap.min.css" rel="stylesheet" />
    <link id="bootstrap-rtl-link" href="" rel="stylesheet" />
    <link href="${pageContext.request.contextPath}/jsp/assets/css/font-awesome.min.css" rel="stylesheet" />

    <!--Fonts-->
    <link href="../fonts.googleapis.com/css@family=open+sans_3a300italic,400italic,600italic,700italic,400,600,700,300.css" rel="stylesheet" type="text/css">

    <!--Beyond styles-->
    <link id="beyond-link" href="${pageContext.request.contextPath}/jsp/assets/css/beyond.min.css" rel="stylesheet" />
    <link href="${pageContext.request.contextPath}/jsp/assets/css/demo.min.css" rel="stylesheet" />
    <link href="${pageContext.request.contextPath}/jsp/assets/css/animate.min.css" rel="stylesheet" />
    <link id="skin-link" href="" rel="stylesheet" type="text/css" />

    <!--Skin Script: Place this script in head to load scripts for skins and rtl support-->
    <script src="${pageContext.request.contextPath}/jsp/assets/js/skins.min.js"></script>
</head>
<!--Head Ends-->
<!--Body-->
<body>
    <div class="login-container animated fadeInDown">
        <div class="loginbox bg-white">
            <div class="loginbox-title">登录</div>

            <div class="loginbox-or">
                <div class="or-line"></div>
                <div class="or"></div>
            </div>

            <br/>
			<form:form action="${pageContext.request.contextPath}/login" method="post">
				<div class="loginbox-textbox">
                	<input type="text" class="form-control" name="username" placeholder="用户名" />
            	</div>
				<div class="loginbox-textbox">
                	<input type="password" class="form-control"  name="password" placeholder="密码" />
            	</div>
            	 <div style="margin-left:160px;color:red;font-size:6px;">用户名或密码错误</div>
            	<div class="loginbox-submit">
					<input type="submit" class="btn btn-primary btn-block" value="登录"/>
				</div>
			</form:form>
        </div>
        <div class="logobox">
        </div>
    </div>

    <!--Basic Scripts-->
    <script src="${pageContext.request.contextPath}/jsp/assets/js/jquery.min.js"></script>
    <script src="${pageContext.request.contextPath}/jsp/assets/js/bootstrap.min.js"></script>
    <script src="${pageContext.request.contextPath}/jsp/assets/js/slimscroll/jquery.slimscroll.min.js"></script>

    <!--Beyond Scripts-->
    <script src="${pageContext.request.contextPath}/jsp/assets/js/beyond.js"></script>

    
</body>
<!--Body Ends-->
</html>
