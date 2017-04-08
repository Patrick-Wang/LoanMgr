package com.bank.debt.model.entity;

import java.io.Serializable;
import java.sql.Timestamp;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import com.speed.frame.model.entity.AbstractReadWriteEntity;


@Entity
@Table(name = "entrusted_case_manager")
public class EntrustedCaseManagerEntity extends AbstractReadWriteEntity implements Serializable {
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
	UserEntity owner;
	UserEntity assignee;
	Integer type;
	Integer entrustedCase;
	Timestamp createdTime;
	Timestamp lastModifiedTime;
	
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "owner")
	public UserEntity getOwner() {
		return owner;
	}
	public void setOwner(UserEntity owner) {
		this.owner = owner;
	}
	
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "assignee")
	public UserEntity getAssignee() {
		return assignee;
	}
	public void setAssignee(UserEntity assignee) {
		this.assignee = assignee;
	}
	public Integer getType() {
		return type;
	}
	public void setType(Integer type) {
		this.type = type;
	}
	public Integer getEntrustedCase() {
		return entrustedCase;
	}
	public void setEntrustedCase(Integer entrustedCase) {
		this.entrustedCase = entrustedCase;
	}
	public Timestamp getCreatedTime() {
		return createdTime;
	}
	public void setCreatedTime(Timestamp createdTime) {
		this.createdTime = createdTime;
	}
	public Timestamp getLastModifiedTime() {
		return lastModifiedTime;
	}
	public void setLastModifiedTime(Timestamp lastModifiedTime) {
		this.lastModifiedTime = lastModifiedTime;
	}


}
