package com.bank.debt.model.dao.ecbatchcreator;


import com.bank.debt.model.entity.ECBatchCreatorEntity;
import com.speed.frame.model.dao.AbstractReadWriteDaoImpl;
import com.bank.debt.model.dao.ecbatchcreator.ECBatchCreatorDao;

import java.sql.Timestamp;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;



@Repository(ECBatchCreatorDaoImpl.NAME)
@Transactional("transaction")
public class ECBatchCreatorDaoImpl extends AbstractReadWriteDaoImpl<ECBatchCreatorEntity> implements ECBatchCreatorDao {
	public final static String NAME = "ECBatchCreatorDaoImpl";

	@PersistenceContext(unitName = "localDB")
	public void setEntityManager(EntityManager entityManager) {
		super.setEntityManager(entityManager);
	}

	@Override
	public Integer createBatchNo(Timestamp current) {
		ECBatchCreatorEntity entity = new ECBatchCreatorEntity();
		entity.setCreatedTime(current);
		return this.getEntityManager().merge(entity).getId();
	}
}
