package com.bank.debt.model.dao.user;


import com.bank.debt.model.dao.user.UserDao;
import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;

import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.bank.debt.model.entity.UserEntity;
import com.speed.frame.model.dao.AbstractReadWriteDaoImpl;



@Repository(UserDaoImpl.NAME)
@Transactional("transaction")
public class UserDaoImpl extends AbstractReadWriteDaoImpl<UserEntity> implements UserDao {
	public final static String NAME = "UserDaoImpl";

	@PersistenceContext(unitName = "localDB")
	public void setEntityManager(EntityManager entityManager) {
		super.setEntityManager(entityManager);
	}

	@Override
	public UserEntity getUserByName(String name) {
		Query q = this.getEntityManager().createQuery("from UserEntity where username = :name");
		q.setParameter("name", name);
		List r = q.getResultList();
		if (r.isEmpty()){
			return null;
		}
		return (UserEntity) r.get(0);
	}

	@Override
	public List<UserEntity> getUserByIfs(List<String> ifList) {
		Query q = this.getEntityManager().createQuery("select role.id from AuthorityEntity where intf.address in :ifs group by role.id");
		q.setParameter("ifs", ifList);
		List r = q.getResultList();
		if (r.isEmpty()){
			return null;
		}
		
		q = this.getEntityManager().createNativeQuery("select user from user_role where role in :roles");
		q.setParameter("roles", r);
		r = q.getResultList();
		if (r.isEmpty()){
			return null;
		}
		
		q = this.getEntityManager().createQuery("from UserEntity where id in :uids");
		q.setParameter("uids", r);
		r = q.getResultList();
		if (r.isEmpty()){
			return null;
		}
		return r;
	}

	@Override
	public Integer getCount() {
		Query q = this.getEntityManager().createQuery("select count(*) from UserEntity");
		List r = q.getResultList();
		return ((Long) r.get(0)).intValue();
	}
}
