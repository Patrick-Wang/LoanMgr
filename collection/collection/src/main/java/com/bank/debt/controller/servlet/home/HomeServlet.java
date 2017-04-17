package com.bank.debt.controller.servlet.home;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

import com.bank.debt.model.entity.RoleEntity;
import com.bank.debt.model.entity.UserEntity;
import com.bank.debt.service.account.AccountService;
import com.bank.debt.service.account.AccountServiceImpl;

@Controller
@RequestMapping(value = "home")
public class HomeServlet {
	@Resource(name=AccountServiceImpl.NAME)
	AccountService accountService;
	
	private String getUserName(){
		UserDetails userDetails = (UserDetails) SecurityContextHolder.getContext()
			    .getAuthentication()
			    .getPrincipal();
		String userName = userDetails.getUsername();
		return userName;
	}
	
	private List<String> getRoles(String userName){
		UserEntity ue = accountService.getUser(userName);
		List<String> roles = new ArrayList<String>();
		for (RoleEntity role : ue.getRoles()){
			roles.add(role.getName());
		}
		return roles;
	}
	
	@RequestMapping(value = "/index.do")
	public ModelAndView getIndex(
			HttpServletRequest request,
			HttpServletResponse response){
		Map<String, Object> mp = new HashMap<String, Object>();
		String userName = getUserName();
		List<String> addrs = accountService.getUIAuthAddress(userName);
		mp.put("userName", userName);
		mp.put("roles", getRoles(userName));
		mp.put("address", addrs);
		return new ModelAndView("index", mp);
	}
	
}
