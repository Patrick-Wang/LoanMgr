package com.bank.debt.model.dao.phonerecord;


import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;

import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.bank.debt.model.entity.PhoneRecordEntity;
import com.speed.frame.model.dao.AbstractReadWriteDaoImpl;



@Repository(PhoneRecordDaoImpl.NAME)
@Transactional("transaction")
public class PhoneRecordDaoImpl extends AbstractReadWriteDaoImpl<PhoneRecordEntity> implements PhoneRecordDao {
	public final static String NAME = "PhoneRecordDaoImpl";

	@PersistenceContext(unitName = "localDB")
	public void setEntityManager(EntityManager entityManager) {
		super.setEntityManager(entityManager);
	}

	@Override
	public PhoneRecordEntity getByAttachement(int id) {
		Query q = this.getEntityManager().createQuery("from PhoneRecordEntity where attachement=:attachement");
		q.setParameter("attachement", id);
		List ret = q.getResultList();
		if (ret.isEmpty()){
			return null;
		}
		return (PhoneRecordEntity) ret.get(0);
	}
	
	@Override
	public void deleteByECM(int id) {
		Query q = this.getEntityManager().createQuery("delete from PhoneRecordEntity where entrustedCaseManager.id = :ecId");
		q.setParameter("ecId", id);
		q.executeUpdate();
	}
}
