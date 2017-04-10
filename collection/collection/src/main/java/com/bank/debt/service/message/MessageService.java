package com.bank.debt.service.message;

import java.io.IOException;
import java.util.List;

import org.springframework.web.multipart.commons.CommonsMultipartFile;

import com.bank.debt.protocol.entity.Message;
import com.bank.debt.protocol.entity.MessageEntrustedCase;
import com.bank.debt.protocol.entity.Result;

public interface MessageService {

	Integer getUnreadCount(Integer entrustedCase);

	void readMessages(List<Integer> msgIds);

	List<MessageEntrustedCase> getMessageEntrustedCases(String userName);

	List<Message> getMsgsWith(Integer entrustedCase, Integer with);

	Result sendMessage(Integer entrustedCase, String userName, Integer to, String message,
			CommonsMultipartFile[] attachements) throws IOException;


}
