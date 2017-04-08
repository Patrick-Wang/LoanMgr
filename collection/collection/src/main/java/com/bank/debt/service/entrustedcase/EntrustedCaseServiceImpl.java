package com.bank.debt.service.entrustedcase;

import com.bank.debt.model.dao.entrustedcasereport.EntrustedCaseReportDaoImpl;
import com.bank.debt.model.dao.entrustedcasereport.EntrustedCaseReportDao;
import javax.annotation.Resource;
import com.bank.debt.model.dao.entrustedcasemanager.EntrustedCaseManagerDaoImpl;
import com.bank.debt.model.dao.entrustedcasemanager.EntrustedCaseManagerDao;
import com.bank.debt.service.entrustedcase.EntrustedCaseService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service(EntrustedCaseServiceImpl.NAME)
@Transactional("transaction")
public class EntrustedCaseServiceImpl implements EntrustedCaseService {
	@Resource(name=EntrustedCaseReportDaoImpl.NAME)
	EntrustedCaseReportDao entrustedCaseReportDao;

	@Resource(name=EntrustedCaseManagerDaoImpl.NAME)
	EntrustedCaseManagerDao entrustedCaseManagerDao;

	public final static String NAME = "EntrustedCaseServiceImpl";

}
