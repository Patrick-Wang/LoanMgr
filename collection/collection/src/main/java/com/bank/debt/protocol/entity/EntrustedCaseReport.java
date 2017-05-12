package com.bank.debt.protocol.entity;

import java.io.IOException;
import java.lang.reflect.Field;
import java.util.List;

import com.bank.debt.protocol.tools.JsonUtil;
import com.bank.debt.protocol.tools.JsonUtil.PropertyHandler;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

public class EntrustedCaseReport  extends ProtocolEntityImpl{
	Integer id;
	Integer entrustedCaseId;
	String date;
	String title;
	String content;
	Integer phoneRecId;
	List<Attachement> attachements;

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

	public List<Attachement> getAttachements() {
		return attachements;
	}

	public void setAttachements(List<Attachement> attachements) {
		this.attachements = attachements;
	}

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}
	
	@Override
	public ProtocolEntity fromJson(JSONObject jo) throws IOException {
		return (ProtocolEntity) JsonUtil.toObject(jo, this, new PropertyHandler(){

			@Override
			public Object toBeanValue(Field beanField, Object jsonObj) {
				if (beanField.getName().equals("attachements")){
					return JsonUtil.toObjects((JSONArray) jsonObj, Attachement.class);
				}
				return null;
			}
			
		});
	}

	public Integer getPhoneRecId() {
		return phoneRecId;
	}

	public void setPhoneRecId(Integer phoneRecId) {
		this.phoneRecId = phoneRecId;
	}
}
