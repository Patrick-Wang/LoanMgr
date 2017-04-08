package com.bank.debt.service.authority;

import com.bank.debt.service.authority.AuthorityService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service(AuthorityServiceImpl.NAME)
@Transactional("transaction")
public class AuthorityServiceImpl implements AuthorityService {
	public final static String NAME = "AuthorityServiceImpl";

}
