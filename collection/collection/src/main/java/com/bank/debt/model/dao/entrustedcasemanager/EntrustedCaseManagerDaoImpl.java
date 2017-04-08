package com.bank.debt.model.dao.entrustedcasemanager;


import com.bank.debt.model.entity.EntrustedCaseManagerEntity;
import com.speed.frame.model.dao.AbstractReadWriteDaoImpl;
import com.bank.debt.model.dao.entrustedcasemanager.EntrustedCaseManagerDao;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;



@Repository(EntrustedCaseManagerDaoImpl.NAME)
@Transactional("transaction")
public class EntrustedCaseManagerDaoImpl extends AbstractReadWriteDaoImpl<EntrustedCaseManagerEntity> implements EntrustedCaseManagerDao {
	public final static String NAME = "EntrustedCaseManagerDaoImpl";

	@PersistenceContext(unitName = "localDB")
	public void setEntityManager(EntityManager entityManager) {
		super.setEntityManager(entityManager);
	}
}
