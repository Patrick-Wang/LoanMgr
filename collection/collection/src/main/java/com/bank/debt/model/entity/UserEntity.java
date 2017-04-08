package com.bank.debt.model.entity;

import java.io.Serializable;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import com.speed.frame.model.entity.AbstractReadWriteEntity;


@Entity
@Table(name = "user")
public class UserEntity extends AbstractReadWriteEntity implements Serializable {
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	@Column(name = "id")
	public int getId() {
		return super.getId();
	}


	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	String username;
	String password;
	OrganizationEntity org;
	Integer status;
	List<RoleEntity> roles;
	
	
	@ManyToMany(cascade = CascadeType.ALL, fetch = FetchType.EAGER)
	@JoinTable(
		name = "user_role",
		joinColumns = { 
			@JoinColumn(name = "user", referencedColumnName = "id") 
		}, 
		inverseJoinColumns = { 
			@JoinColumn(name = "role", referencedColumnName = "id") 
		})
	public List<RoleEntity> getRoles() {
		return roles;
	}
	public void setRoles(List<RoleEntity> roles) {
		this.roles = roles;
	}
	public String getUsername() {
		return username;
	}
	public void setUsername(String username) {
		this.username = username;
	}
	public String getPassword() {
		return password;
	}
	public void setPassword(String password) {
		this.password = password;
	}
	
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "org")
	public OrganizationEntity getOrg() {
		return org;
	}
	public void setOrg(OrganizationEntity org) {
		this.org = org;
	}
	
	public Integer getStatus() {
		return status;
	}
	public void setStatus(Integer status) {
		this.status = status;
	}

}
