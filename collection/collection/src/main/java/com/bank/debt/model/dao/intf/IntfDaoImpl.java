package com.bank.debt.model.dao.intf;


import com.bank.debt.model.entity.IntfEntity;
import com.speed.frame.model.dao.AbstractReadWriteDaoImpl;
import com.bank.debt.model.dao.intf.IntfDao;

import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;

import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;



@Repository(IntfDaoImpl.NAME)
@Transactional("transaction")
public class IntfDaoImpl extends AbstractReadWriteDaoImpl<IntfEntity> implements IntfDao {
	public final static String NAME = "IntfDaoImpl";

	@PersistenceContext(unitName = "localDB")
	public void setEntityManager(EntityManager entityManager) {
		super.setEntityManager(entityManager);
	}

	@Override
	public List<IntfEntity> getUIIfs() {
		Query q = this.getEntityManager().createQuery("from IntfEntity where id > 2000");
		return q.getResultList();
	}
	
	@Override
	public List<IntfEntity> getDataIfs() {
		Query q = this.getEntityManager().createQuery("from IntfEntity where id > 1000 and id <= 2000");
		return q.getResultList();
	}
}
