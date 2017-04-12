package com.bank.debt.controller.servlet.entrustedcase;

import java.io.IOException;
import java.io.UnsupportedEncodingException;
import java.util.List;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.commons.CommonsMultipartFile;

import com.bank.debt.protocol.entity.EntrustedCaseManageInfo;
import com.bank.debt.protocol.entity.EntrustedCaseReport;
import com.bank.debt.protocol.entity.Result;
import com.bank.debt.protocol.error.ErrorCode;
import com.bank.debt.protocol.tools.Checking;
import com.bank.debt.protocol.tools.JsonUtil;
import com.bank.debt.protocol.tools.map.MappingFailedException;
import com.bank.debt.protocol.type.EntrustedCaseType;
import com.bank.debt.service.ecmanager.ECManagerService;
import com.bank.debt.service.ecmanager.ECManagerServiceImpl;
import com.bank.debt.service.ecreport.ECReportService;
import com.bank.debt.service.ecreport.ECReportServiceImpl;
import com.bank.debt.service.entrustedcase.EntrustedCaseService;
import com.bank.debt.service.entrustedcase.EntrustedCaseServiceImpl;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

@Controller
@RequestMapping(value = "entrusted_case")
public class EntrustedCaseServlet {

	@Resource(name=ECReportServiceImpl.NAME)
	ECReportService eCReportService;

	@Resource(name=ECManagerServiceImpl.NAME)
	ECManagerService eCManagerService;

	@Resource(name=EntrustedCaseServiceImpl.NAME)
	EntrustedCaseService entrustedCaseService;

	@RequestMapping(value = "import.do")
	public @ResponseBody byte[] add(
			HttpServletRequest request,
			HttpServletResponse response, 
			@RequestParam("type") Integer type,
			@RequestParam("file") CommonsMultipartFile file) throws UnsupportedEncodingException {
		UserDetails userDetails = (UserDetails) SecurityContextHolder.getContext()
			    .getAuthentication()
			    .getPrincipal();
		String owner = userDetails.getUsername();
		Result r = ErrorCode.EC_IMPORTED_FAILED;
		if (Checking.isExist(type) && file != null){
			switch(type){
			case EntrustedCaseType.CAR_LOAN:
				r = entrustedCaseService.importCarLoan(owner, type, file);
				break;
			case EntrustedCaseType.CREDIT_CARD:
				r = entrustedCaseService.importCreditCard(owner, type, file);
				break;
			case EntrustedCaseType.CREDIT_LOAN:
				r = entrustedCaseService.importCreditLoan(owner, type, file);
				break;
			}
		}
		return r.toUtf8Json();
	}
	
	@RequestMapping(value = "search.do")
	public @ResponseBody byte[] search(HttpServletRequest request,
			HttpServletResponse response, 
			@RequestParam("type") Integer type,
			@RequestParam("query") String query) throws UnsupportedEncodingException {
		UserDetails userDetails = (UserDetails) SecurityContextHolder.getContext()
			    .getAuthentication()
			    .getPrincipal();
		String userName = userDetails.getUsername();
		JSONArray result = null;
		JSONObject queryParam = JSONObject.fromObject(query);
		switch(type){
		case EntrustedCaseType.CAR_LOAN:
			result = entrustedCaseService.searchCarLoan(userName, queryParam);
			break;
		case EntrustedCaseType.CREDIT_CARD:
			result = entrustedCaseService.searchCreditCard(userName, queryParam);
			break;
		case EntrustedCaseType.CREDIT_LOAN:
			result = entrustedCaseService.searchCreditLoan(userName, queryParam);
			break;
		}		
		return result.toString().getBytes("utf-8");
	}
	
	@RequestMapping(value = "download.do")
	public void download(HttpServletRequest request,
			HttpServletResponse response, 
			@RequestParam("type") Integer type,
			@RequestParam("query") String query) throws IOException {
		UserDetails userDetails = (UserDetails) SecurityContextHolder.getContext()
			    .getAuthentication()
			    .getPrincipal();
		String usr = userDetails.getUsername();
		JSONObject queryParam = JSONObject.fromObject(query);

		switch(type){
		case EntrustedCaseType.CAR_LOAN:
			entrustedCaseService.getDownloadCarLoan(usr, queryParam, response.getOutputStream());
			break;
		case EntrustedCaseType.CREDIT_CARD:
			entrustedCaseService.getDownloadCreditCard(usr, queryParam, response.getOutputStream());
			break;
		case EntrustedCaseType.CREDIT_LOAN:
			entrustedCaseService.getDownloadCreditLoan(usr, queryParam, response.getOutputStream());
			break;
		}
	}
	
