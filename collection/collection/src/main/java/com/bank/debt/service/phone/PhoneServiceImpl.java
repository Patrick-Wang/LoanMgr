package com.bank.debt.service.phone;

import com.bank.debt.service.phone.PhoneService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service(PhoneServiceImpl.NAME)
@Transactional("transaction")
public class PhoneServiceImpl implements PhoneService {
	public final static String NAME = "PhoneServiceImpl";

}
