package com.bank.debt.model.dao.entrustedcasereport;
import java.util.List;

import com.bank.debt.model.entity.EntrustedCaseReportEntity;
import com.speed.frame.model.dao.AbstractReadWriteDao;



public interface EntrustedCaseReportDao extends AbstractReadWriteDao<EntrustedCaseReportEntity> {

	List<EntrustedCaseReportEntity> getByECId(Integer ecId);

}
