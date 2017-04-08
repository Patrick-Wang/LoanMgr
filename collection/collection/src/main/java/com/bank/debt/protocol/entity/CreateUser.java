package com.bank.debt.protocol.entity;

public class CreateUser {
	String name;
	String password;
	Integer orgId;
	Integer[] role;
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getPassword() {
		return password;
	}
	public void setPassword(String password) {
		this.password = password;
	}
	public Integer getOrgId() {
		return orgId;
	}
	public void setOrgId(Integer orgId) {
		this.orgId = orgId;
	}
	public Integer[] getRole() {
		return role;
	}
	public void setRole(Integer[] role) {
		this.role = role;
	}
	
}
