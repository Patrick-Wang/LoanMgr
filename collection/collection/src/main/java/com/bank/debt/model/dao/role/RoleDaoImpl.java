package com.bank.debt.model.dao.role;


import com.bank.debt.model.entity.RoleEntity;
import com.speed.frame.model.dao.AbstractReadWriteDaoImpl;
import com.bank.debt.model.dao.role.RoleDao;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;



@Repository(RoleDaoImpl.NAME)
@Transactional("transaction")
public class RoleDaoImpl extends AbstractReadWriteDaoImpl<RoleEntity> implements RoleDao {
	public final static String NAME = "RoleDaoImpl";

	@PersistenceContext(unitName = "localDB")
	public void setEntityManager(EntityManager entityManager) {
		super.setEntityManager(entityManager);
	}
}
