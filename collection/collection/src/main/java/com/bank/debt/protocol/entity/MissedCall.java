package com.bank.debt.protocol.entity;

import java.io.IOException;

import com.bank.debt.protocol.tools.JsonUtil;

import net.sf.json.JSONObject;

public class MissedCall extends ProtocolEntityImpl {

	String call;
	String phoneNum;
	public String getCall() {
		return call;
	}
	public void setCall(String call) {
		this.call = call;
	}
	public String getPhoneNum() {
		return phoneNum;
	}
	public void setPhoneNum(String phoneNum) {
		this.phoneNum = phoneNum;
	}
	@Override
	public ProtocolEntity fromJson(JSONObject jo) throws IOException {
		return (ProtocolEntity) JsonUtil.toObject(jo, this, null);
	}
}
