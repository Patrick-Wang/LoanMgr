package com.bank.debt.model.dao.eccreditloan;


import com.bank.debt.model.entity.ECCreditLoanEntity;
import com.bank.debt.protocol.entity.ECCreditLoan;
import com.bank.debt.protocol.entity.QueryOption;
import com.speed.frame.model.dao.AbstractReadWriteDaoImpl;
import com.bank.debt.model.dao.eccreditloan.ECCreditLoanDao;

import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;



@Repository(ECCreditLoanDaoImpl.NAME)
@Transactional("transaction")
public class ECCreditLoanDaoImpl extends AbstractReadWriteDaoImpl<ECCreditLoanEntity> implements ECCreditLoanDao {
	public final static String NAME = "ECCreditLoanDaoImpl";

	@PersistenceContext(unitName = "localDB")
	public void setEntityManager(EntityManager entityManager) {
		super.setEntityManager(entityManager);
	}

	@Override
	public List<ECCreditLoan> search(QueryOption qOpt) {
		// TODO Auto-generated method stub
		return null;
	}
}