	@RequestMapping(value = "update.do")
	public @ResponseBody byte[] upload(HttpServletRequest request,
			HttpServletResponse response, 
			@RequestParam("type") Integer type, 
			@RequestParam("data") String data) throws IOException {
		Result r = ErrorCode.EC_UPDATE_FAILED;
		UserDetails userDetails = (UserDetails) SecurityContextHolder.getContext()
			    .getAuthentication()
			    .getPrincipal();
		String userName = userDetails.getUsername();
		JSONArray jdata = JSONArray.fromObject(data);
		switch(type){
		case EntrustedCaseType.CAR_LOAN:
			r = entrustedCaseService.updateCarLoan(userName, jdata);
			break;
		case EntrustedCaseType.CREDIT_CARD:
			r = entrustedCaseService.updateCreditCard(userName, jdata);
			break;
		case EntrustedCaseType.CREDIT_LOAN:
			r = entrustedCaseService.updateCreditLoan(userName, jdata);
			break;
		}
		

		return r.toUtf8Json();
	}
	
	@RequestMapping(value = "manager/search.do")
	public @ResponseBody byte[] managerSearch(HttpServletRequest request,
			HttpServletResponse response) throws UnsupportedEncodingException {
		UserDetails userDetails = (UserDetails) SecurityContextHolder.getContext()
			    .getAuthentication()
			    .getPrincipal();
		String userName = userDetails.getUsername();
		List<EntrustedCaseManageInfo> ecmis = eCManagerService.getManageInfos(userName);
		return JsonUtil.toUtf8Json(ecmis);
	}
	
	@RequestMapping(value = "manager/update.do")
	public @ResponseBody byte[] managerUpdate(HttpServletRequest request,
			HttpServletResponse response, 
			@RequestParam("data") String data) throws UnsupportedEncodingException {
		UserDetails userDetails = (UserDetails) SecurityContextHolder.getContext()
			    .getAuthentication()
			    .getPrincipal();
		String userName = userDetails.getUsername();
		List<EntrustedCaseManageInfo> ecmis = JsonUtil.toObjects(JSONArray.fromObject(data), EntrustedCaseManageInfo.class);
		Result r = eCManagerService.updateManageInfo(userName, ecmis);
		return r.toUtf8Json();
	}
	
	@RequestMapping(value = "report/submit.do")
	public @ResponseBody byte[] reportSubmit(
			HttpServletRequest request,
			HttpServletResponse response,
			@RequestParam("report") String report,
			@RequestParam("attachements") CommonsMultipartFile[] attachements) throws IOException {
		UserDetails userDetails = (UserDetails) SecurityContextHolder.getContext()
			    .getAuthentication()
			    .getPrincipal();
		String userName = userDetails.getUsername();
		Result r = ErrorCode.ECR_SUBMIT_FAILED;
		EntrustedCaseReport ecr = (EntrustedCaseReport) JsonUtil.toObject(JSONObject.fromObject(report), EntrustedCaseReport.class);
		if (Checking.isExist(ecr.getId())){
			r = eCReportService.updateReport(userName, ecr, attachements);
		}else if (Checking.isExist(ecr.getEntrustedCaseId())){
			r = eCReportService.createReport(userName, ecr, attachements);
		}
		return r.toUtf8Json();
	}
	
	@RequestMapping(value = "report/search.do")
	public @ResponseBody byte[] reportSearch(HttpServletRequest request,
			HttpServletResponse response, 
			@RequestParam("entrusted_case") Integer entrustedCase) throws UnsupportedEncodingException, MappingFailedException {
		List<EntrustedCaseReport> ecrs = eCReportService.getECReports(entrustedCase);
		return JsonUtil.toUtf8Json(ecrs);
	}
	
	@RequestMapping(value = "report/download.do")
	public void reportDownload(HttpServletRequest request,
			HttpServletResponse response,
			@RequestParam("report") Integer report, 
			@RequestParam("attachement") String attachement) throws IOException {
		response.setContentType("application/octet-stream");
		response.setHeader("Content-disposition","attachment;filename=\""+ java.net.URLEncoder.encode(attachement, "UTF-8")  +"\"");
		eCReportService.downloadAttachement(report, attachement, response.getOutputStream());
	}
}
