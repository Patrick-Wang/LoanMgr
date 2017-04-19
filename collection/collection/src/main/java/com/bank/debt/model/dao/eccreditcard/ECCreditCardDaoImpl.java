package com.bank.debt.model.dao.eccreditcard;


import com.bank.debt.model.entity.ECCreditCardEntity;
import com.bank.debt.model.entity.UserEntity;
import com.bank.debt.protocol.entity.ECCreditCard;
import com.bank.debt.protocol.entity.QueryOption;
import com.speed.frame.model.dao.AbstractReadWriteDaoImpl;
import com.bank.debt.model.dao.eccreditcard.ECCreditCardDao;

import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;

import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;



@Repository(ECCreditCardDaoImpl.NAME)
@Transactional("transaction")
public class ECCreditCardDaoImpl extends AbstractReadWriteDaoImpl<ECCreditCardEntity> implements ECCreditCardDao {
	public final static String NAME = "ECCreditCardDaoImpl";

	@PersistenceContext(unitName = "localDB")
	public void setEntityManager(EntityManager entityManager) {
		super.setEntityManager(entityManager);
	}

	@Override
	public List<ECCreditCard> search(QueryOption qOpt) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public int getCompleteForOwner(UserEntity ue) {
		Query q = this.getEntityManager().createQuery("select count(*) from ECCreditCardEntity eccce, EntrustedCaseManagerEntity ecme where eccce.id = ecme.entrustedCase and eccce。wwzt='已结案' and ecme.owner.id = :uid");
		q.setParameter("uid", ue.getId());
		List ret = q.getResultList();
		return ((Long)(ret.get(0))).intValue();
	}

	@Override
	public int getCompleteForAssignee(UserEntity ue) {
		Query q = this.getEntityManager().createQuery("select count(*) from ECCreditCardEntity eccce, EntrustedCaseManagerEntity ecme where eccce.id = ecme.entrustedCase and eccce。wwzt='已结案' and ecme.assignee.id = :uid");
		q.setParameter("uid", ue.getId());
		List ret = q.getResultList();
		return ((Long)(ret.get(0))).intValue();
	}
}
