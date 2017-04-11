package com.bank.debt.model.dao.eccreditcard;


import com.bank.debt.model.entity.ECCreditCardEntity;
import com.speed.frame.model.dao.AbstractReadWriteDaoImpl;
import com.bank.debt.model.dao.eccreditcard.ECCreditCardDao;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;



@Repository(ECCreditCardDaoImpl.NAME)
@Transactional("transaction")
public class ECCreditCardDaoImpl extends AbstractReadWriteDaoImpl<ECCreditCardEntity> implements ECCreditCardDao {
	public final static String NAME = "ECCreditCardDaoImpl";

	@PersistenceContext(unitName = "localDB")
	public void setEntityManager(EntityManager entityManager) {
		super.setEntityManager(entityManager);
	}
}
