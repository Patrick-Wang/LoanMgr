package com.bank.debt.controller.servlet.home;

import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

@Controller
@RequestMapping(value = "home")
public class HomeServlet {
	
	@RequestMapping(value = "/index.do")
	public ModelAndView getIndex(
			HttpServletRequest request,
			HttpServletResponse response){
		ModelAndView mv = new ModelAndView();
		Map mp = new HashMap();
		
		return new ModelAndView("index", mp);
	}
	
}
