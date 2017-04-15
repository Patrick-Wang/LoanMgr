package com.bank.debt.protocol.entity;

import java.io.IOException;
import java.io.UnsupportedEncodingException;
import java.util.List;

import com.bank.debt.model.entity.ECCreditCardEntity;
import com.bank.debt.protocol.tools.JsonUtil;

import net.sf.json.JSONObject;


public class BaseEC  extends ECCreditCardEntity implements ProtocolEntity {
	
	public byte[] toUtf8Json() throws UnsupportedEncodingException {
		return JsonUtil.toUtf8Json(this);
	}
	
	public String toJson() throws UnsupportedEncodingException {
		return JsonUtil.toJson(this);
	}
	
	public ProtocolEntityImpl fromJson(JSONObject jo) throws IOException{
		return  (ProtocolEntityImpl) JsonUtil.toObject(jo, this);
	}	
	
	Integer managerId;
	List<EntrustedCaseReport> reports;
	
	
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
}
