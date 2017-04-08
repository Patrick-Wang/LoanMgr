package com.bank.debt.model.dao.authority;


import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;

import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.bank.debt.model.entity.AuthorityEntity;
import com.speed.frame.model.dao.AbstractReadWriteDaoImpl;



@Repository(AuthorityDaoImpl.NAME)
@Transactional("transaction")
public class AuthorityDaoImpl extends AbstractReadWriteDaoImpl<AuthorityEntity> implements AuthorityDao {
	public final static String NAME = "AuthIFDaoImpl";

	@PersistenceContext(unitName = "localDB")
	public void setEntityManager(EntityManager entityManager) {
		super.setEntityManager(entityManager);
	}

	@Override
	public List<String> getRoleByUrl(String url) {
		Query q = this.getEntityManager().createQuery("select role.name from AuthorityEntity where intf.address = url");
		return q.getResultList();
	}
}
