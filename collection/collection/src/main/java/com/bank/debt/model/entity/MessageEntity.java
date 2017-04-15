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
@Table(name = "message")
public class MessageEntity extends AbstractReadWriteEntity implements Serializable {
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
	UserEntity come;
	UserEntity to;
	EntrustedCaseManagerEntity entrustedCaseManager;
	String content;
	String title;
	String attachements;
	Timestamp sendTime;
	Integer read;
	
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "come")
	public UserEntity getCome() {
		return come;
	}
	
	
	public void setCome(UserEntity from) {
		this.come = from;
	}
	
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "to")
	public UserEntity getTo() {
		return to;
	}
	public void setTo(UserEntity to) {
		this.to = to;
	}
	
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "entrustedCaseManager")
	public EntrustedCaseManagerEntity getEntrustedCaseManager() {
		return entrustedCaseManager;
	}
	public void setEntrustedCaseManager(EntrustedCaseManagerEntity entrustedCaseManager) {
		this.entrustedCaseManager = entrustedCaseManager;
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
	public Timestamp getSendTime() {
		return sendTime;
	}
	public void setSendTime(Timestamp sendTime) {
		this.sendTime = sendTime;
	}
	public Integer getRead() {
		return read;
	}
	public void setRead(Integer read) {
		this.read = read;
	}


	public String getTitle() {
		return title;
	}


	public void setTitle(String title) {
		this.title = title;
	}


}
