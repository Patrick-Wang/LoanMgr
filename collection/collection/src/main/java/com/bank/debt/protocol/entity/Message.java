package com.bank.debt.protocol.entity;

import java.io.IOException;
import java.lang.reflect.Field;
import java.util.List;

import com.bank.debt.protocol.tools.JsonUtil;
import com.bank.debt.protocol.tools.JsonUtil.PropertyHandler;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

public class Message  extends ProtocolEntityImpl{
	Integer msgId;
	Integer fromId;
	String fromName;
	Integer toId;
	String toName;
	String content;
	List<String> attachements;

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

	public List<String> getAttachements() {
		return attachements;
	}

	public void setAttachements(List<String> attachements) {
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

	public Integer getMsgId() {
		return msgId;
	}

	public void setMsgId(Integer msgId) {
		this.msgId = msgId;
	}

	@Override
	public ProtocolEntity fromJson(JSONObject jo) throws IOException {
		return (ProtocolEntity) JsonUtil.toObject(jo, this, new PropertyHandler(){

			@Override
			public Object toBeanValue(Field beanField, Object jsonObj) {
				if (beanField.getName().equals("attachements")){
					return JsonUtil.toObjects((JSONArray) jsonObj, String.class, null);
				}
				return null;
			}
			
		});
	}
}
