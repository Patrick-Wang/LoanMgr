package com.bank.debt.protocol.entity;

import java.io.IOException;

import com.bank.debt.protocol.tools.JsonUtil;

import net.sf.json.JSONObject;

public class QueryOption extends ProtocolEntityImpl {

	public QueryOption(Integer batchNo) {
		super();
		this.batchNo = batchNo;
	}

	public QueryOption() {
		super();
	}

	String name; // 姓名
	String PIN; // 身份證號
	String code;// 卡号，客户号、车牌号
	String wwrq;// 委外日期
	String wwjg;// 委外机构
	String wwzt;// 委外状态：未分配、已分配、已结束
	Integer batchNo;
	Integer mgrId;
	Boolean assignToMe = false;
	Boolean myOwn = false;
	Integer limit;
	Integer pageNum;
	Integer pageSize;
	Double yqtsStartOpen;
	Double yqtsEndClose;
	Integer assignee;
	String pch;

    public String getPch() {
        return pch;
    }

    public void setPch(String pch) {
        this.pch = pch;
    }

    public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getPIN() {
		return PIN;
	}

	public void setPIN(String pIN) {
		PIN = pIN;
	}

	public String getCode() {
		return code;
	}

	public void setCode(String code) {
		this.code = code;
	}

	public String getWwrq() {
		return wwrq;
	}

	public void setWwrq(String wwrq) {
		this.wwrq = wwrq;
	}

	public String getWwjg() {
		return wwjg;
	}

	public void setWwjg(String wwjg) {
		this.wwjg = wwjg;
	}

	public String getWwzt() {
		return wwzt;
	}

	@Override
	public ProtocolEntity fromJson(JSONObject jo) throws IOException {
		return (ProtocolEntity) JsonUtil.toObject(jo, this, null);
	}

	public void setWwzt(String wwzt) {
		this.wwzt = wwzt;
	}

	public Boolean getAssignToMe() {
		return assignToMe;
	}

	public void setAssignToMe(Boolean assignToMe) {
		this.assignToMe = assignToMe;
	}

	public Boolean getMyOwn() {
		return myOwn;
	}

	public void setMyOwn(Boolean myOwn) {
		this.myOwn = myOwn;
	}

	public Integer getBatchNo() {
		return batchNo;
	}

	public void setBatchNo(Integer batchNo) {
		this.batchNo = batchNo;
	}

	public Integer getMgrId() {
		return mgrId;
	}

	public void setMgrId(Integer mgrId) {
		this.mgrId = mgrId;
	}

	public Integer getLimit() {
		return limit;
	}

	public void setLimit(Integer limit) {
		this.limit = limit;
	}

	public Integer getPageNum() {
		return pageNum;
	}

	public void setPageNum(Integer pageNum) {
		this.pageNum = pageNum;
	}

	public Integer getPageSize() {
		return pageSize;
	}

	public void setPageSize(Integer pageSize) {
		this.pageSize = pageSize;
	}

	public Double getYqtsStartOpen() {
		return yqtsStartOpen;
	}

	public void setYqtsStartOpen(Double yqtsStartOpen) {
		this.yqtsStartOpen = yqtsStartOpen;
	}

	public Double getYqtsEndClose() {
		return yqtsEndClose;
	}

	public void setYqtsEndClose(Double yqtsEndClose) {
		this.yqtsEndClose = yqtsEndClose;
	}

	public Integer getAssignee() {
		return assignee;
	}

	public void setAssignee(Integer assignee) {
		this.assignee = assignee;
	}
}
