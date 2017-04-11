package com.bank.debt.service.ecreport;

import javax.annotation.Resource;
import com.bank.debt.model.dao.entrustedcasereport.EntrustedCaseReportDaoImpl;
import com.bank.debt.model.dao.entrustedcasereport.EntrustedCaseReportDao;
import com.bank.debt.service.ecreport.ECReportService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service(ECReportServiceImpl.NAME)
@Transactional("transaction")
public class ECReportServiceImpl implements ECReportService {
	@Resource(name=EntrustedCaseReportDaoImpl.NAME)
	EntrustedCaseReportDao entrustedCaseReportDao;

	public final static String NAME = "ECReportServiceImpl";

}
