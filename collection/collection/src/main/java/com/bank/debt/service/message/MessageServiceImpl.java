package com.bank.debt.service.message;

import java.io.IOException;
import java.sql.Timestamp;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.List;
import java.util.UUID;

import javax.annotation.Resource;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.commons.CommonsMultipartFile;

import com.bank.debt.model.dao.attachement.AttachementDao;
import com.bank.debt.model.dao.attachement.AttachementDaoImpl;
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
import com.bank.debt.model.entity.AttachementEntity;
import com.bank.debt.model.entity.EntrustedCaseManagerEntity;
import com.bank.debt.model.entity.MessageEntity;
import com.bank.debt.model.entity.UserEntity;
import com.bank.debt.protocol.entity.Attachement;
import com.bank.debt.protocol.entity.Message;
import com.bank.debt.protocol.entity.Result;
import com.bank.debt.protocol.error.ErrorCode;
import com.bank.debt.protocol.tools.Checking;
import com.bank.debt.protocol.tools.PathUtil;
import com.bank.debt.protocol.tools.map.AttachMapping;
import com.bank.debt.protocol.tools.map.Mapper;
import com.bank.debt.protocol.tools.map.Mapping;
import com.bank.debt.protocol.tools.map.MappingFailedException;
import com.bank.debt.protocol.tools.map.MappingSkipException;
import com.bank.debt.protocol.type.EntrustedCaseType;
import com.bank.debt.protocol.type.MessageStatus;
import com.bank.debt.service.attachement.AttachementService;
import com.bank.debt.service.service.ftp.FtpService;

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
	
	@Autowired
	AttachementService attachementService;
	
	@Resource(name=AttachementDaoImpl.NAME)
	AttachementDao attachementDao;
	
	public final static String NAME = "MessageServiceImpl";

	public final Mapping<MessageEntity, Message> msgMapping = new Mapping<MessageEntity, Message>(){
		SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		Mapper<AttachementEntity, Attachement> attachMapper = new Mapper<AttachementEntity, Attachement>(AttachMapping.ae2aMapping);
		@Override
		public Message onMap(MessageEntity from) throws MappingSkipException, MappingFailedException {
			Message ms = new Message();
			ms.setEcMgrId(from.getEntrustedCaseManager().getId());
			ms.setEcType(from.getEntrustedCaseManager().getType());
			ms.setEcCode(getECCode(from.getEntrustedCaseManager()));
			ms.setFromId(from.getCome().getId());
			ms.setFromName(from.getCome().getUsername());
			ms.setContent(from.getContent());
			ms.setMsgId(from.getId());
			ms.setSendTime(formatter.format(from.getSendTime()));
			ms.setTitle(from.getTitle());
			ms.setToId(from.getDest().getId());
			ms.setToName(from.getDest().getUsername());
			ms.setRead(from.getIsRead());
			if (Checking.isExist(from.getAttachements())){
				ms.setAttachements(attachMapper.forceMap(from.getAttachements()));
			}
			return ms;
		}
	};
	
	
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
				msg.setIsRead(MessageStatus.read);
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
		Mapper<MessageEntity, Message> mapper = new Mapper<MessageEntity, Message>(msgMapping);
		return mapper.forceMap(mes);
	}

	@Override
	public List<Message> getMsgsWith(String userName, Integer entrustedCase, Integer with) {
		UserEntity user = userDao.getUserByName(userName);
		List<MessageEntity> entities = messageDao.getMsgWithUser(entrustedCase, user, with);
		Mapper<MessageEntity, Message> mapper = new Mapper<MessageEntity, Message>(msgMapping);
		return mapper.forceMap(entities);
	}

//	private Message mse2ms(MessageEntity entity) {
//		SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
//
//		Message msg = new Message();
//		msg.setFromId(entity.getCome().getId());
//		msg.setFromName(entity.getCome().getUsername());
//		msg.setToId(entity.getDest().getId());
//		msg.setToName(entity.getDest().getUsername());
//		msg.setContent(entity.getContent());
//		msg.setEcMgrId(entity.getEntrustedCaseManager().getId());
//		switch(entity.getEntrustedCaseManager().getType()){
//		case EntrustedCaseType.CAR_LOAN:
//			msg.setEcCode(eCCarLoanDao.getById(entity.getEntrustedCaseManager().getEntrustedCase()).getCode());
//			break;
//		case EntrustedCaseType.CREDIT_CARD:
//			msg.setEcCode(eCCreditCardDao.getById(entity.getEntrustedCaseManager().getEntrustedCase()).getCode());
//			break;
//		case EntrustedCaseType.CREDIT_LOAN:
//			msg.setEcCode(eCCreditLoanDao.getById(entity.getEntrustedCaseManager().getEntrustedCase()).getCode());
//			break;
//		}
//		msg.setTitle(entity.getTitle());
//		msg.setRead(entity.getIsRead());
//		msg.setSendTime(formatter.format(entity.getSendTime()));
//		msg.setMsgId(entity.getId());
//		if (Checking.isExist(entity.getAttachements())){
//			msg.setAttachements(JsonUtil.toObjects(JSONArray.fromObject(entity.getAttachements()), String.class, null));
//		}
//		return msg;
//	}

	@Override
	public Result sendMessage(Integer entrustedCase, String userName, Integer to, String title, String message,
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
		me.setDest(toUser);
		me.setTitle(title);
		me.setEntrustedCaseManager(entrustedCaseManager);
		me.setContent(message);
		
		List<AttachementEntity> aes = me.getAttachements();
		if (aes == null){
			aes = new ArrayList<AttachementEntity>();
		}
		if (attachements != null){
			for (CommonsMultipartFile file : attachements){
				Attachement attach = new Attachement();
				attach.setDisplay(Checking.getFileName(file));
				attach.setFileAddress(PathUtil.msgAttachementPath(
						entrustedCase, from.getId(), to) + UUID.randomUUID() + attach.getDisplay());
				Integer attachId = attachementService.uploadAttachement(attach, file.getInputStream());
				if (attachId != null){
					aes.add(attachementDao.getById(attachId));
				}
			}
		}
		
		me.setAttachements(aes);
		me.setIsRead(MessageStatus.unread);
		me.setSendTime(new Timestamp(Calendar.getInstance().getTimeInMillis()));
		me = messageDao.merge(me);
		Result ret = ErrorCode.OK.clone();
		Mapper<MessageEntity, Message> mapper = new Mapper<MessageEntity, Message>(msgMapping);
		ret.setMsg(mapper.forceMap(me).toJson());
		return ret;
	}

	@Override
	public List<Message> getSendMessages(String userName, Integer read) {
		UserEntity user = userDao.getUserByName(userName);
		List<MessageEntity> mes = messageDao.getMsgFromUser(user, read);
		Mapper<MessageEntity, Message> mapper = new Mapper<MessageEntity, Message>(msgMapping);
		return mapper.forceMap(mes);
	}
}
