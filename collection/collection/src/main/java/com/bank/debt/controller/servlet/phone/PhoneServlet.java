package com.bank.debt.controller.servlet.phone;

import com.bank.debt.service.phone.PhoneServiceImpl;
import com.bank.debt.service.phone.PhoneService;
import javax.annotation.Resource;
import java.io.UnsupportedEncodingException;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
@RequestMapping(value = "phone")
public class PhoneServlet {
	@Resource(name=PhoneServiceImpl.NAME)
	PhoneService phoneService;

	
	@RequestMapping(value = "records.do")
	public @ResponseBody byte[] records(HttpServletRequest request,
			HttpServletResponse response) throws UnsupportedEncodingException {

		
		return null;
	}
	
	@RequestMapping(value = "upload.do")
	public @ResponseBody byte[] upload(HttpServletRequest request,
			HttpServletResponse response) throws UnsupportedEncodingException {

		
		return null;
	}
	
	@RequestMapping(value = "missed_call.do")
	public @ResponseBody byte[] getMissedCall(HttpServletRequest request,
			HttpServletResponse response) throws UnsupportedEncodingException {

		
		return null;
	}
}
