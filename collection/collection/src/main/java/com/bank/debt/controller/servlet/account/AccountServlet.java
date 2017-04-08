package com.bank.debt.controller.servlet.account;

import java.io.UnsupportedEncodingException;
import java.util.List;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.bank.debt.protocol.entity.Organization;
import com.bank.debt.protocol.tools.util;
import com.bank.debt.service.account.AccountService;
import com.bank.debt.service.account.AccountServiceImpl;

@Controller
@RequestMapping(value = "account")
public class AccountServlet {
	@Resource(name=AccountServiceImpl.NAME)
	AccountService accountService;

	@RequestMapping(value = "org/search.do")
	public @ResponseBody byte[] searchOrg(HttpServletRequest request,
			HttpServletResponse response) throws UnsupportedEncodingException {

		List<Organization> orgs = accountService.getOrgs();
		
		return util.toUtf8Json(orgs);
	}
	
	@RequestMapping(value = "search.do")
	public @ResponseBody byte[] search(HttpServletRequest request,
			HttpServletResponse response) throws UnsupportedEncodingException {

		
		return null;
	}
	
	@RequestMapping(value = "update.do")
	public @ResponseBody byte[] update(HttpServletRequest request,
			HttpServletResponse response) throws UnsupportedEncodingException {

		
		return null;
	}
	
	@RequestMapping(value = "create.do")
	public @ResponseBody byte[] create(HttpServletRequest request,
			HttpServletResponse response) throws UnsupportedEncodingException {

		
		return null;
	}
}
