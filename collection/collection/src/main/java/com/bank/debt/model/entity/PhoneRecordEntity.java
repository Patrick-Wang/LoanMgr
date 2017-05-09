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
@Table(name = "phone_records")
public class PhoneRecordEntity extends AbstractReadWriteEntity implements Serializable {
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

	String number;
	Integer status;
	EntrustedCaseManagerEntity entrustedCaseManager;
	Integer attachement;
	Timestamp startTime;
	Timestamp endTime;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "entrustedCase")
	public EntrustedCaseManagerEntity getEntrustedCaseManager() {
		return entrustedCaseManager;
	}
	
	public String getNumber() {
		return number;
	}
	public void setNumber(String number) {
		this.number = number;
	}

	public Timestamp getStartTime() {
		return startTime;
	}
	public void setStartTime(Timestamp startTime) {
		this.startTime = startTime;
	}
	
	public Integer getStatus() {
		return status;
	}
	public void setStatus(Integer status) {
		this.status = status;
	}
	public Integer getAttachement() {
		return attachement;
	}
	public void setAttachement(Integer attachement) {
		this.attachement = attachement;
	}
	public Timestamp getEndTime() {
		return endTime;
	}
	public void setEndTime(Timestamp endTime) {
		this.endTime = endTime;
	}

	public void setEntrustedCaseManager(EntrustedCaseManagerEntity entrustedCaseManager) {
		this.entrustedCaseManager = entrustedCaseManager;
	}
}
