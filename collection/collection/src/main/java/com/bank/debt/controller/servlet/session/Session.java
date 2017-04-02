package com.bank.debt.controller.servlet.session;

import java.io.IOException;
import java.io.PrintWriter;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import com.speed.frame.common.AjaxRedirect;
import com.speed.frame.common.ControllerTools;

import net.sf.json.JSONObject;

@Controller
@RequestMapping(value = "/session")
public class Session {
	@RequestMapping(value = "/timeout.do")
    public void sessionTimeout(HttpServletRequest request, HttpServletResponse response) throws IOException {  
		String redirPage = request.getParameter("redirect"); 
		String path = request.getContextPath();
		if (redirPage.substring(0, 1).equals("/")){
			path += redirPage;
		}else{
			path += redirPage.substring(1);
		}
        if(ControllerTools.isAjaxRequest(request)){
        	AjaxRedirect ar = new AjaxRedirect(path);
        	PrintWriter pw = response.getWriter();
			pw.print(JSONObject.fromObject(ar));
			pw.close();
        }else{ 
        	response.sendRedirect(path);  
        }
    }  
}
