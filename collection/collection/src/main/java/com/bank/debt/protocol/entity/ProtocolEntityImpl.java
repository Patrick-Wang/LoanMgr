package com.bank.debt.protocol.entity;

import java.io.UnsupportedEncodingException;

import com.bank.debt.protocol.tools.JsonUtil;

public abstract class ProtocolEntityImpl implements ProtocolEntity{
	
	public byte[] toUtf8Json() throws UnsupportedEncodingException {
		return JsonUtil.toUtf8Json(this);
	}
	
	public String toJson() throws UnsupportedEncodingException {
		return JsonUtil.toJson(this);
	}
	
//	public ProtocolEntityImpl fromJson(JSONObject jo) throws IOException{
//		return  (ProtocolEntityImpl) JsonUtil.toObject(jo, this);
//	}
	
}
