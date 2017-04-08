package com.bank.debt.model.dao.organization;


import com.bank.debt.model.entity.OrganizationEntity;
import com.speed.frame.model.dao.AbstractReadWriteDaoImpl;
import com.bank.debt.model.dao.organization.OrganizationDao;

import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;

import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;



@Repository(OrganizationDaoImpl.NAME)
@Transactional("transaction")
public class OrganizationDaoImpl extends AbstractReadWriteDaoImpl<OrganizationEntity> implements OrganizationDao {
	public final static String NAME = "OrganizationDaoImpl";

	@PersistenceContext(unitName = "localDB")
	public void setEntityManager(EntityManager entityManager) {
		super.setEntityManager(entityManager);
	}

	@Override
	public List<OrganizationEntity> getOrgs() {
		Query q = this.getEntityManager().createQuery("from OrganizationEntity where parent is null");
		return q.getResultList();
	}
}
