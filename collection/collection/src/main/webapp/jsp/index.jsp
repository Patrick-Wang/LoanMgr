<%@ page language="java" contentType="text/html; charset=utf-8"
	pageEncoding="utf-8" session="false"%>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form"%>
<!DOCTYPE html>
<!--
BeyondAdmin - Responsive Admin Dashboard Template build with Twitter Bootstrap 3.3.6
Version: 1.6.0
Purchase: https://wrapbootstrap.com/theme/beyondadmin-adminapp-angularjs-mvc-WB06R48S4
-->
<html xmlns="http://www.w3.org/1999/xhtml">

<!-- Head -->
<head>
<meta charset="utf-8" />
<title>贷款委案管理平台</title>

<meta name="description" content="index page" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<meta http-equiv="X-UA-Compatible" content="IE=edge" />
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<link rel="shortcut icon"
	href="${pageContext.request.contextPath}/jsp/assets/img/favicon.png"
	type="image/x-icon">

<!--Basic Styles-->
<link
	href="${pageContext.request.contextPath}/jsp/assets/css/bootstrap.min.css"
	rel="stylesheet" />
<link id="bootstrap-rtl-link" href="" rel="stylesheet" />
<link
	href="${pageContext.request.contextPath}/jsp/assets/css/font-awesome.min.css"
	rel="stylesheet" />
<link
	href="${pageContext.request.contextPath}/jsp/assets/css/weather-icons.min.css"
	rel="stylesheet" />


<!--Fonts-->
<!--  <link href="../fonts.googleapis.com/css@family=open+sans_3a300italic,400italic,600italic,700italic,400,600,700,300.css"
          rel="stylesheet" type="text/css"> -->

<!--Beyond styles-->
<link
	href="${pageContext.request.contextPath}/jsp/assets/css/beyond.min.css"
	rel="stylesheet" />
<link
	href="${pageContext.request.contextPath}/jsp/assets/css/demo.min.css"
	rel="stylesheet" />
<link
	href="${pageContext.request.contextPath}/jsp/assets/css/typicons.min.css"
	rel="stylesheet" />
<link
	href="${pageContext.request.contextPath}/jsp/assets/css/animate.min.css"
	rel="stylesheet" />
<link id="skin-link" href="" rel="stylesheet" type="text/css" />

<!--Page Related styles-->
<link
	href="${pageContext.request.contextPath}/jsp/assets/css/datatables.bootstrap.css"
	rel="stylesheet" />

<!--Skin Script: Place this script in head to load scripts for skins and rtl support-->
<script
	src="${pageContext.request.contextPath}/jsp/assets/js/jquery.min.js"></script>
<script
	src="${pageContext.request.contextPath}/jsp/assets/js/skins.min.js"></script>
<script src="${pageContext.request.contextPath}/jsp/pages/pages.js"></script>
<script src="${pageContext.request.contextPath}/jsp/sdk/protocol.js"></script>
<script src="${pageContext.request.contextPath}/jsp/sdk/net.js"></script>
<script src="${pageContext.request.contextPath}/jsp/sdk/account.js"></script>
<script src="${pageContext.request.contextPath}/jsp/sdk/authority.js"></script>
<script src="${pageContext.request.contextPath}/jsp/sdk/entrustedCase.js"></script>
<script src="${pageContext.request.contextPath}/jsp/sdk/entrustedCaseManager.js"></script>
<script src="${pageContext.request.contextPath}/jsp/sdk/entrustedCaseReport.js"></script>
<script src="${pageContext.request.contextPath}/jsp/sdk/message.js"></script>

</head>
<body>
	<!-- Loading Container -->
	<div class="loading-container">
		<div class="loader"></div>
	</div>
	<!--  /Loading Container -->

	<!-- Navbar -->
	<%@include file="navbar.jsp"%>
	<!-- /Navbar -->
	
	<!-- Main Container -->
	<div class="main-container container-fluid">
		<!-- Page Container -->
		<div class="page-container">
			<%@include file="pageSidebar.jsp"%>

			<!-- Page Content -->
			<div class="page-content">
				<%-- <div id="consolePage">
					<%@include file="pages/console.jsp"%>
				</div>
				<div id="importLoansPage" style="display: none">
					<%@include file="pages/importLoans.jsp"%>
				</div>--%>
				<div id="assignLoansPage" style="display: none">
					<%@include file="pages/assignLoans.jsp"%>
				</div> 
				<div id="loansMgrPage" style="display: none">
					<%@include file="pages/loansMgr.jsp"%>
				</div>
				<%--<div id="exportLoansPage" style="display: none">
					<%@include file="pages/exportLoans.jsp"%>
				</div>
				<div id="callCenterPage" style="display: none">
					<%@include file="pages/callCenter.jsp"%>
				</div>
				<div id="userMgrPage" style="display: none">
					<%@include file="pages/userMgr.jsp"%>
				</div>
				<div id="propertyMgrPage" style="display: none">
					<%@include file="pages/propertyMgr.jsp"%>
				</div>
				<div id="backupPage" style="display: none">
					<%@include file="pages/backup.jsp"%>
				</div>
				<div id="rearangeOfficePage" style="display: none">
					<%@include file="pages/rearangeOffice.jsp"%>
				</div>
				<div id="rearangeBussinessPage" style="display: none">
					<%@include file="pages/rearangeBussiness.jsp"%>
				</div>
				<div id="askSthPage" style="display: none">
					<%@include file="pages/askSth.jsp"%>
				</div>
				<div id="reportTaskPage" style="display: none">
					<%@include file="pages/reportTask.jsp"%>
				</div>  --%>
			</div>
			<!-- /Page Content -->
		</div>
		<!-- /Page Container -->

	</div>
	<!-- Main Container -->
</body>

<!--Basic Scripts-->
	<%@include file="basicScript.jsp"%>
</html>

