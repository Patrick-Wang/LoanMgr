package com.bank.debt.service.message;

import java.io.IOException;
import java.sql.Timestamp;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.List;

import javax.annotation.Resource;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.commons.CommonsMultipartFile;

import com.bank.debt.model.dao.eccarloan.ECCarLoanDao;
import com.bank.debt.model.dao.eccarloan.ECCarLoanDaoImpl;
import com.bank.debt.model.dao.eccreditcard.ECCreditCardDao;
import com.bank.debt.model.dao.eccreditcard.ECCreditCardDaoImpl;
import com.bank.debt.model.dao.eccreditloan.ECCreditLoanDao;
import com.bank.debt.model.dao.eccreditloan.ECCreditLoanDaoImpl;
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
import com.bank.debt.protocol.entity.Result;
import com.bank.debt.protocol.error.ErrorCode;
import com.bank.debt.protocol.tools.Checking;
import com.bank.debt.protocol.tools.JsonUtil;
import com.bank.debt.protocol.tools.PathUtil;
import com.bank.debt.protocol.tools.map.Mapper;
import com.bank.debt.protocol.tools.map.Mapping;
import com.bank.debt.protocol.tools.map.MappingFailedException;
import com.bank.debt.protocol.tools.map.MappingSkipException;
import com.bank.debt.protocol.type.EntrustedCaseType;
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

	@Resource(name=ECCarLoanDaoImpl.NAME)
	ECCarLoanDao eCCarLoanDao;

	@Resource(name=ECCreditLoanDaoImpl.NAME)
	ECCreditLoanDao eCCreditLoanDao;

	@Resource(name=ECCreditCardDaoImpl.NAME)
	ECCreditCardDao eCCreditCardDao;
	
	@Autowired
	FtpService ftpService;
	
	public final static String NAME = "MessageServiceImpl";

	@Override
	public Integer getUnreadCount(Integer entrustedCase, String toUser) {
		UserEntity user = userDao.getUserByName(toUser);
		if (null != entrustedCase){
			return messageDao.getUnreadCount(entrustedCase, user.getId());
		}else{
			return messageDao.getUnreadCount(user.getId());
		}
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

	String getECCode(EntrustedCaseManagerEntity ecme ){
		if( ecme.getType() == EntrustedCaseType.CAR_LOAN){
			return eCCarLoanDao.getById(ecme.getEntrustedCase()).getCode();
		}
		if( ecme.getType() == EntrustedCaseType.CREDIT_CARD){
			return eCCreditCardDao.getById(ecme.getEntrustedCase()).getCode();
		}
		if( ecme.getType() == EntrustedCaseType.CREDIT_LOAN){
			return eCCreditLoanDao.getById(ecme.getEntrustedCase()).getCode();
		}
		return null;
	}
	
	@Override
	public List<Message> getUnreadMessages(String userName) {
		UserEntity user = userDao.getUserByName(userName);
		List<MessageEntity> mes = messageDao.getUnreadMsgToUser(user);
		Mapper<MessageEntity, Message> mapper = new Mapper<MessageEntity, Message>();
		mapper.setMapping(new Mapping<MessageEntity, Message>(){
			SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
			
			@Override
			public Message onMap(MessageEntity from) throws MappingSkipException, MappingFailedException {
				Message ms = new Message();
				ms.setEcCode(getECCode(from.getEntrustedCaseManager()));
				ms.setFromId(from.getCome().getId());
				ms.setFromName(from.getCome().getUsername());
				ms.setContent(from.getContent());
				ms.setMsgId(from.getId());
				ms.setSendTime(formatter.format(from.getSendTime()));
				ms.setTitle(from.getTitle());
				return ms;
			}
			
		});
		return mapper.forceMap(mes);
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
		msg.setFromId(entity.getCome().getId());
		msg.setFromName(entity.getCome().getUsername());
		msg.setToId(entity.getTo().getId());
		msg.setToName(entity.getTo().getUsername());
		msg.setContent(entity.getContent());
		msg.setRead(entity.getRead());
		msg.setSendTime(formatter.format(entity.getSendTime()));
		if (Checking.isExist(entity.getAttachements())){
			msg.setAttachements(JsonUtil.toObjects(JSONArray.fromObject(entity.getAttachements()), String.class, null));
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
		me.setCome(from);
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

	@Override
	public List<Message> getSendMessages(String userName, Integer read) {
		UserEntity user = userDao.getUserByName(userName);
		List<MessageEntity> mes = messageDao.getMsgFromUser(user, read);
		Mapper<MessageEntity, Message> mapper = new Mapper<MessageEntity, Message>();
		mapper.setMapping(new Mapping<MessageEntity, Message>(){
			SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
			
			@Override
			public Message onMap(MessageEntity from) throws MappingSkipException, MappingFailedException {
				Message ms = new Message();
				ms.setEcCode(getECCode(from.getEntrustedCaseManager()));
				ms.setToId(from.getTo().getId());
				ms.setToName(from.getTo().getUsername());
				ms.setContent(from.getContent());
				ms.setMsgId(from.getId());
				ms.setSendTime(formatter.format(from.getSendTime()));
				ms.setTitle(from.getTitle());
				ms.setRead(from.getRead());
				return ms;
			}
			
		});
		return mapper.forceMap(mes);
	}
}
