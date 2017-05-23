package com.bank.debt.model.dao.area;


import com.bank.debt.model.entity.AreaEntity;
import com.bank.debt.model.entity.IntfEntity;
import com.speed.frame.model.dao.AbstractReadWriteDaoImpl;
import com.bank.debt.model.dao.intf.IntfDao;

import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;

import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;



@Repository(AreaDaoImpl.NAME)
@Transactional("transaction")
public class AreaDaoImpl extends AbstractReadWriteDaoImpl<AreaEntity> implements AreaDao {
	public final static String NAME = "AreaDaoImpl";

	@PersistenceContext(unitName = "localDB")
	public void setEntityManager(EntityManager entityManager) {
		super.setEntityManager(entityManager);
	}

	@Override
	public String getArea(String pid) {
		Query q = this.getEntityManager().createQuery("select area from AreaEntity where PID = :pid");
		q.setParameter("pid", pid);
		List ret = q.getResultList();
		if (ret.isEmpty()){
			return null;
		}
		return (String) ret.get(0);
	}
}
