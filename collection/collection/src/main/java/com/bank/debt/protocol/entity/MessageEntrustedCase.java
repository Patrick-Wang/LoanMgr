package com.bank.debt.protocol.entity;

import java.util.List;

public class MessageEntrustedCase  extends ProtocolEntity{
	Integer entrustedCaseId;
	List<MessageSummary> msgSummary;

	public Integer getEntrustedCaseId() {
		return entrustedCaseId;
	}

	public void setEntrustedCaseId(Integer entrustedCaseId) {
		this.entrustedCaseId = entrustedCaseId;
	}

	public List<MessageSummary> getMsgSummary() {
		return msgSummary;
	}

	public void setMsgSummary(List<MessageSummary> msgSummary) {
		this.msgSummary = msgSummary;
	}
}
