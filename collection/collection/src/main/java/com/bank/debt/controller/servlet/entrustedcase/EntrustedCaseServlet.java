package com.bank.debt.controller.servlet.entrustedcase;

import com.bank.debt.service.entrustedcase.EntrustedCaseServiceImpl;
import com.bank.debt.service.entrustedcase.EntrustedCaseService;
import javax.annotation.Resource;
import java.io.UnsupportedEncodingException;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.commons.CommonsMultipartFile;

@Controller
@RequestMapping(value = "entrusted_case")
public class EntrustedCaseServlet {
	@Resource(name=EntrustedCaseServiceImpl.NAME)
	EntrustedCaseService entrustedCaseService;

	@RequestMapping(value = "import.do")
	public @ResponseBody byte[] add(
			HttpServletRequest request,
			HttpServletResponse response, 
			@RequestParam("file") CommonsMultipartFile file) throws UnsupportedEncodingException {

		
		return null;
	}
	
	@RequestMapping(value = "search.do")
	public @ResponseBody byte[] search(HttpServletRequest request,
			HttpServletResponse response) throws UnsupportedEncodingException {

		
		return null;
	}
	
	@RequestMapping(value = "download.do")
	public @ResponseBody byte[] download(HttpServletRequest request,
			HttpServletResponse response) throws UnsupportedEncodingException {

		
		return null;
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
