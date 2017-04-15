package com.bank.debt.model.dao.eccarloan;


import com.bank.debt.model.entity.ECCarLoanEntity;
import com.bank.debt.protocol.entity.ECCarLoan;
import com.bank.debt.protocol.entity.QueryOption;
import com.speed.frame.model.dao.AbstractReadWriteDaoImpl;
import com.bank.debt.model.dao.eccarloan.ECCarLoanDao;

import java.util.List;

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

	@Override
	public List<ECCarLoan> search(QueryOption qOpt) {
		// TODO Auto-generated method stub
		return null;
	}
}
