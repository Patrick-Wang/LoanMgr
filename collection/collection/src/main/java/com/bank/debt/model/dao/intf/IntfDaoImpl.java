package com.bank.debt.model.dao.intf;


import com.bank.debt.model.entity.IntfEntity;
import com.speed.frame.model.dao.AbstractReadWriteDaoImpl;
import com.bank.debt.model.dao.intf.IntfDao;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

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
}
