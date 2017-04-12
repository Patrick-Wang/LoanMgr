package com.bank.debt.service.message;

import java.io.IOException;
import java.sql.Timestamp;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.commons.CommonsMultipartFile;

import com.bank.debt.model.dao.entrustedcasemanager.EntrustedCaseManagerDao;
import com.bank.debt.model.dao.entrustedcasemanager.EntrustedCaseManagerDaoImpl;
import com.bank.debt.model.dao.message.MessageDao;
import com.bank.debt.model.dao.message.MessageDaoImpl;
import com.bank.debt.model.dao.user.UserDao;
import com.bank.debt.model.dao.user.UserDaoImpl;
import com.bank.debt.model.entity.EntrustedCaseManagerEntity;
import com.bank.debt.model.entity.MessageEntity;
import com.bank.debt.model.entity.UserEntity;
import com.bank.debt.protocol.entity.Message;
import com.bank.debt.protocol.entity.MessageEntrustedCase;
import com.bank.debt.protocol.entity.MessageSummary;
import com.bank.debt.protocol.entity.Result;
import com.bank.debt.protocol.error.ErrorCode;
import com.bank.debt.protocol.tools.Checking;
import com.bank.debt.protocol.tools.JsonUtil;
import com.bank.debt.protocol.tools.PathUtil;
import com.bank.debt.protocol.type.MessageStatus;
import com.bank.debt.service.service.ftp.FtpService;

import net.sf.json.JSONArray;

@Service(MessageServiceImpl.NAME)
@Transactional("transaction")
public class MessageServiceImpl implements MessageService {
	@Resource(name=EntrustedCaseManagerDaoImpl.NAME)
	EntrustedCaseManagerDao entrustedCaseManagerDao;

	@Resource(name=UserDaoImpl.NAME)
	UserDao userDao;

	@Resource(name=MessageDaoImpl.NAME)
	MessageDao messageDao;

	
	@Autowired
	FtpService ftpService;
	
	public final static String NAME = "MessageServiceImpl";

	@Override
	public Integer getUnreadCount(Integer entrustedCase) {
		return messageDao.getUnreadCount(entrustedCase);
	}

	@Override
	public void readMessages(List<Integer> msgIds) {
		for(Integer id : msgIds){
			MessageEntity msg = messageDao.getById(id);
			if (msg != null){
				msg.setRead(MessageStatus.read);
				messageDao.merge(msg);
			}
		}
	}

	
	
	@Override
	public List<MessageEntrustedCase> getMessageEntrustedCases(String userName) {
		UserEntity user = userDao.getUserByName(userName);
		List<Object[]> mss = messageDao.getMsgSummaryToUser(user);
		Map<Integer, MessageEntrustedCase> mecByEc = new HashMap<Integer, MessageEntrustedCase>();
		for (Object[] summary : mss){
			if (!mecByEc.containsKey(summary[0])){
				MessageEntrustedCase mec = new MessageEntrustedCase();
				mec.setEntrustedCaseId((Integer) summary[0]);
				mec.setMsgSummary(new ArrayList<MessageSummary>());
				mecByEc.put((Integer) summary[0], mec);
			}
			MessageSummary ms = new MessageSummary();
			ms.setFromId((Integer) summary[1]);
			ms.setFromName((String) summary[2]);
			ms.setMsgCount(((Long) summary[2]).intValue());
			mecByEc.get((Integer) summary[0]).getMsgSummary().add(ms);
		}
		List<MessageEntrustedCase> mecs = new ArrayList<MessageEntrustedCase>();
		mecs.addAll(mecByEc.values());
		return mecs;
	}

	@Override
	public List<Message> getMsgsWith(Integer entrustedCase, Integer with) {
		List<MessageEntity> entities = messageDao.getMsgWithUser(entrustedCase, with);
		List<Message> msgs = new ArrayList<Message>();
		for (MessageEntity entity : entities){
			msgs.add(mse2ms(entity));
		}
		return msgs;
	}

	private Message mse2ms(MessageEntity entity) {
		SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");

		Message msg = new Message();
		msg.setFromId(entity.getFrom().getId());
		msg.setFromName(entity.getFrom().getUsername());
		msg.setToId(entity.getTo().getId());
		msg.setToName(entity.getTo().getUsername());
		msg.setContent(entity.getContent());
		msg.setRead(entity.getRead());
		msg.setSendTime(formatter.format(entity.getSendTime()));
		if (Checking.isExist(entity.getAttachements())){
			msg.setAttachements(JsonUtil.toObjects(JSONArray.fromObject(entity.getAttachements()), String.class));
		}
		return msg;
	}

	@Override
	public Result sendMessage(Integer entrustedCase, String userName, Integer to, String message,
			CommonsMultipartFile[] attachements) throws IOException {
		EntrustedCaseManagerEntity entrustedCaseManager = entrustedCaseManagerDao.getById(entrustedCase);
		if (entrustedCaseManager == null){
			return ErrorCode.MESSAGE_SEND_FALIED;
		}
		
		UserEntity from = userDao.getUserByName(userName);
		if (from == null){
			return ErrorCode.MESSAGE_SEND_FALIED;
		}
		
		UserEntity toUser = userDao.getById(to);
		if (toUser == null){
			return ErrorCode.MESSAGE_SEND_FALIED;
		}
		
		MessageEntity me = new MessageEntity();
		me.setFrom(from);
		me.setTo(toUser);
		me.setEntrustedCaseManager(entrustedCaseManager);
		me.setContent(message);
		
		JSONArray attachs = new JSONArray();
		for (CommonsMultipartFile file : attachements){
			if (ftpService.updoadFile(PathUtil.msgAttachementPath(entrustedCase, from.getId(), to), 
					file.getName(), 
					file.getInputStream())){
				attachs.add(file.getName());
			}
		}
		me.setAttachements(attachs.toString());
		me.setRead(MessageStatus.unread);
		me.setSendTime(new Timestamp(Calendar.getInstance().getTimeInMillis()));
		messageDao.merge(me);
		return ErrorCode.OK;
	}
}
