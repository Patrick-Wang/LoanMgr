<%@ page language="java" contentType="text/html; charset=utf-8"
	pageEncoding="utf-8" session="false"%>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>
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
<link rel="stylesheet"
	href="${pageContext.request.contextPath}/jsp/assets/mloading/jquery.mloading.css">
	
<script src="${pageContext.request.contextPath}/jsp/react/react.js"></script>
<script
	src="${pageContext.request.contextPath}/jsp/react/react-dom.min.js"></script>
<script
	src="${pageContext.request.contextPath}/jsp/react/react-dom-server.min.js"></script>

<!--Fonts-->
<!--  <link href="${pageContext.request.contextPath}/fonts.googleapis.com/css@family=open+sans_3a300italic,400italic,600italic,700italic,400,600,700,300.css"
          rel="stylesheet" type="text/css"> -->

<link rel="stylesheet"
	href="${pageContext.request.contextPath}/jsp/assets/jquery-pretty-radio-checkbox/css/jquery-labelauty.css">

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
<link
	href="${pageContext.request.contextPath}/jsp/assets/combobox/css/combo.select.css"
	rel="stylesheet" />
<link id="skin-link" href="" rel="stylesheet" type="text/css" />

<!--Page Related styles-->
<%--<link--%>
<%--href="${pageContext.request.contextPath}/jsp/assets/css/datatables.bootstrap.css"--%>
<%--rel="stylesheet" />--%>

	<script>
		var context  = {
			position : '${position}',
			userName : '${userName}',
			org : '${org}',
			pOrg : '${pOrg}',
			sipServerIP: '192.168.0.112:5066'
		}
	</script>

<!--Skin Script: Place this script in head to load scripts for skins and rtl support-->
<script
	src="${pageContext.request.contextPath}/jsp/assets/js/jquery.min.js"></script>
<script
	src="${pageContext.request.contextPath}/jsp/assets/js/skins.min.js"></script>
	
	<script>
	if(!readCookie("current-skin")){
		createCookie("current-skin", "${pageContext.request.contextPath}/jsp/assets/css/skins/black.min.css", 10);
		window.location.reload();
	}
	</script>
	
	
<script src="${pageContext.request.contextPath}/jsp/sdk/authority.js"></script>
<script src="${pageContext.request.contextPath}/jsp/pages/pages.js"></script>
<script src="${pageContext.request.contextPath}/jsp/sdk/protocol.js"></script>
<script src="${pageContext.request.contextPath}/jsp/sdk/net.js"></script>
<script src="${pageContext.request.contextPath}/jsp/sdk/account.js"></script>
<script
	src="${pageContext.request.contextPath}/jsp/sdk/entrustedCase.js"></script>
<script
	src="${pageContext.request.contextPath}/jsp/sdk/entrustedCaseManager.js"></script>
<script
	src="${pageContext.request.contextPath}/jsp/sdk/entrustedCaseReport.js"></script>
<script src="${pageContext.request.contextPath}/jsp/sdk/message.js"></script>
<script src="${pageContext.request.contextPath}/jsp/sdk/phone.js"></script>
<script
	src="${pageContext.request.contextPath}/jsp/assets/jquery-pretty-radio-checkbox/js/jquery-labelauty.js"></script>
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
<script src="${pageContext.request.contextPath}/jsp/jqgrid/jqassist.js"
	type="text/javascript"></script>
<link rel="stylesheet" type="text/css" media="screen"
	href="${pageContext.request.contextPath}/jsp/jqgrid/themes/redmond/jquery-ui-custom.css">
<script
	src="${pageContext.request.contextPath}/jsp/jqgrid/js/jquery-ui-custom.min.js"
	type="text/javascript"></script>
	<script
	src="${pageContext.request.contextPath}/jsp/assets/mloading/jquery.mloading.js"></script>
	<!--Basic Scripts-->
	
		<script src="${pageContext.request.contextPath}/jsp/assets/js/toastr/toastr.js"></script>
		<script
	src="${pageContext.request.contextPath}/jsp/assets/js/bootstrap.min.js"></script>
<script
	src="${pageContext.request.contextPath}/jsp/assets/js/slimscroll/jquery.slimscroll.min.js"></script>


    <!--Page Related Scripts-->
    <script src="${pageContext.request.contextPath}/jsp/assets/js/fuelux/wizard/wizard-custom.js"></script>
<script src="${pageContext.request.contextPath}/jsp/assets/js/dropzone/dropzone.js"></script>
	<script src="${pageContext.request.contextPath}/jsp/assets/js/bootbox/bootbox.js"></script>
	<script src="${pageContext.request.contextPath}/jsp/assets/js/inputmask/jasny-bootstrap.min.js"></script>
	<script src="${pageContext.request.contextPath}/jsp/sdk/route/route.js"></script>
	<script src="${pageContext.request.contextPath}/jsp/assets/combobox/js/jquery.combo.select.js"></script>
<script
	src="${pageContext.request.contextPath}/jsp/assets/js/bootbox/bootbox.js"></script>
	<script>
		collection.protocol.carLoanTitle = JSON.parse('${carLoanTitle}');
		collection.protocol.creditLoanTitle = JSON.parse('${creditLoanTitle}');
		collection.protocol.creditCardTitle = JSON.parse('${creditCardTitle}');
	</script>
<style>



.ui-widget {
	font-family: Microsoft YaHei UI;
	font-size: 1.1em;
	font-color:black;
}
.ui-widget-content{
	border-left-width:0px;
	border-right-width:0px;
}
.ui-jqgrid .ui-pg-selbox{
	padding:0;
}


