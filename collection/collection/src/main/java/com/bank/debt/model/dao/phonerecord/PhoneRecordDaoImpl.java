package com.bank.debt.model.dao.phonerecord;


import com.bank.debt.model.entity.PhoneRecordEntity;
import com.speed.frame.model.dao.AbstractReadWriteDaoImpl;
import com.bank.debt.model.dao.phonerecord.PhoneRecordDao;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;



@Repository(PhoneRecordDaoImpl.NAME)
@Transactional("transaction")
public class PhoneRecordDaoImpl extends AbstractReadWriteDaoImpl<PhoneRecordEntity> implements PhoneRecordDao {
	public final static String NAME = "PhoneRecordDaoImpl";

	@PersistenceContext(unitName = "localDB")
	public void setEntityManager(EntityManager entityManager) {
		super.setEntityManager(entityManager);
	}
}
