<%@ page language="java" contentType="text/html; charset=utf-8"
	pageEncoding="utf-8" session="false"%>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
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
<link rel="shortcut icon"
	href="${pageContext.request.contextPath}/jsp/assets/img/favicon.png"
	type="image/x-icon">
<!--Basic Scripts-->
<script
	src="${pageContext.request.contextPath}/jsp/assets/js/jquery.min.js"></script>

<!--Basic Styles-->
<link
	href="${pageContext.request.contextPath}/jsp/assets/css/bootstrap.min.css"
	rel="stylesheet" />
<link id="bootstrap-rtl-link" href="" rel="stylesheet" />
<link
	href="${pageContext.request.contextPath}/jsp/assets/css/font-awesome.min.css"
	rel="stylesheet" />

<!--Beyond styles-->
<link id="beyond-link"
	href="${pageContext.request.contextPath}/jsp/assets/css/beyond.min.css"
	rel="stylesheet" />
<link
	href="${pageContext.request.contextPath}/jsp/assets/css/demo.min.css"
	rel="stylesheet" />
<link
	href="${pageContext.request.contextPath}/jsp/assets/css/animate.min.css"
	rel="stylesheet" />
<link id="skin-link" href="" rel="stylesheet" type="text/css" />
<!-- jquery ui blue -->
<link rel="stylesheet" type="text/css" media="screen"
	href="${pageContext.request.contextPath}/jsp/jqgrid/themes/redmond/jquery-ui-custom.css">
<script
	src="${pageContext.request.contextPath}/jsp/jqgrid/js/jquery-ui-custom.min.js"
	type="text/javascript"></script>

<!-- jqgrid -->
<link rel="stylesheet" type="text/css" media="screen"
	href="${pageContext.request.contextPath}/jsp/jqgrid/themes/ui.jqgrid.css">
<link rel="stylesheet" type="text/css" media="screen"
	href="${pageContext.request.contextPath}/jsp/jqgrid/themes/ui.multiselect.css">
<script
	src="${pageContext.request.contextPath}/jsp/jqgrid/js/jquery.tablednd.js"
	type="text/javascript"></script>
<script
	src="${pageContext.request.contextPath}/jsp/jqgrid/js/jquery.contextmenu.js"
	type="text/javascript"></script>
<script
	src="${pageContext.request.contextPath}/jsp/jqgrid/js/i18n/grid.locale-cn.js"
	type="text/javascript"></script>
<script
	src="${pageContext.request.contextPath}/jsp/jqgrid/js/jquery.layout.js"
	type="text/javascript"></script>
<script
	src="${pageContext.request.contextPath}/jsp/jqgrid/js/jquery.jqGrid.js"
	type="text/javascript"></script>
<!-- jqgrid assist -->
<script src="${pageContext.request.contextPath}/jsp/jqgrid/jqassist.js"
	type="text/javascript"></script>
<!--Skin Script: Place this script in head to load scripts for skins and rtl support-->
<script
	src="${pageContext.request.contextPath}/jsp/assets/js/skins.min.js"></script>
</head>
<!--Head Ends-->
<!--Body-->
<body>


	<table align="center" style="margin-top: 70px;">
		<tr>
			<td><img
				src="${pageContext.request.contextPath}/jsp/assets/img/background.png"></img>
			</td>
			<td><div style="width: 80px;"></div></td>
			<td>
				<div class="login-container animated fadeInDown pull-right">
					<div class="loginbox bg-white">
						<div class="loginbox-title">登录</div>

						<div class="loginbox-or">
							<div class="or-line"></div>
							<div class="or"></div>
						</div>

						<br />
						<form:form action="${pageContext.request.contextPath}/login"
							method="post">
							<div class="loginbox-textbox">
								<input type="text" class="form-control" name="username"
									placeholder="用户名" />
							</div>
							<div class="loginbox-textbox">
								<input type="password" class="form-control" name="password"
									placeholder="密码" />
							</div>
							<c:if test="${param.error}">
								<div style="margin-left:160px;color:red;font-size:6px;">用户名或密码错误</div>
							</c:if>
							<div class="loginbox-submit">
								<input type="submit" class="btn btn-primary btn-block"
									value="登录" />
							</div>
						</form:form>
					</div>
					<div class="logobox text-align-center">
						<span class="darkgray">沈阳鑫久利商务代理服务有限公司</span>
					</div>
				</div>

			</td>
		</tr>
	</table>

	<script
		src="${pageContext.request.contextPath}/jsp/assets/js/bootstrap.min.js"></script>
	<script
		src="${pageContext.request.contextPath}/jsp/assets/js/slimscroll/jquery.slimscroll.min.js"></script>

	<!--Beyond Scripts-->
	<script
		src="${pageContext.request.contextPath}/jsp/assets/js/beyond.js"></script>


</body>
<!--Body Ends-->
</html>
