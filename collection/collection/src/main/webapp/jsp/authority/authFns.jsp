<%@ page language="java" contentType="text/html; charset=utf-8"
	pageEncoding="utf-8" session="false"%>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>
<script src="${pageContext.request.contextPath}/jsp/sdk/route/route.js"></script>
<script
	src="${pageContext.request.contextPath}/jsp/authority/registry.js"></script>

<c:if test='${address.contains("/nav/tips/missed_call")}'>

	<script
		src="${pageContext.request.contextPath}/jsp/authority/nav/tips/missed_call.js"></script>

</c:if>

<c:if test='${address.contains("/nav/tips/messages")}'>

	<script
		src="${pageContext.request.contextPath}/jsp/authority/nav/tips/messages.js"></script>
</c:if>

<c:if test='${address.contains("/console/summary/owner")}'>

	<script
		src="${pageContext.request.contextPath}/jsp/authority/console/summary/owner.js"></script>

</c:if>

<c:if test='${address.contains("/console/summary/assigner")}'>

	<script
		src="${pageContext.request.contextPath}/jsp/authority/console/summary/assigner.js"></script>

</c:if>

<c:if test='${address.contains("/console/summary/manager")}'>

	<script
		src="${pageContext.request.contextPath}/jsp/authority/console/summary/manager.js"></script>

</c:if>

<c:if test='${address.contains("/ec/edit/all")}'>

	<script
		src="${pageContext.request.contextPath}/jsp/authority/ec/edit/all.js"></script>

</c:if>

<c:if test='${address.contains("/ec/edit/owner")}'>

	<script
		src="${pageContext.request.contextPath}/jsp/authority/ec/edit/owner.js"></script>

</c:if>

<c:if test='${address.contains("/ec/import")}'>

	<script
		src="${pageContext.request.contextPath}/jsp/authority/ec/import.js"></script>

</c:if>

<c:if test='${address.contains("/ec/ask")}'>

	<script
		src="${pageContext.request.contextPath}/jsp/authority/ec/ask.js"></script>

</c:if>

<c:if test='${address.contains("/ec/answer")}'>
	<script
		src="${pageContext.request.contextPath}/jsp/authority/ec/answer.js"></script>
</c:if>
<c:if test='${address.contains("/ec/assign")}'>
	<script
		src="${pageContext.request.contextPath}/jsp/authority/ec/assign.js"></script>
</c:if>
<c:if test='${address.contains("/ec/backup")}'>
	<script
		src="${pageContext.request.contextPath}/jsp/authority/ec/backup.js"></script>
</c:if>
<c:if test='${address.contains("/ec/export")}'>
	<script
		src="${pageContext.request.contextPath}/jsp/authority/ec/export.js"></script>
</c:if>
<c:if test='${address.contains("/ec/report")}'>
	<script
		src="${pageContext.request.contextPath}/jsp/authority/ec/report.js"></script>
</c:if>
<c:if test='${address.contains("/user/manager")}'>
	<script
		src="${pageContext.request.contextPath}/jsp/authority/user/manager.js"></script>
</c:if>

<c:if test='${address.contains("/user/ec/assign")}'>
	<script
		src="${pageContext.request.contextPath}/jsp/authority/user/ec/assign.js"></script>
</c:if>

<c:if test='${address.contains("/phone/call")}'>
	<script
		src="${pageContext.request.contextPath}/jsp/authority/phone/call.js"></script>
</c:if>
<script>
	<c:forEach items="${address}" var="item">
	authority.call('${item}');
	</c:forEach>
</script>

