package com.bank.debt.model.dao.authority;


import com.bank.debt.model.dao.authority.AuthorityDao;
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
		Query q = this.getEntityManager().createQuery("select role.name from AuthorityEntity where intf.address = :url");
		q.setParameter("url", url);
		return q.getResultList();
	}
	
	@Override
	public List<Integer> getIfsByRoleId(Integer roleId) {
		Query q = this.getEntityManager().createQuery("select intf.id from AuthorityEntity where role.id = :role");
		q.setParameter("role", roleId);
		return q.getResultList();
	}

	@Override
	public void deleteAuthority(Integer roleId, List<Integer> ifs) {
		Query q = this.getEntityManager().createQuery("delete from AuthorityEntity where role.id = :role and intf.id in :ifs");
		q.setParameter("role", roleId);
		q.setParameter("ifs", ifs);
		q.executeUpdate();
	}

	@Override
	public AuthorityEntity getAuthority(Integer roleId, Integer id) {
		Query q = this.getEntityManager().createQuery("from AuthorityEntity where role.id = :role and intf.id in :id");
		q.setParameter("role", roleId);
		q.setParameter("id", id);
		List r = q.getResultList();
		if (r.isEmpty()){
			return null;
		}
		return (AuthorityEntity) r.get(0);
	}
}
