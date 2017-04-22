package com.bank.debt.protocol.entity;

import java.io.IOException;

import com.bank.debt.protocol.tools.JsonUtil;

import net.sf.json.JSONObject;

public class QueryOption extends ProtocolEntityImpl {

	 String name;
	 String PIN;
	 String code;//卡号，客户号、车牌号
	 String wwrq;//委外日期
	 String wwjg;//委外机构
	 String wwzt;//委外状态：未分配、已分配、已结束
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
}
