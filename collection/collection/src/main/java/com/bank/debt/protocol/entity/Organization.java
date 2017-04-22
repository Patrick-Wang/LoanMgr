package com.bank.debt.protocol.entity;

import java.io.IOException;
import java.lang.reflect.Field;
import java.util.List;

import com.bank.debt.protocol.tools.JsonUtil;
import com.bank.debt.protocol.tools.JsonUtil.PropertyHandler;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

public class Organization  extends ProtocolEntityImpl{
	Integer id;
	String name;
	Integer status;
	List<Organization> subOrgs;

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public Integer getStatus() {
		return status;
	}

	public void setStatus(Integer status) {
		this.status = status;
	}

	public List<Organization> getSubOrgs() {
		return subOrgs;
	}

	public void setSubOrgs(List<Organization> subOrgs) {
		this.subOrgs = subOrgs;
	}
	
	@Override
	public ProtocolEntity fromJson(JSONObject jo) throws IOException {
		return (ProtocolEntity) JsonUtil.toObject(jo, this, new PropertyHandler(){

			@Override
			public Object toBeanValue(Field beanField, Object jsonObj) {
				if (beanField.getName().equals("subOrgs")){
					return JsonUtil.toObjects((JSONArray) jsonObj, Organization.class, null);
				}
				return null;
			}
			
		});
	}

}
