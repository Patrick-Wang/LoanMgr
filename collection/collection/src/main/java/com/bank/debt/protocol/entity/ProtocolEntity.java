package com.bank.debt.protocol.entity;

import java.io.IOException;
import java.io.UnsupportedEncodingException;

import com.bank.debt.protocol.tools.JsonUtil;

import net.sf.json.JSONObject;

public class ProtocolEntity{
	
	public byte[] toUtf8Json() throws UnsupportedEncodingException {
		return JsonUtil.toUtf8Json(this);
	}
	
	public String toJson() throws UnsupportedEncodingException {
		return JsonUtil.toJson(this);
	}
	
	
	public ProtocolEntity fromJson(JSONObject jo) throws IOException{
		return  (ProtocolEntity) JsonUtil.toObject(jo, this);
	}
	
}
