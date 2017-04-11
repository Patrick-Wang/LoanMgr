package com.bank.debt.service.ecmanager;

import javax.annotation.Resource;
import com.bank.debt.model.dao.entrustedcasemanager.EntrustedCaseManagerDaoImpl;
import com.bank.debt.model.dao.entrustedcasemanager.EntrustedCaseManagerDao;
import com.bank.debt.service.ecmanager.ECManagerService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service(ECManagerServiceImpl.NAME)
@Transactional("transaction")
public class ECManagerServiceImpl implements ECManagerService {
	@Resource(name=EntrustedCaseManagerDaoImpl.NAME)
	EntrustedCaseManagerDao entrustedCaseManagerDao;

	public final static String NAME = "ECManagerServiceImpl";

}
