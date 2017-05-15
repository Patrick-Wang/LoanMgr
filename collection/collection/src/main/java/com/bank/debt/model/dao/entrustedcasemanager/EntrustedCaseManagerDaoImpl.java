package com.bank.debt.model.dao.entrustedcasemanager;


import com.bank.debt.model.entity.EntrustedCaseManagerEntity;
import com.bank.debt.model.entity.UserEntity;
import com.speed.frame.model.dao.AbstractReadWriteDaoImpl;

import oracle.net.aso.e;

import com.bank.debt.model.dao.entrustedcasemanager.EntrustedCaseManagerDao;

import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;

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

	@Override
	public EntrustedCaseManagerEntity getByECId(Integer ecType, Integer ecId) {
		Query q = this.getEntityManager().createQuery(" from EntrustedCaseManagerEntity where type = :type and entrustedCase=:ec");
		q.setParameter("ec", ecId);
		q.setParameter("type", ecType);
		List ret = q.getResultList();
		if (ret.isEmpty()){
			return null;
		}
		return (EntrustedCaseManagerEntity) ret.get(0);
	}

	@Override
	public List<EntrustedCaseManagerEntity> getByOwner(Integer ownerId) {
		Query q = this.getEntityManager().createQuery(" from EntrustedCaseManagerEntity where owner.id = :id");
		q.setParameter("id", ownerId);
		return q.getResultList();
	}

	@Override
	public Integer getAssignedCount(UserEntity ue) {
		Query q = this.getEntityManager().createQuery("select count(*) from EntrustedCaseManagerEntity where owner.id = :id and assignee is not null");
		q.setParameter("id", ue.getId());
		List ret = q.getResultList();
		return ((Long)(ret.get(0))).intValue();
	}

	@Override
	public Integer getTotalForOwner(UserEntity ue) {
		Query q = this.getEntityManager().createQuery("select count(*) from EntrustedCaseManagerEntity where owner.id = :id");
		q.setParameter("id", ue.getId());
		List ret = q.getResultList();
		return ((Long)(ret.get(0))).intValue();
	}

	@Override
	public List<Integer> getBatchNOs() {
		Query q = this.getEntityManager().createQuery("select distinct batchNo from EntrustedCaseManagerEntity where batchNo is not null");
		return q.getResultList();
	}

}
