package com.bank.debt.controller.servlet.message;

import java.io.IOException;
import java.io.UnsupportedEncodingException;
import java.util.List;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.commons.CommonsMultipartFile;

import com.bank.debt.protocol.entity.Message;
import com.bank.debt.protocol.entity.Result;
import com.bank.debt.protocol.entity.UnreadMessage;
import com.bank.debt.protocol.error.ErrorCode;
import com.bank.debt.protocol.tools.Checking;
import com.bank.debt.protocol.tools.JsonUtil;
import com.bank.debt.protocol.tools.PathUtil;
import com.bank.debt.service.message.MessageService;
import com.bank.debt.service.message.MessageServiceImpl;
import com.bank.debt.service.service.ftp.FtpService;

import net.sf.json.JSONObject;

@Controller
@RequestMapping(value = "message")
public class MessageServlet {
	@Resource(name=MessageServiceImpl.NAME)
	MessageService messageService;

	@Autowired
	FtpService ftpService;
	
	@RequestMapping(value = "send.do")
	public @ResponseBody byte[] send(HttpServletRequest request,
			HttpServletResponse response,
			@RequestParam("entrusted_case") Integer entrustedCase, 
			@RequestParam("to") Integer to,
			@RequestParam(value = "message", required = false) String message,
			@RequestParam(value = "attachements", required = false) CommonsMultipartFile[] attachements)
			throws IOException {
		UserDetails userDetails = (UserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
		String userName = userDetails.getUsername();
		Result r = ErrorCode.MESSAGE_SEND_FALIED;
		if (Checking.isExist(entrustedCase) && Checking.isExist(to)){
			r = messageService.sendMessage(entrustedCase, userName, to, message, attachements);
		}
		return r.toUtf8Json();
	}
	
	@RequestMapping(value = "unread.do")
	public @ResponseBody byte[] unread(HttpServletRequest request,
			HttpServletResponse response,
			@RequestParam(value="entrusted_case", required=false) Integer entrustedCase) throws UnsupportedEncodingException {
		UserDetails userDetails = (UserDetails) SecurityContextHolder.getContext()
			    .getAuthentication()
			    .getPrincipal();
		String userName = userDetails.getUsername();
		return JsonUtil.toUtf8Json(messageService.getUnreadCount(entrustedCase, userName));
	}
	
	@RequestMapping(value = "read_message.do")
	public @ResponseBody byte[] readMessage(HttpServletRequest request,
			HttpServletResponse response) throws IOException {
		List<Integer> msgIds = (List<Integer>) JsonUtil.getObjects(request, "mids", Integer.class);
		
		messageService.readMessages(msgIds);
		
		return ErrorCode.OK.toUtf8Json();
	}
	
	@RequestMapping(value = "unread_messages.do")
	public @ResponseBody byte[] unreadMessages(HttpServletRequest request,
			HttpServletResponse response) throws UnsupportedEncodingException {
		UserDetails userDetails = (UserDetails) SecurityContextHolder.getContext()
			    .getAuthentication()
			    .getPrincipal();
		String userName = userDetails.getUsername();
		
		List<UnreadMessage> ums = messageService.getUnressages(userName);
		
		return JsonUtil.toUtf8Json(ums);
	}
	
	@RequestMapping(value = "receive.do")
	public @ResponseBody byte[] receive(HttpServletRequest request,
			HttpServletResponse response,
			@RequestParam("entrusted_case") Integer entrustedCase,
			@RequestParam("with") Integer with) throws UnsupportedEncodingException {
		List<Message> msgs = messageService.getMsgsWith(entrustedCase, with);
		
		return JsonUtil.toUtf8Json(msgs);
	}
	
	@RequestMapping(value = "download.do")
	public void download(
			HttpServletRequest request,
			HttpServletResponse response,
			@RequestParam("entrusted_case") Integer entrustedCase,
			@RequestParam("from") Integer from,
			@RequestParam("to") Integer to,
			@RequestParam("attachement") String attachement) throws IOException {
		response.setContentType("application/octet-stream");
		response.setHeader("Content-disposition","attachment;filename=\""+ java.net.URLEncoder.encode(attachement, "UTF-8")  +"\"");
		ftpService.downloadFile(PathUtil.msgAttachementPath(entrustedCase, from, to), attachement, response.getOutputStream());
	}

}
