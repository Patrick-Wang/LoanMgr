package com.bank.debt.model.dao.entrustedcasereport;


import com.bank.debt.model.entity.EntrustedCaseReportEntity;
import com.speed.frame.model.dao.AbstractReadWriteDaoImpl;
import com.bank.debt.model.dao.entrustedcasereport.EntrustedCaseReportDao;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;



@Repository(EntrustedCaseReportDaoImpl.NAME)
@Transactional("transaction")
public class EntrustedCaseReportDaoImpl extends AbstractReadWriteDaoImpl<EntrustedCaseReportEntity> implements EntrustedCaseReportDao {
	public final static String NAME = "EntrustedCaseReportDaoImpl";

	@PersistenceContext(unitName = "localDB")
	public void setEntityManager(EntityManager entityManager) {
		super.setEntityManager(entityManager);
	}
}
