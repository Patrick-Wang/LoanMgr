package com.bank.debt.protocol.tools;

import java.io.UnsupportedEncodingException;
import java.util.List;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

public class util {

	public static String toJson(Object bean){
		if (bean instanceof List || bean.getClass().isArray()){
			return JSONArray.fromObject(bean).toString();
		}else{
			return JSONObject.fromObject(bean).toString();
		}
	}
	
	public static byte[] toUtf8Json(Object bean) throws UnsupportedEncodingException{
		return toJson(bean).getBytes("utf-8");
	}
}
