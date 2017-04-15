package com.bank.debt.protocol.entity;

public class CreateUser extends ProtocolEntityImpl{
	String name;
	String password;
	Integer orgId;
	Integer[] roles;
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
	public Integer[] getRoles() {
		return roles;
	}
	public void setRoles(Integer[] role) {
		this.roles = role;
	}
	
}
