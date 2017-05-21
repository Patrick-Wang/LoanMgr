package com.bank.debt.controller.servlet.entrustedcase;

import java.io.IOException;
import java.io.UnsupportedEncodingException;
import java.lang.reflect.Field;
import java.sql.Date;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.List;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.commons.CommonsMultipartFile;

import com.bank.debt.protocol.entity.AcceptSummary;
import com.bank.debt.protocol.entity.AssignSummary;
import com.bank.debt.protocol.entity.Attachement;
import com.bank.debt.protocol.entity.EntrustedCaseManageInfo;
import com.bank.debt.protocol.entity.EntrustedCaseReport;
import com.bank.debt.protocol.entity.ManagerSummary;
import com.bank.debt.protocol.entity.QueryOption;
import com.bank.debt.protocol.entity.Result;
import com.bank.debt.protocol.error.ErrorCode;
import com.bank.debt.protocol.tools.Checking;
import com.bank.debt.protocol.tools.JsonUtil;
import com.bank.debt.protocol.tools.JsonUtil.PropertyHandler;
import com.bank.debt.protocol.tools.map.MappingFailedException;
import com.bank.debt.protocol.type.EntrustedCaseType;
import com.bank.debt.service.attachement.AttachementService;
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
	
	@Autowired
	AttachementService attaService;

	@RequestMapping(value = "import.do")
	public @ResponseBody byte[] add(
			HttpServletRequest request,
			HttpServletResponse response, 
			@RequestParam(value="type", required=false) Integer type,
			@RequestParam(value="file", required=false) CommonsMultipartFile file) throws UnsupportedEncodingException {
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
			@RequestParam("query") String query) throws IOException {
		UserDetails userDetails = (UserDetails) SecurityContextHolder.getContext()
			    .getAuthentication()
			    .getPrincipal();
		String userName = userDetails.getUsername();
		List ecqi = null;
		QueryOption qOpt = (QueryOption) JsonUtil.toObject(JSONObject.fromObject(query), new QueryOption(), null);
		switch(type){
		case EntrustedCaseType.CAR_LOAN:
			ecqi = entrustedCaseService.searchCarLoan(userName, qOpt);
			break;
		case EntrustedCaseType.CREDIT_CARD:
			ecqi = entrustedCaseService.searchCreditCard(userName, qOpt);
			break;
		case EntrustedCaseType.CREDIT_LOAN:
			ecqi = entrustedCaseService.searchCreditLoan(userName, qOpt);
			break;
		}		
		return JsonUtil.toUtf8Json(ecqi);
	}
	
	
	@RequestMapping(value = "manager/backup.do")
	public void backup(HttpServletRequest request,
			HttpServletResponse response,
			@RequestParam("batchNo") Integer batchNo) throws IOException, MappingFailedException {
		response.setContentType("application/octet-stream");
		String time = new SimpleDateFormat("YYYYMMddHHmmss").format(new Date(Calendar.getInstance().getTimeInMillis()));
		UserDetails userDetails = (UserDetails) SecurityContextHolder.getContext()
			    .getAuthentication()
			    .getPrincipal();
		String usr = userDetails.getUsername();
		response.setHeader("Content-disposition", "attachment;filename=\""
				+ java.net.URLEncoder.encode("backup_" + time + "_" + batchNo + ".zip", "UTF-8") + "\"");
		entrustedCaseService.downloadAll(usr, batchNo, response.getOutputStream());
	}
	
	@RequestMapping(value = "manager/batch.do")
	public @ResponseBody byte[] getBatch(HttpServletRequest request,
			HttpServletResponse response) throws IOException {
		List<Integer> batchs = entrustedCaseService.getBatchs();
		return JsonUtil.toUtf8Json(batchs);
	}

	@RequestMapping(value = "download.do")
	public void download(HttpServletRequest request,
			HttpServletResponse response, 
			@RequestParam("type") Integer type,
			@RequestParam("query") String query) throws IOException, MappingFailedException {
		response.setContentType("application/octet-stream");
		String time = new SimpleDateFormat("YYYYMMddHHmmss").format(new Date(Calendar.getInstance().getTimeInMillis()));
		UserDetails userDetails = (UserDetails) SecurityContextHolder.getContext()
			    .getAuthentication()
			    .getPrincipal();
		String usr = userDetails.getUsername();
		QueryOption qOpt = (QueryOption) JsonUtil.toObject(JSONObject.fromObject(query), new QueryOption(), null);
		switch(type){
		case EntrustedCaseType.CAR_LOAN:
			response.setHeader("Content-disposition", "attachment;filename=\""
					+ java.net.URLEncoder.encode("车贷" + time + ".xls", "UTF-8") + "\"");
			entrustedCaseService.getDownloadCarLoan(usr, qOpt, response.getOutputStream());
			
			break;
		case EntrustedCaseType.CREDIT_CARD:
			response.setHeader("Content-disposition", "attachment;filename=\""
					+ java.net.URLEncoder.encode("信用卡" + time + ".xls", "UTF-8") + "\"");
			entrustedCaseService.getDownloadCreditCard(usr, qOpt, response.getOutputStream());
			break;
		case EntrustedCaseType.CREDIT_LOAN:
			response.setHeader("Content-disposition", "attachment;filename=\""
					+ java.net.URLEncoder.encode("信贷" + time + ".xls", "UTF-8") + "\"");
			entrustedCaseService.getDownloadCreditLoan(usr, qOpt, response.getOutputStream());
			break;
		}
	}
	
	@RequestMapping(value = "update.do")
	public @ResponseBody byte[] update(HttpServletRequest request,
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
	
	@RequestMapping(value = "manager/summary.do")
	public @ResponseBody byte[] managerSummary(HttpServletRequest request,
			HttpServletResponse response) throws UnsupportedEncodingException {
		UserDetails userDetails = (UserDetails) SecurityContextHolder.getContext()
			    .getAuthentication()
			    .getPrincipal();
		String userName = userDetails.getUsername();
		ManagerSummary as = entrustedCaseService.getManagerSummary(userName);
		return as.toUtf8Json();
	}
	
	@RequestMapping(value = "delete.do")
	public @ResponseBody byte[] managerDelete(HttpServletRequest request,
			HttpServletResponse response,
			@RequestParam(value="type") Integer type,
			@RequestParam(value="ids") String ids) throws UnsupportedEncodingException {
		
		List<Integer> mgrIds = JsonUtil.toObjects(JSONArray.fromObject(ids), Integer.class, null);
		Result r = entrustedCaseService.deleteECs(type, mgrIds);
		return r.toUtf8Json();
	}
	
	@RequestMapping(value = "assign/summary.do")
	public @ResponseBody byte[] assignSummary(HttpServletRequest request,
			HttpServletResponse response) throws UnsupportedEncodingException {
		UserDetails userDetails = (UserDetails) SecurityContextHolder.getContext()
			    .getAuthentication()
			    .getPrincipal();
		String userName = userDetails.getUsername();
		AssignSummary as = entrustedCaseService.getAssignSummary(userName);
		return as.toUtf8Json();
	}
	
	@RequestMapping(value = "accept/summary.do")
	public @ResponseBody byte[] acceptSummary(HttpServletRequest request,
			HttpServletResponse response) throws UnsupportedEncodingException {
		UserDetails userDetails = (UserDetails) SecurityContextHolder.getContext()
			    .getAuthentication()
			    .getPrincipal();
		String userName = userDetails.getUsername();
		AcceptSummary as = entrustedCaseService.getAcceptSummary(userName);
		return as.toUtf8Json();
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
		List<EntrustedCaseManageInfo> ecmis = JsonUtil.toObjects(JSONArray.fromObject(data), EntrustedCaseManageInfo.class, null);
		Result r = eCManagerService.updateManageInfo(userName, ecmis);
		return r.toUtf8Json();
	}
	
	@RequestMapping(value = "report/submit.do")
	public @ResponseBody byte[] reportSubmit(
			HttpServletRequest request,
			HttpServletResponse response,
			@RequestParam(value="report", required=false) String report) throws IOException {
		CommonsMultipartFile[] attachements = Checking.getMultipartFiles(request, "attachements");
		UserDetails userDetails = (UserDetails) SecurityContextHolder.getContext()
			    .getAuthentication()
			    .getPrincipal();
		String userName = userDetails.getUsername();
		Result r = ErrorCode.ECR_SUBMIT_FAILED;
		EntrustedCaseReport ecr = (EntrustedCaseReport) JsonUtil.toObject(JSONObject.fromObject(report), new EntrustedCaseReport(), new PropertyHandler(){

			@Override
			public Object toBeanValue(Field beanField, Object jsonObj) {
				if (beanField.getName().equals("attachements")){
					JSONArray ja = (JSONArray) jsonObj;
					return JsonUtil.toObjects(ja, Attachement.class);
				}
				return null;
			}
		});
		
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
			@RequestParam("entrusted_case") Integer entrustedCase,
			@RequestParam("date") String date) throws UnsupportedEncodingException, MappingFailedException {
		List<EntrustedCaseReport> ecrs = null;
		if (Checking.isExist(date)){
			ecrs = eCReportService.getECReports(entrustedCase, Date.valueOf(date));
		}else{
			ecrs = eCReportService.getECReports(entrustedCase);
		}
		return JsonUtil.toUtf8Json(ecrs);
	}
	
	@RequestMapping(value = "report/download.do")
	public void reportDownload(HttpServletRequest request, HttpServletResponse response,
			@RequestParam("attachement") Integer attachement)
			throws IOException {
			eCReportService.downloadAttachement(attachement, response);
	}
	
	@RequestMapping(value = "attach/update.do")
	public @ResponseBody byte[] updateAttach(HttpServletRequest request,
			HttpServletResponse response, 
			@RequestParam("attachs") String attachs,
			@RequestParam(value = "new_name", required=false) String newName,
			@RequestParam(value = "upload_time", required=false) String uploadTime) throws UnsupportedEncodingException, MappingFailedException {
		List<Attachement> attas = JsonUtil.toObjects(JSONArray.fromObject(attachs), Attachement.class);
		Result r = attaService.update(attas);
		return r.toUtf8Json();
	}
	
}
