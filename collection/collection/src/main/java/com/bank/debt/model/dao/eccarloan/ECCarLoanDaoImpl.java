package com.bank.debt.model.dao.eccarloan;


import com.bank.debt.model.entity.ECCarLoanEntity;
import com.speed.frame.model.dao.AbstractReadWriteDaoImpl;
import com.bank.debt.model.dao.eccarloan.ECCarLoanDao;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;



@Repository(ECCarLoanDaoImpl.NAME)
@Transactional("transaction")
public class ECCarLoanDaoImpl extends AbstractReadWriteDaoImpl<ECCarLoanEntity> implements ECCarLoanDao {
	public final static String NAME = "ECCarLoanDaoImpl";

	@PersistenceContext(unitName = "localDB")
	public void setEntityManager(EntityManager entityManager) {
		super.setEntityManager(entityManager);
	}
}
