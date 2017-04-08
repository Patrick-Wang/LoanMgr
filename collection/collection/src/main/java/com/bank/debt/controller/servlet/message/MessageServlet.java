package com.bank.debt.controller.servlet.message;

import com.bank.debt.service.message.MessageServiceImpl;
import com.bank.debt.service.message.MessageService;
import javax.annotation.Resource;
import java.io.UnsupportedEncodingException;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
@RequestMapping(value = "message")
public class MessageServlet {
	@Resource(name=MessageServiceImpl.NAME)
	MessageService messageService;

	@RequestMapping(value = "send.do")
	public @ResponseBody byte[] send(HttpServletRequest request,
			HttpServletResponse response) throws UnsupportedEncodingException {

		
		return null;
	}
	
	@RequestMapping(value = "unread.do")
	public @ResponseBody Integer unread(HttpServletRequest request,
			HttpServletResponse response) throws UnsupportedEncodingException {

		
		return null;
	}
	
	@RequestMapping(value = "read_message.do")
	public @ResponseBody byte[] readMessage(HttpServletRequest request,
			HttpServletResponse response) throws UnsupportedEncodingException {

		
		return null;
	}
	
	@RequestMapping(value = "entrusted_case.do")
	public @ResponseBody byte[] entrustedCase(HttpServletRequest request,
			HttpServletResponse response) throws UnsupportedEncodingException {

		
		return null;
	}
	
	@RequestMapping(value = "receive.do")
	public @ResponseBody byte[] receive(HttpServletRequest request,
			HttpServletResponse response) throws UnsupportedEncodingException {

		
		return null;
	}
	
	@RequestMapping(value = "download.do")
	public @ResponseBody byte[] download(HttpServletRequest request,
			HttpServletResponse response) throws UnsupportedEncodingException {

		
		return null;
	}

}