.ui-widget input, .ui-widget select, .ui-widget textarea, .ui-widget button
	{
	font-family: Microsoft YaHei UI;
	font-size: 1em;
}
/* Corner radius */
.ui-corner-all, .ui-corner-top, .ui-corner-left, .ui-corner-tl {
	-moz-border-radius-topleft: 0px;
	-webkit-border-top-left-radius: 0px;
	-khtml-border-top-left-radius: 0px;
	border-top-left-radius: 0px;
}

.ui-corner-all, .ui-corner-top, .ui-corner-right, .ui-corner-tr {
	-moz-border-radius-topright: 0px;
	-webkit-border-top-right-radius: 0px;
	-khtml-border-top-right-radius: 0px;
	border-top-right-radius: 0px;
}

.ui-corner-all, .ui-corner-bottom, .ui-corner-left, .ui-corner-bl {
	-moz-border-radius-bottomleft: 0px;
	-webkit-border-bottom-left-radius: 0px;
	-khtml-border-bottom-left-radius: 0px;
	border-bottom-left-radius: 0px;
}

.ui-corner-all, .ui-corner-bottom, .ui-corner-right, .ui-corner-br {
	-moz-border-radius-bottomright: 0px;
	-webkit-border-bottom-right-radius: 0px;
	-khtml-border-bottom-right-radius: 0px;
	border-bottom-right-radius: 0px;
}

.ui-jqgrid tr.jqgrow td {
	font-weight: normal;
	overflow: hidden;
	white-space: pre;
	height: 28px;
	padding: 0 2px 0 2px;
	border-bottom-width: 1px;
	border-bottom-color: inherit;
	border-bottom-style: solid;
}
	.ui-jqgrid tr.jqgrow td:last-child {
	border-right-width: 0px;
}

.ui-th-ltr, .ui-jqgrid .ui-jqgrid-htable th.ui-th-ltr:last-child {
	border-right-width: 0px;
}

.ui-jqgrid tr.jqgrow:last-child td {
	border-bottom-width: 0px;
}

.ui-jqgrid input[type=checkbox]{
	opacity: 100;
	position: inherit;
	left:0px;
	width: 15px;
	height: 18px;
	cursor: pointer;
	margin:0;
	}

.ui-state-default, .ui-widget-content .ui-state-default,
	.ui-widget-header .ui-state-default {
	border: 1px solid #eee;/* #c5dbec; */
	font-weight: normal;
	background: #eee;/* //rgb(79, 173, 194); */
	color: black;
}

.ui-state-hover, .ui-widget-content .ui-state-hover, .ui-widget-header .ui-state-hover,
	.ui-state-focus, .ui-widget-content .ui-state-focus, .ui-widget-header .ui-state-focus
	{
	border: 1px solid #a6c9e2;
	background: none;
	font-weight: normal;
	color: black;
}


.ui-state-highlight, .ui-widget-content .ui-state-highlight, .ui-widget-header .ui-state-highlight{
	border: 1px solid  #a6c9e2 ;
	background: none;
	border-left-width:0px;
	border-right-width:0px;
}

.ui-jqgrid-htable .ui-state-hover {
	border: 1px solid #eee/* #c5dbec */;
	font-weight: normal;
	color: black;
}
.ui-widget-content .ui-state-hover{
	border-left-width:0px;
	border-right-width:0px;
}

.ui-jqgrid-htable  .ui-state-hover{
	border-right-width:1px;
}

.ui-jqgrid .ui-pg-table td{
	padding:0;
}

.ui-jqgrid .ui-state-disabled:hover{
	padding:0;
}


.ui-pg-table .ui-state-hover{
	border:0px;
}


.ui-jqgrid .ui-jqgrid-htable th {
    height: 30px;
    padding: 4px 2px 0 2px;
    font-weight:bold;
    font-size:12px;
}


</style>
</head>
<body>
<div style="width:0px;height:0px">
	<object id="softPhone" classid="clsid:D62393A3-B447-4603-B56D-521CE6DDDABE" style="width:0px;height:0px"></object>
</div>
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
				<div id="consolePage">
					<%@include file="pages/console.jsp"%>
				</div>
				<c:if test='${address.contains("/ec/import")}'>
					<div id="importLoansPage" style="display: none">
						<%@include file="pages/importLoans.jsp"%>
					</div>
				</c:if>
				<div id="assignLoansPage" style="display: none">
					<%@include file="pages/assignLoans.jsp"%>
				</div>
				<div id="loansMgrPage" style="display: none">
					<%@include file="pages/loansMgr.jsp"%>
				</div>
				<div id="loansDetailPage" style="display: none">
					<%@include file="pages/loansDetail.jsp"%>
				</div>
				<c:if test='${address.contains("/phone/call")}'>
					<div id="callCenterPage" style="display: none">
						<%@include file="pages/callCenter.jsp"%>
					</div>
				</c:if>
				<c:if
					test='${address.contains("/user/manager") || address.contains("/user/ec/assign")}'>
					<div id="userMgrPage" style="display: none">
						<%@include file="pages/userMgr.jsp"%>
					</div>
				</c:if>
				
				<div id="backupPage" style="display: none">
					<%@include file="pages/backup.jsp"%>
				</div>
				<div id="rearangeOfficePage" style="display: none">
					<%@include file="pages/rearangeOffice.jsp"%>
				</div>
				<div id="askSthPage" style="display: none">
					<%@include file="pages/askSth.jsp"%>
				</div>

			</div>
			<!-- /Page Content -->
		</div>
		<!-- /Page Container -->

	</div>
	<!-- Main Container -->
</body>

	

	<%@include file="authority/authFns.jsp"%>

	<%@include file="basicScript.jsp"%>

	<script>
	$(".fullscreen").remove();
	InitiateSimpleDataTable.init();
	InitiateEditableDataTable.init();
	InitiateExpandableDataTable.init();
	InitiateSearchableDataTable.init();
	</script>
</html>

