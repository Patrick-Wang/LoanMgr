<%@ page language="java" contentType="text/html; charset=utf-8"
	pageEncoding="utf-8" session="false"%>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>
<script src="${pageContext.request.contextPath}/jsp/react/react.js"></script>
<script src="${pageContext.request.contextPath}/jsp/react/react-dom.js"></script>
<script src="${pageContext.request.contextPath}/jsp/react/browser.min.js"></script>
<script src="${pageContext.request.contextPath}/jsp/sdk/root/route.js"></script>
<script
	src="${pageContext.request.contextPath}/jsp/authority/registry.js"></script>

<c:if test='${address.contains("/nav/tips/missed_call")}'>
	<script type="text/babel">
		<%@include file="/nav/tips/missed_call.js"%>
	</script>
</c:if>

<c:if test='${address.contains("/nav/tips/messages")}'>
	<script type="text/babel">
		<%@include file="/nav/tips/messages.js"%>
	</script>
</c:if>

<c:if test='${address.contains("/console/summary/owner")}'>
	<script>
		<%@include file="/console/summary/owner.js"%>
	</script>
</c:if>

<c:if test='${address.contains("/console/summary/assigner")}'>
	<script>
		<%@include file="/console/summary/assigner.js"%>
	</script>
</c:if>

<c:if test='${address.contains("/console/summary/manager")}'>
	<script>
		<%@include file="/console/summary/manager.js"%>
	</script>
</c:if>

<c:if test='${address.contains("/ec/edit/all")}'>
	<script>
		<%@include file="/ec/edit/all.js"%>function() {

		});
	</script>
</c:if>

<c:if test='${address.contains("/ec/edit/owner")}'>
	<script>
		<%@include file="/ec/edit/owner.js"%>
	</script>
</c:if>

<c:if test='${address.contains("/ec/import")}'>
	<script>
		<%@include file="/ec/import.js"%>
	</script>
</c:if>

<c:if test='${address.contains("/ec/ask")}'>
	<script>
		<%@include file="/ec/ask.js"%>
	</script>
</c:if>

<c:if test='${address.contains("/ec/answer")}'>
	<script>
		<%@include file="/ec/answer.js"%>
	</script>
</c:if>

<c:if test='${address.contains("/ec/assign")}'>
	<script>
		<%@include file="/ec/assign.js"%>
	</script>
</c:if>

<c:if test='${address.contains("/ec/backup")}'>
	<script>
		<%@include file="/ec/backup.js"%>
	</script>
</c:if>

<c:if test='${address.contains("/ec/export")}'>
	<script>
		<%@include file="/ec/export.js"%>
	</script>
</c:if>

<c:if test='${address.contains("/ec/report")}'>
	<script>
		<%@include file="/ec/report.js"%>
	</script>
</c:if>

<c:if test='${address.contains("/user/manager")}'>
	<script>
		<%@include file="/user/manager.js"%>
	</script>
</c:if>

<c:if test='${address.contains("/user/ec/assign")}'>
	<script>
		<%@include file="/user/ec/assign.js"%>
	</script>
</c:if>

<c:if test='${address.contains("/phone/call")}'>
	<script>
		<%@include file="/phone/call.js"%>
	</script>
</c:if>

