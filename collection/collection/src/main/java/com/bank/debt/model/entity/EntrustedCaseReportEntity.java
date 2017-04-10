package com.bank.debt.model.entity;

import java.io.Serializable;
import java.sql.Date;
import java.sql.Timestamp;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToOne;
import javax.persistence.Table;

import com.speed.frame.model.entity.AbstractReadWriteEntity;


@Entity
@Table(name = "entrusted_case_report")
public class EntrustedCaseReportEntity extends AbstractReadWriteEntity implements Serializable {
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


	UserEntity creator;
	Date date;
	String title;
	String content;
	String attachements;
	EntrustedCaseManagerEntity entrustedCaseManager;
	Timestamp createdTime;
	Timestamp lastModifiedTime;
	UserEntity modifier;
	
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "creator")
	public UserEntity getCreator() {
		return creator;
	}
	public void setCreator(UserEntity creator) {
		this.creator = creator;
	}
	
	
	public Date getDate() {
		return date;
	}
	public void setDate(Date date) {
		this.date = date;
	}
	public String getTitle() {
		return title;
	}
	public void setTitle(String title) {
		this.title = title;
	}
	public String getContent() {
		return content;
	}
	public void setContent(String content) {
		this.content = content;
	}
	public String getAttachements() {
		return attachements;
	}
	public void setAttachements(String attachements) {
		this.attachements = attachements;
	}
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "entrustedCaseManager")
	public EntrustedCaseManagerEntity getEntrustedCaseManager() {
		return entrustedCaseManager;
	}
	public void setEntrustedCaseManager(EntrustedCaseManagerEntity entrustedCaseManager) {
		this.entrustedCaseManager = entrustedCaseManager;
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
	
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "modifier")	
	public UserEntity getModifier() {
		return modifier;
	}
	public void setModifier(UserEntity modifier) {
		this.modifier = modifier;
	}

}
