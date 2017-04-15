package com.bank.debt.protocol.entity;

import java.io.IOException;
import java.io.UnsupportedEncodingException;

import net.sf.json.JSONObject;

public interface ProtocolEntity{
	
	byte[] toUtf8Json() throws UnsupportedEncodingException;
	
	String toJson() throws UnsupportedEncodingException;
	
	ProtocolEntity fromJson(JSONObject jo) throws IOException;
	
}
