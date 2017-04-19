package com.bank.debt.model.dao.eccreditloan;


import com.bank.debt.model.entity.ECCreditLoanEntity;
import com.bank.debt.model.entity.UserEntity;
import com.bank.debt.protocol.entity.ECCreditLoan;
import com.bank.debt.protocol.entity.QueryOption;
import com.speed.frame.model.dao.AbstractReadWriteDaoImpl;
import com.bank.debt.model.dao.eccreditloan.ECCreditLoanDao;

import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;

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

	@Override
	public int getCompleteForOwner(UserEntity ue) {
		Query q = this.getEntityManager().createQuery("select count(*) from ECCreditLoanEntity eccle, EntrustedCaseManagerEntity ecme where eccle.id = ecme.entrustedCase and eccle。wwzt='已结案' and ecme.owner.id = :uid");
		q.setParameter("uid", ue.getId());
		List ret = q.getResultList();
		return ((Long)(ret.get(0))).intValue();
	}

	@Override
	public int getCompleteForAssignee(UserEntity ue) {
		Query q = this.getEntityManager().createQuery("select count(*) from ECCreditLoanEntity eccle, EntrustedCaseManagerEntity ecme where eccle.id = ecme.entrustedCase and eccle。wwzt='已结案' and ecme.assignee.id = :uid");
		q.setParameter("uid", ue.getId());
		List ret = q.getResultList();
		return ((Long)(ret.get(0))).intValue();
	}
}
