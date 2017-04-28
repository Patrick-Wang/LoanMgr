package com.bank.debt.controller.servlet.account;

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

import com.bank.debt.protocol.entity.CreateUser;
import com.bank.debt.protocol.entity.Organization;
import com.bank.debt.protocol.entity.User;
import com.bank.debt.protocol.error.ErrorCode;
import com.bank.debt.protocol.tools.Checking;
import com.bank.debt.protocol.tools.JsonUtil;
import com.bank.debt.service.account.AccountService;
import com.bank.debt.service.account.AccountServiceImpl;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

@Controller
@RequestMapping(value = "account")
public class AccountServlet {
	@Resource(name=AccountServiceImpl.NAME)
	AccountService accountService;

	@RequestMapping(value = "org/search.do")
	public @ResponseBody byte[] searchOrg(HttpServletRequest request,
			HttpServletResponse response) throws UnsupportedEncodingException {
		List<Organization> orgs = accountService.getOrgs();
		
		
		return JsonUtil.toUtf8Json(orgs);
	}
	
	@RequestMapping(value = "search.do")
	public @ResponseBody byte[] search(HttpServletRequest request,
			HttpServletResponse response,
			@RequestParam(value="ifs", required=false) String ifs) throws UnsupportedEncodingException {
		List<String> ifList = (List<String>) JsonUtil.toObjects(JSONArray.fromObject(ifs), String.class, null);
		List<User> usrs = null;
		if (null != ifs){
			usrs = accountService.getUsers(ifList);
		}else{
			usrs = accountService.getAllUsers();
		}

		return JsonUtil.toUtf8Json(usrs);
	}
	

	
	@RequestMapping(value = "update.do")
	public @ResponseBody byte[] update(HttpServletRequest request,
			HttpServletResponse response,
			@RequestParam("users") String users)  throws IOException {
		List<User> usrs = (List<User>) JsonUtil.toObjects(JSONArray.fromObject(users), User.class);
		return accountService.updateUsers(usrs).toUtf8Json();
	}
	
	@RequestMapping(value = "create.do")
	public @ResponseBody byte[] create(HttpServletRequest request,
			HttpServletResponse response,
			@RequestParam("user") String createUser) throws IOException {
		CreateUser usr = new CreateUser();
		usr.fromJson(JSONObject.fromObject(createUser));
		if (Checking.isExist(usr.getName()) && 
			Checking.isExist(usr.getPassword()) &&
			Checking.isExist(usr.getOrgId()) &&
			Checking.isExist(usr.getRoles())){
			return ErrorCode.ACCOUNT_USER_INFO_ERROR.toUtf8Json();
		}else{
			return accountService.createUser(usr).toUtf8Json();
		}
	}
}
