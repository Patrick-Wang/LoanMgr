package com.bank.debt.model.dao.ecbatchcreator;


import java.sql.Timestamp;
import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;

import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.bank.debt.model.entity.ECBatchCreatorEntity;
import com.speed.frame.model.dao.AbstractReadWriteDaoImpl;



@Repository(ECBatchCreatorDaoImpl.NAME)
@Transactional("transaction")
public class ECBatchCreatorDaoImpl extends AbstractReadWriteDaoImpl<ECBatchCreatorEntity> implements ECBatchCreatorDao {
	public final static String NAME = "ECBatchCreatorDaoImpl";

	@PersistenceContext(unitName = "localDB")
	public void setEntityManager(EntityManager entityManager) {
		super.setEntityManager(entityManager);
	}

	@Override
	public Integer createBatchNo(Timestamp time) {
		Query q = this.getEntityManager().createQuery("select id from ECBatchCreatorEntity where createdTime = :time");
		q.setParameter("time", time);
		List ret = q.getResultList();
		if (ret.isEmpty()){
			ECBatchCreatorEntity entity = new ECBatchCreatorEntity();
			entity.setCreatedTime(time);
			return this.getEntityManager().merge(entity).getId();
		}else{
			return (Integer) ret.get(0);
		}
	}
}
