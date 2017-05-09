package com.bank.debt.model.entity;

import java.io.Serializable;
import java.sql.Timestamp;
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
	UserEntity dest;
	EntrustedCaseManagerEntity entrustedCaseManager;
	String content;
	String title;
	List<AttachementEntity> attachements;
	Timestamp sendTime;
	Integer isRead;
	
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "come")
	public UserEntity getCome() {
		return come;
	}
	
	
	public void setCome(UserEntity from) {
		this.come = from;
	}
	
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "dest")
	public UserEntity getDest() {
		return dest;
	}
	public void setDest(UserEntity to) {
		this.dest = to;
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
	
	@ManyToMany(cascade = CascadeType.ALL, fetch = FetchType.EAGER)
	@JoinTable(
		name = "message_attach_attachement",
		joinColumns = { 
			@JoinColumn(name = "msgId", referencedColumnName = "id") 
		}, 
		inverseJoinColumns = { 
			@JoinColumn(name = "attachement", referencedColumnName = "id") 
		})	
	public List<AttachementEntity> getAttachements() {
		return attachements;
	}
	public void setAttachements(List<AttachementEntity> attachements) {
		this.attachements = attachements;
	}
	public Timestamp getSendTime() {
		return sendTime;
	}
	public void setSendTime(Timestamp sendTime) {
		this.sendTime = sendTime;
	}
	
	public Integer getIsRead() {
		return isRead;
	}
	public void setIsRead(Integer read) {
		this.isRead = read;
	}


	public String getTitle() {
		return title;
	}


	public void setTitle(String title) {
		this.title = title;
	}


}
