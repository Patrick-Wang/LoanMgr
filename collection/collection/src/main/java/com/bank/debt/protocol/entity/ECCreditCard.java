package com.bank.debt.protocol.entity;

import java.io.IOException;
import java.io.UnsupportedEncodingException;
import java.lang.reflect.Field;
import java.util.List;

import com.bank.debt.model.entity.ECCreditCardEntity;
import com.bank.debt.protocol.tools.JsonUtil;
import com.bank.debt.protocol.tools.JsonUtil.PropertyHandler;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;


public class ECCreditCard extends ECCreditCardEntity implements ProtocolEntity{

	Integer managerId;
	List<EntrustedCaseReport> reports;
	List<Message> messages;
	
	public Integer getManagerId() {
		return managerId;
	}

	public void setManagerId(Integer managerId) {
		this.managerId = managerId;
	}

	public List<EntrustedCaseReport> getReports() {
		return reports;
	}

	public void setReports(List<EntrustedCaseReport> reports) {
		this.reports = reports;
	}

	public List<Message> getMessages() {
		return messages;
	}

	public void setMessages(List<Message> messages) {
		this.messages = messages;
	}

	public byte[] toUtf8Json() throws UnsupportedEncodingException {
		return JsonUtil.toUtf8Json(this);
	}
	
	public String toJson() throws UnsupportedEncodingException {
		return JsonUtil.toJson(this);
	}
	
	@Override
	public ProtocolEntity fromJson(JSONObject jo) throws IOException {
		return (ProtocolEntity) JsonUtil.toObject(jo, this, new PropertyHandler(){

			@Override
			public Object toBeanValue(Field beanField, Object jsonObj) {
				if (beanField.getName().equals("reports")){
					return JsonUtil.toObjects((JSONArray) jsonObj, EntrustedCaseReport.class);
				}
				if (beanField.getName().equals("messages")){
					return JsonUtil.toObjects((JSONArray) jsonObj, Message.class);
				}
				return null;
			}
			
		});
	}
	
}
