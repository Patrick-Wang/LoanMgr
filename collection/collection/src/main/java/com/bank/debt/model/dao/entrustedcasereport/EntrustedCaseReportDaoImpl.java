package com.bank.debt.model.dao.entrustedcasereport;


import java.sql.Date;
import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;

import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.bank.debt.model.entity.EntrustedCaseReportEntity;
import com.speed.frame.model.dao.AbstractReadWriteDaoImpl;



@Repository(EntrustedCaseReportDaoImpl.NAME)
@Transactional("transaction")
public class EntrustedCaseReportDaoImpl extends AbstractReadWriteDaoImpl<EntrustedCaseReportEntity> implements EntrustedCaseReportDao {
	public final static String NAME = "EntrustedCaseReportDaoImpl";

	@PersistenceContext(unitName = "localDB")
	public void setEntityManager(EntityManager entityManager) {
		super.setEntityManager(entityManager);
	}

	@Override
	public List<EntrustedCaseReportEntity> getByECId(Integer ecId) {
		Query q = this.getEntityManager().createQuery(" from EntrustedCaseReportEntity where entrustedCaseManager.id = :ecId");
		q.setParameter("ecId", ecId);
		return q.getResultList();
	}

	@Override
	public List<EntrustedCaseReportEntity> getByECId(Integer ecId, Date date) {
		Query q = this.getEntityManager().createQuery(" from EntrustedCaseReportEntity where entrustedCaseManager.id = :ecId and date = :date");
		q.setParameter("ecId", ecId);
		q.setParameter("date", date);
		return q.getResultList();
	}
}
