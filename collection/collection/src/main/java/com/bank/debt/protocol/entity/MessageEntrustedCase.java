package com.bank.debt.protocol.entity;

public class MessageEntrustedCase {
	Integer entrustedCaseId;
	MessageSummary[] msgSummary;

	public Integer getEntrustedCaseId() {
		return entrustedCaseId;
	}

	public void setEntrustedCaseId(Integer entrustedCaseId) {
		this.entrustedCaseId = entrustedCaseId;
	}

	public MessageSummary[] getMsgSummary() {
		return msgSummary;
	}

	public void setMsgSummary(MessageSummary[] msgSummary) {
		this.msgSummary = msgSummary;
	}
}
