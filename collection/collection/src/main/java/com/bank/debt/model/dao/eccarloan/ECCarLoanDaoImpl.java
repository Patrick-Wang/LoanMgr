package com.bank.debt.model.dao.eccarloan;


import com.bank.debt.model.entity.ECCarLoanEntity;
import com.bank.debt.model.entity.UserEntity;
import com.bank.debt.protocol.entity.ECCarLoan;
import com.bank.debt.protocol.entity.QueryOption;
import com.speed.frame.model.dao.AbstractReadWriteDaoImpl;
import com.bank.debt.model.dao.eccarloan.ECCarLoanDao;

import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;

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

	@Override
	public int getCompleteForOwner(UserEntity ue) {
		Query q = this.getEntityManager().createQuery("select count(*) "
				+ "from ECCarLoanEntity eccle, EntrustedCaseManagerEntity ecme "
				+ "where eccle.id = ecme.entrustedCase and "
				+ "wwzt='已结案' and "
				+ "ecme.owner.id = :uid");
		q.setParameter("uid", ue.getId());
		List ret = q.getResultList();
		return ((Long)(ret.get(0))).intValue();
	}

	@Override
	public int getCompleteForAssignee(UserEntity ue) {
		Query q = this.getEntityManager().createQuery("select count(*) "
				+ "from ECCarLoanEntity eccle, EntrustedCaseManagerEntity ecme "
				+ "where eccle.id = ecme.entrustedCase and "
				+ "wwzt='已结案' and "
				+ "ecme.assignee.id = :uid");
		q.setParameter("uid", ue.getId());
		List ret = q.getResultList();
		return ((Long)(ret.get(0))).intValue();
	}
}
