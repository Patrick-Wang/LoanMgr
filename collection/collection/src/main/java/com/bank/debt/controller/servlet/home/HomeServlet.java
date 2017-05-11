package com.bank.debt.controller.servlet.home;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Value;
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
		
	@Value("${sip.server}")
    private String sipServerIp;
	
	private String getUserName(){
		UserDetails userDetails = (UserDetails) SecurityContextHolder.getContext()
			    .getAuthentication()
			    .getPrincipal();
		String userName = userDetails.getUsername();
		return userName;
	}
	
	private List<String> getRoles(List<RoleEntity> res){
		List<String> roles = new ArrayList<String>();
		for (RoleEntity role : res){
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
		UserEntity ue = accountService.getUser(userName);
		List<String> addrs = accountService.getUIAuthAddress(userName);
		mp.put("userName", userName);
		mp.put("roles", getRoles(ue.getRoles()));
		mp.put("position", ue.getPosition());
		mp.put("org", ue.getOrg().getName());
		mp.put("sipServerIP", sipServerIp);
		if (null != ue.getOrg().getParent()){
			mp.put("pOrg", ue.getOrg().getParent().getName());
		}else{
			mp.put("pOrg", ue.getOrg().getName());
		}
		mp.put("address", addrs);
		return new ModelAndView("index", mp);
	}
	
}
