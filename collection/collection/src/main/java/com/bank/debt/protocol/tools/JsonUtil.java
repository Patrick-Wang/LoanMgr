package com.bank.debt.protocol.tools;

import java.io.IOException;
import java.io.UnsupportedEncodingException;
import java.util.ArrayList;
import java.util.List;

import javax.servlet.http.HttpServletRequest;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;
import net.sf.json.JsonConfig;

public class JsonUtil {

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

	
	public static Object toObject(JSONObject jo, Object obj) throws IOException{
		JsonConfig jc = new JsonConfig();
		return JSONObject.toBean(jo, obj, jc);
	}
	
	public static List toObjects(JSONArray ja, Class<?> cls){
		List r = new ArrayList();
		for (int i = 0; i < ja.size(); ++i){
			r.add(JSONObject.toBean(ja.getJSONObject(i), cls));
		}
		return r;
	}
	
	public static Object getObjects(HttpServletRequest request, String param, Class<?> cls) throws IOException{
		String json = request.getParameter(param);
		JSONArray ja = JSONArray.fromObject(json);
		return toObjects(ja, cls);
	}
	
	public static Object getObject(HttpServletRequest request, String param, Class<?> cls) throws IOException{
		String json = request.getParameter(param);
		return JSONObject.toBean(JSONObject.fromObject(json), cls);
	}

}
