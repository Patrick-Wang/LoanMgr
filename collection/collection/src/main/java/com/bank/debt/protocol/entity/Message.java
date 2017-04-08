package com.bank.debt.protocol.entity;

public class Message {
	Integer fromId;
	String fromName;
	Integer toId;
	String toName;
	String content;
	String[] attachements[];

	public Integer getFromId() {
		return fromId;
	}

	public void setFromId(Integer fromId) {
		this.fromId = fromId;
	}

	public String getFromName() {
		return fromName;
	}

	public void setFromName(String fromName) {
		this.fromName = fromName;
	}

	public Integer getToId() {
		return toId;
	}

	public void setToId(Integer toId) {
		this.toId = toId;
	}

	public String getToName() {
		return toName;
	}

	public void setToName(String toName) {
		this.toName = toName;
	}

	public String getContent() {
		return content;
	}

	public void setContent(String content) {
		this.content = content;
	}

	public String[][] getAttachements() {
		return attachements;
	}

	public void setAttachements(String[][] attachements) {
		this.attachements = attachements;
	}

	public String getSendTime() {
		return sendTime;
	}

	public void setSendTime(String sendTime) {
		this.sendTime = sendTime;
	}

	public Integer getRead() {
		return read;
	}

	public void setRead(Integer read) {
		this.read = read;
	}

	String sendTime;// 2013-12-11 58:11:23
	Integer read;
}
