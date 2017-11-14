<%@ page language="java" contentType="text/html; charset=utf-8"
	pageEncoding="utf-8" session="false"%>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<!DOCTYPE html>
<html lang="zh">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="shortcut icon"
	href="${pageContext.request.contextPath}/jsp/assets/img/favicon.png"
	type="image/x-icon">
    <title>贷款委案管理平台</title>
    <link rel="stylesheet" type="text/css" href="build/css/login_styles.css">
    <style>

        input:-webkit-autofill {
            -webkit-box-shadow: 0 0 0px 1000px white inset !important;
            -webkit-text-fill-color: #009688;
        }

    </style>
</head>
<body>

<div class="panel-lite">
    <div class="thumbur">
        <div class="icon-lock"></div>
    </div>
    <h4>贷款委案管理平台</h4>
    <form action="${pageContext.request.contextPath}/login"
							method="post">
	    <div class="form-group">
	        <input required="required" class="form-control" style="z-index: 0"/>
	        <label class="form-label">用户名 </label>
	    </div>
	    <div class="form-group">
	        <input type="password" required="required" class="form-control" style="z-index: 0"/>
	        <label class="form-label">密　码</label>
	    </div>
	    <a href="#" style="color:red">用户名或密码错误 </a>
	    <button class="floating-btn" onclick="login"><i class="icon-arrow"></i></button>
	</form>
</div>
<script type="text/javascript">
	function login(){
		document.getElementsByTagName("form")[0].submit();
	}
</script>
</body>
</html>