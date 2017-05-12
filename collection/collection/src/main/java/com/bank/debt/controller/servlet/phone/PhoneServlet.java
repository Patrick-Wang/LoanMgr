package com.bank.debt.controller.servlet.phone;

import java.io.IOException;
import java.io.UnsupportedEncodingException;
import java.util.List;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.bank.debt.protocol.entity.PhoneRecord;
import com.bank.debt.protocol.tools.JsonUtil;
import com.bank.debt.service.attachement.AttachementService;
import com.bank.debt.service.attachement.AttachementServiceImpl;
import com.bank.debt.service.phone.PhoneService;
import com.bank.debt.service.phone.PhoneServiceImpl;

@Controller
@RequestMapping(value = "phone")
public class PhoneServlet {
	@Resource(name=AttachementServiceImpl.NAME)
	AttachementService attachementService;

	@Resource(name=PhoneServiceImpl.NAME)
	PhoneService phoneService;
	
	@RequestMapping(value = "records.do")
	public @ResponseBody byte[] records(HttpServletRequest request,
			HttpServletResponse response) throws UnsupportedEncodingException {
		List<PhoneRecord> recrods = phoneService.getCallRecords();
		return JsonUtil.toUtf8Json(recrods);
	}

	@RequestMapping(value = "upload.do")
	public @ResponseBody byte[] upload(HttpServletRequest request,
			HttpServletResponse response,
			@RequestParam("number") String number,
			@RequestParam("status") Integer status,
			@RequestParam("name") String displayName) throws IOException {
		return phoneService.uploadRecord(number,status, displayName, request.getInputStream()).toUtf8Json();
	}
	
	@RequestMapping(value = "missed_call.do")
	public @ResponseBody byte[] getMissedCall(HttpServletRequest request,
			HttpServletResponse response,
			@RequestParam("number") String number,
			@RequestParam("time") String time) throws UnsupportedEncodingException {
		return phoneService.recordMissedCall(number, time).toUtf8Json();
	}
	
	@RequestMapping(value = "update_status.do")
	public @ResponseBody byte[] updateStatus(HttpServletRequest request,
			HttpServletResponse response,
			@RequestParam("record") Integer recId,
			@RequestParam("status") Integer status) throws UnsupportedEncodingException {
		return phoneService.updateStatus(recId, status).toUtf8Json();
	}
}
