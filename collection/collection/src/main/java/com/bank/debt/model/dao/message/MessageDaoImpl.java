package com.bank.debt.model.dao.message;


import com.bank.debt.model.entity.MessageEntity;
import com.speed.frame.model.dao.AbstractReadWriteDaoImpl;
import com.bank.debt.model.dao.message.MessageDao;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;



@Repository(MessageDaoImpl.NAME)
@Transactional("transaction")
public class MessageDaoImpl extends AbstractReadWriteDaoImpl<MessageEntity> implements MessageDao {
	public final static String NAME = "MessageDaoImpl";

	@PersistenceContext(unitName = "localDB")
	public void setEntityManager(EntityManager entityManager) {
		super.setEntityManager(entityManager);
	}
}
