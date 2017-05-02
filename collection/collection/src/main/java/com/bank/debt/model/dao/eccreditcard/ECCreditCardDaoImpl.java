package com.bank.debt.model.dao.eccreditcard;


import java.sql.Date;
import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;

import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.bank.debt.model.entity.ECCreditCardEntity;
import com.bank.debt.model.entity.UserEntity;
import com.bank.debt.protocol.entity.QueryOption;
import com.speed.frame.model.dao.AbstractReadWriteDaoImpl;



@Repository(ECCreditCardDaoImpl.NAME)
@Transactional("transaction")
public class ECCreditCardDaoImpl extends AbstractReadWriteDaoImpl<ECCreditCardEntity> implements ECCreditCardDao {
	public final static String NAME = "ECCreditCardDaoImpl";

	@PersistenceContext(unitName = "localDB")
	public void setEntityManager(EntityManager entityManager) {
		super.setEntityManager(entityManager);
	}

	@Override
	public List<Object[]> search(QueryOption qOpt) {
		String sql = "select ecme, eccle from ECCreditCardEntity eccle, EntrustedCaseManagerEntity ecme";
		String where = " where ecme.entrustedCase = eccle.id and type=2";
		if (qOpt.getName() != null){
			where += " and khxm=:name ";
		}
		
		if (qOpt.getPIN() != null){
			where += " and  khsfzh = :pin ";
		}
		
		if (qOpt.getCode() != null){
			where += " and  code = :code ";
		}
		
		if (qOpt.getWwrq() != null){
			where += " and  wwrq = :wwrq ";
		}
		
		if (qOpt.getWwjg() != null){
			where += " and  wwjg = :wwjg ";
		}
		
		if (qOpt.getWwzt() != null){
			where += " and  wwzt = :wwzt ";
		}

		Query q = this.getEntityManager().createQuery(sql + where);
		
		if (qOpt.getName() != null){
			q.setParameter("name", qOpt.getName());
		}
		
		if (qOpt.getPIN() != null){
			q.setParameter("pin", qOpt.getPIN());
		}
		
		if (qOpt.getCode() != null){
			q.setParameter("code", qOpt.getCode());
		}
		
		if (qOpt.getWwrq() != null){
			q.setParameter("wwrq", Date.valueOf(qOpt.getWwrq()));
		}
		
		if (qOpt.getWwjg() != null){
			q.setParameter("wwjg", qOpt.getWwjg());
		}
		
		if (qOpt.getWwzt() != null){
			q.setParameter("wwzt", qOpt.getWwzt());
		}
		
		return q.getResultList();
	}

	@Override
	public int getCompleteForOwner(UserEntity ue) {
		Query q = this.getEntityManager().createQuery("select count(*) from "
				+ "ECCreditCardEntity eccce, EntrustedCaseManagerEntity ecme "
				+ "where eccce.id = ecme.entrustedCase and "
				+ "wwzt='已结案' and "
				+ "ecme.owner.id = :uid");
		q.setParameter("uid", ue.getId());
		List ret = q.getResultList();
		return ((Long)(ret.get(0))).intValue();
	}

	@Override
	public int getCompleteForAssignee(UserEntity ue) {
		Query q = this.getEntityManager().createQuery("select count(*) from "
				+ "ECCreditCardEntity eccce, EntrustedCaseManagerEntity ecme "
				+ "where eccce.id = ecme.entrustedCase and "
				+ "wwzt='已结案' and "
				+ "ecme.assignee.id = :uid");
		q.setParameter("uid", ue.getId());
		List ret = q.getResultList();
		return ((Long)(ret.get(0))).intValue();
	}
}
