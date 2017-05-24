package com.bank.debt.model.dao.message;
import java.util.List;

import com.bank.debt.model.entity.MessageEntity;
import com.bank.debt.model.entity.UserEntity;
import com.speed.frame.model.dao.AbstractReadWriteDao;



public interface MessageDao extends AbstractReadWriteDao<MessageEntity> {

	Integer getUnreadCount(Integer entrustedCase, Integer to);

	List<MessageEntity> getUnreadMsgToUser(UserEntity user);

	List<MessageEntity> getMsgWithUser(Integer entrustedCase, UserEntity user, Integer with);

	Integer getUnreadCount(Integer to);

	List<MessageEntity> getMsgFromUser(UserEntity user, Integer read);

	void deleteByECM(int id);

	List<MessageEntity> getECMsgs(Integer entrustedCase);

}
