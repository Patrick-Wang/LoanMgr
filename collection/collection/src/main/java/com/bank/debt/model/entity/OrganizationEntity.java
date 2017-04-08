package com.bank.debt.model.entity;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import com.speed.frame.model.entity.AbstractReadWriteEntity;


@Entity
@Table(name = "organization")
public class OrganizationEntity extends AbstractReadWriteEntity implements Serializable {
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

	String name;
	Integer status;
	OrganizationEntity parent;
	List<OrganizationEntity> children = new ArrayList<OrganizationEntity>();
	
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

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "parent")
	public OrganizationEntity getParent() {
		return parent;
	}

	public void setParent(OrganizationEntity parent) {
		this.parent = parent;
	}

	@OneToMany(mappedBy = "parent", cascade = { CascadeType.MERGE,
			CascadeType.REFRESH }, fetch = FetchType.EAGER)
	public List<OrganizationEntity> getChildren() {
		return children;
	}

	public void setChildren(List<OrganizationEntity> children) {
		this.children = children;
	}
}
