package com.bank.debt.protocol.entity;

import java.io.IOException;
import java.lang.reflect.Field;
import java.util.List;

import com.bank.debt.protocol.tools.JsonUtil;
import com.bank.debt.protocol.tools.JsonUtil.PropertyHandler;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

public class EC  extends ProtocolEntityImpl {
	Integer managerId;
	String owner;
	Integer ownerId;
	String assignee;
	Integer assigneeId;
	Integer pageCount;
	Integer pageNum;
	Integer records;
	List<EntrustedCaseReport> reports;
	List<Message> messages;
	List<Object> loan;
	
	
	public Integer getManagerId() {
		return managerId;
	}

	public void setManagerId(Integer managerId) {
		this.managerId = managerId;
	}

	public List<EntrustedCaseReport> getReports() {
		return reports;
	}

	public void setReports(List<EntrustedCaseReport> reports) {
		this.reports = reports;
	}

	public List<Message> getMessages() {
		return messages;
	}

	public void setMessages(List<Message> messages) {
		this.messages = messages;
	}

	@Override
	public ProtocolEntity fromJson(JSONObject jo) throws IOException {
		return (ProtocolEntity) JsonUtil.toObject(jo, this, new PropertyHandler(){

			@Override
			public Object toBeanValue(Field beanField, Object jsonObj) {
				if (beanField.getName().equals("reports")){
					return JsonUtil.toObjects((JSONArray) jsonObj, EntrustedCaseReport.class);
				}
				if (beanField.getName().equals("messages")){
					return JsonUtil.toObjects((JSONArray) jsonObj, Message.class);
				}

				return null;
			}
			
		});
	}

	public List<Object> getLoan() {
		return loan;
	}

	public void setLoan(List<Object> loan) {
		this.loan = loan;
	}

	public String getOwner() {
		return owner;
	}

	public void setOwner(String owner) {
		this.owner = owner;
	}

	public String getAssignee() {
		return assignee;
	}

	public void setAssignee(String assignee) {
		this.assignee = assignee;
	}

	public Integer getOwnerId() {
		return ownerId;
	}

	public void setOwnerId(Integer ownerId) {
		this.ownerId = ownerId;
	}

	public Integer getAssigneeId() {
		return assigneeId;
	}

	public void setAssigneeId(Integer assigneeId) {
		this.assigneeId = assigneeId;
	}

	
	

	public Integer getPageCount() {
		return pageCount;
	}

	public void setPageCount(Integer pageCount) {
		this.pageCount = pageCount;
	}

	public Integer getPageNum() {
		return pageNum;
	}

	public void setPageNum(Integer pageNum) {
		this.pageNum = pageNum;
	}

	public Integer getRecords() {
		return records;
	}

	public void setRecords(Integer records) {
		this.records = records;
	}

	
	
	
}
