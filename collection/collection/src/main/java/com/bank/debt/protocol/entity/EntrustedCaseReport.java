package com.bank.debt.protocol.entity;

public class EntrustedCaseReport {
	Integer id;
	Integer entrustedCaseId;
	String date;
	String content;
	String[] attachements;

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public Integer getEntrustedCaseId() {
		return entrustedCaseId;
	}

	public void setEntrustedCaseId(Integer entrustedCaseId) {
		this.entrustedCaseId = entrustedCaseId;
	}

	public String getDate() {
		return date;
	}

	public void setDate(String date) {
		this.date = date;
	}

	public String getContent() {
		return content;
	}

	public void setContent(String content) {
		this.content = content;
	}

	public String[] getAttachements() {
		return attachements;
	}

	public void setAttachements(String[] attachements) {
		this.attachements = attachements;
	}
}
