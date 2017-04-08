package com.bank.debt.model.dao.user;


import com.bank.debt.model.entity.UserEntity;
import com.speed.frame.model.dao.AbstractReadWriteDaoImpl;
import com.bank.debt.model.dao.user.UserDao;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;



@Repository(UserDaoImpl.NAME)
@Transactional("transaction")
public class UserDaoImpl extends AbstractReadWriteDaoImpl<UserEntity> implements UserDao {
	public final static String NAME = "UserDaoImpl";

	@PersistenceContext(unitName = "localDB")
	public void setEntityManager(EntityManager entityManager) {
		super.setEntityManager(entityManager);
	}
}
