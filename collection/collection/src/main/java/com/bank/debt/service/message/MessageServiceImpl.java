package com.bank.debt.service.message;

import javax.annotation.Resource;
import com.bank.debt.model.dao.message.MessageDaoImpl;
import com.bank.debt.model.dao.message.MessageDao;
import com.bank.debt.service.message.MessageService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service(MessageServiceImpl.NAME)
@Transactional("transaction")
public class MessageServiceImpl implements MessageService {
	@Resource(name=MessageDaoImpl.NAME)
	MessageDao messageDao;

	public final static String NAME = "MessageServiceImpl";

}
