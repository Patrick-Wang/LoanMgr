package com.bank.debt.controller.servlet.authority;

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

import com.bank.debt.protocol.entity.IF;
import com.bank.debt.protocol.entity.Role;
import com.bank.debt.protocol.error.ErrorCode;
import com.bank.debt.protocol.tools.JsonUtil;
import com.bank.debt.service.authority.AuthorityService;
import com.bank.debt.service.authority.AuthorityServiceImpl;

import net.sf.json.JSONArray;

@SuppressWarnings("unchecked")
@Controller
@RequestMapping(value = "authority")
public class AuthorityServlet {
	@Resource(name=AuthorityServiceImpl.NAME)
	AuthorityService authorityService;

	@RequestMapping(value = "role.do")
	public @ResponseBody byte[] getRole(HttpServletRequest request,
			HttpServletResponse response) throws UnsupportedEncodingException {
		List<Role> roles = authorityService.getAllRols();
		return JsonUtil.toUtf8Json(roles);
	}
	
	@RequestMapping(value = "interface.do")
	public @ResponseBody byte[] getInterface(HttpServletRequest request,
			HttpServletResponse response) throws UnsupportedEncodingException {
		List<IF> ifs = authorityService.getDataIfs();
		return JsonUtil.toUtf8Json(ifs);
	}
	
	@RequestMapping(value = "search.do")
	public @ResponseBody byte[] search(HttpServletRequest request,
			HttpServletResponse response) throws UnsupportedEncodingException {
		Integer roleId = Integer.valueOf(request.getParameter("role"));
		List<Integer> ifs = authorityService.getRoleIfs(roleId);
		return JsonUtil.toUtf8Json(ifs); 
	}
	
	@RequestMapping(value = "delete.do")
	public @ResponseBody byte[] delete(HttpServletRequest request,
			HttpServletResponse response,
			@RequestParam("role") Integer role,
			@RequestParam("ifs") String jIfs) throws IOException {
		List<Integer> ifs = (List<Integer>) JsonUtil.toObjects(JSONArray.fromObject(jIfs), Integer.class, null);
		authorityService.deleteRoleIfs(role, ifs);
		
		return ErrorCode.OK.toUtf8Json();
	}
	
	@RequestMapping(value = "add.do")
	public @ResponseBody byte[] add(HttpServletRequest request,
			HttpServletResponse response,
			@RequestParam("role") Integer role,
			@RequestParam("ifs") String jIfs) throws IOException {
		List<Integer> ifs = (List<Integer>) JsonUtil.toObjects(JSONArray.fromObject(jIfs), Integer.class, null);
		authorityService.addRoleIfs(role, ifs);
		
		return ErrorCode.OK.toUtf8Json();
	}
}
