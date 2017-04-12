package com.bank.debt.service.ftp;

import com.bank.debt.service.ftp.FtpService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service(FtpServiceImpl.NAME)
@Transactional("transaction")
public class FtpServiceImpl implements FtpService {
	public final static String NAME = "FtpServiceImpl";

}
