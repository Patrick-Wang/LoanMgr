package com.bank.debt.model.entity;

import java.io.Serializable;

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
@Table(name = "authority")
public class AuthorityEntity extends AbstractReadWriteEntity implements Serializable {
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

	
	RoleEntity role;
	IntfEntity intf;
	
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "role")
	public RoleEntity getRole() {
		return role;
	}
	
	
	public void setRole(RoleEntity role) {
		this.role = role;
	}
	
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "intf")
	public IntfEntity getIntf() {
		return intf;
	}
	public void setIntf(IntfEntity intf) {
		this.intf = intf;
	}


}
