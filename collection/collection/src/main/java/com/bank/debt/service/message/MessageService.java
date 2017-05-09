package com.bank.debt.service.message;

import java.io.IOException;
import java.util.List;

import org.springframework.web.multipart.commons.CommonsMultipartFile;

import com.bank.debt.protocol.entity.Message;
import com.bank.debt.protocol.entity.Result;

public interface MessageService {

	Integer getUnreadCount(Integer entrustedCase, String toUser);

	void readMessages(List<Integer> msgIds);

	List<Message> getUnreadMessages(String userName);

	List<Message> getMsgsWith(String userName, Integer entrustedCase, Integer with);

	Result sendMessage(Integer entrustedCase, String userName, Integer to, String title,
			String message, CommonsMultipartFile[] attachements) throws IOException;

	List<Message> getSendMessages(String userName, Integer read);


}
