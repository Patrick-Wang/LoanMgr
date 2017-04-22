package com.bank.debt.protocol.entity;

import java.io.IOException;

import com.bank.debt.protocol.tools.JsonUtil;

import net.sf.json.JSONObject;

public class AcceptSummary  extends ProtocolEntityImpl{

	Integer totoal;
	Integer complete;
	public Integer getTotoal() {
		return totoal;
	}
	public void setTotoal(Integer totoal) {
		this.totoal = totoal;
	}
	public Integer getComplete() {
		return complete;
	}
	public void setComplete(Integer complete) {
		this.complete = complete;
	}
	
	@Override
	public ProtocolEntity fromJson(JSONObject jo) throws IOException {
		return (ProtocolEntity) JsonUtil.toObject(jo, this, null);
	}

}
