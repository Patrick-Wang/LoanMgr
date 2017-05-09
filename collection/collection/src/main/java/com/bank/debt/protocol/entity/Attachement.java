package com.bank.debt.protocol.entity;

import java.io.IOException;
import java.io.UnsupportedEncodingException;
import java.sql.Timestamp;

import com.bank.debt.model.entity.AttachementEntity;
import com.bank.debt.protocol.tools.JsonUtil;

import net.sf.json.JSONObject;

public class Attachement extends AttachementEntity implements ProtocolEntity{

	public Attachement() {
		this.setUploadTime(new Timestamp(System.currentTimeMillis()));
	}

	@Override
	public byte[] toUtf8Json() throws UnsupportedEncodingException {
		return JsonUtil.toUtf8Json(this);
	}

	@Override
	public String toJson() throws UnsupportedEncodingException {
		return JsonUtil.toJson(this);
	}

	@Override
	public ProtocolEntity fromJson(JSONObject jo) throws IOException {
		return (ProtocolEntity) JsonUtil.toObject(jo, this, null);
	}

}
