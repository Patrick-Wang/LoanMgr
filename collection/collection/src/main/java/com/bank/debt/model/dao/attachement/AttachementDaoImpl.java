package com.bank.debt.model.dao.attachement;


import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;

import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.bank.debt.model.entity.AttachementEntity;
import com.speed.frame.model.dao.AbstractReadWriteDaoImpl;



@Repository(AttachementDaoImpl.NAME)
@Transactional("transaction")
public class AttachementDaoImpl extends AbstractReadWriteDaoImpl<AttachementEntity> implements AttachementDao {
	public final static String NAME = "AttachementDaoImpl";

	@PersistenceContext(unitName = "localDB")
	public void setEntityManager(EntityManager entityManager) {
		super.setEntityManager(entityManager);
	}

	@Override
	public AttachementEntity getByDisplayName(String displayName) {
		Query q = this.getEntityManager().createQuery("from AttachementEntity where display = :display");
		q.setParameter("display", displayName);
		List ret = q.getResultList();
		if (ret.isEmpty()){
			return null;
		}
		return (AttachementEntity) ret.get(0);
	}
}
