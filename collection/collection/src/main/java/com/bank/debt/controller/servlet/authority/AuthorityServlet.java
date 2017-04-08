package com.bank.debt.controller.servlet.authority;

import com.bank.debt.service.authority.AuthorityServiceImpl;
import com.bank.debt.service.authority.AuthorityService;
import javax.annotation.Resource;
import java.io.UnsupportedEncodingException;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
@RequestMapping(value = "authority")
public class AuthorityServlet {
	@Resource(name=AuthorityServiceImpl.NAME)
	AuthorityService authorityService;

	@RequestMapping(value = "role.do")
	public @ResponseBody byte[] getRole(HttpServletRequest request,
			HttpServletResponse response) throws UnsupportedEncodingException {

		
		return null;
	}
	
	@RequestMapping(value = "interface.do")
	public @ResponseBody byte[] getInterface(HttpServletRequest request,
			HttpServletResponse response) throws UnsupportedEncodingException {

		
		return null;
	}
	
	@RequestMapping(value = "search.do")
	public @ResponseBody byte[] search(HttpServletRequest request,
			HttpServletResponse response) throws UnsupportedEncodingException {

		
		return null;
	}
	
	@RequestMapping(value = "delete.do")
	public @ResponseBody byte[] delete(HttpServletRequest request,
			HttpServletResponse response) throws UnsupportedEncodingException {

		
		return null;
	}
	
	@RequestMapping(value = "add.do")
	public @ResponseBody byte[] add(HttpServletRequest request,
			HttpServletResponse response) throws UnsupportedEncodingException {

		
		return null;
	}
}
