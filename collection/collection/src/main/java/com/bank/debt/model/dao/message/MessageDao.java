package com.bank.debt.model.dao.message;
import java.util.List;

import com.bank.debt.model.entity.MessageEntity;
import com.bank.debt.model.entity.UserEntity;
import com.speed.frame.model.dao.AbstractReadWriteDao;



public interface MessageDao extends AbstractReadWriteDao<MessageEntity> {

	Integer getUnreadCount(Integer entrustedCase, Integer from);

	List<MessageEntity> getUnreadMsgToUser(UserEntity user);

	List<MessageEntity> getMsgWithUser(Integer entrustedCase, Integer with);

}
