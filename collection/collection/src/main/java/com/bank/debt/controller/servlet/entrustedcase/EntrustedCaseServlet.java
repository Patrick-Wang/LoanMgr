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

import com.bank.debt.protocol.entity.Result;
import com.bank.debt.protocol.error.ErrorCode;
import com.bank.debt.protocol.tools.Checking;
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
			HttpServletResponse response) throws UnsupportedEncodingException {

		
		return null;
	}
	
	@RequestMapping(value = "manager/search.do")
	public @ResponseBody byte[] managerSearch(HttpServletRequest request,
			HttpServletResponse response) throws UnsupportedEncodingException {

		
		return null;
	}
	
	@RequestMapping(value = "manager/update.do")
	public @ResponseBody byte[] managerUpdate(HttpServletRequest request,
			HttpServletResponse response) throws UnsupportedEncodingException {

		
		return null;
	}
	
	@RequestMapping(value = "report/submit.do")
	public @ResponseBody byte[] reportSubmit(
			HttpServletRequest request,
			HttpServletResponse response,
			@RequestParam("attachements") CommonsMultipartFile file) throws UnsupportedEncodingException {

		
		return null;
	}
	
	@RequestMapping(value = "report/search.do")
	public @ResponseBody byte[] reportSearch(HttpServletRequest request,
			HttpServletResponse response) throws UnsupportedEncodingException {

		
		return null;
	}
	
	@RequestMapping(value = "report/download.do")
	public @ResponseBody byte[] reportDownload(HttpServletRequest request,
			HttpServletResponse response) throws UnsupportedEncodingException {

		
		return null;
	}
}
