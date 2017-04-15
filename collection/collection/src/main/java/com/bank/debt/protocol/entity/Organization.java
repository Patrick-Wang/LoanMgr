package com.bank.debt.protocol.entity;

import java.util.List;

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

}
