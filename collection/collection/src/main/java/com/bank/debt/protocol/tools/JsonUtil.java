package com.bank.debt.protocol.tools;

import java.io.IOException;
import java.io.UnsupportedEncodingException;
import java.lang.reflect.Field;
import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.Method;
import java.sql.Date;
import java.sql.Timestamp;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.List;

import javax.servlet.http.HttpServletRequest;

import com.bank.debt.protocol.entity.ProtocolEntity;

import net.sf.json.JSONArray;
import net.sf.json.JSONNull;
import net.sf.json.JSONObject;
import net.sf.json.JsonConfig;
import net.sf.json.processors.JsonValueProcessor;

class JsonDateValueProcessor  implements JsonValueProcessor{

	@Override
	public Object processArrayValue(Object value, JsonConfig arg1) {
		return process(value);  
	}

	@Override
	public Object processObjectValue(String key, Object value, JsonConfig arg2) {

        return process(value); 
	}
	
	 private Object process(Object value){  
	        if(value instanceof Date){  
	            SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");  
	            return sdf.format(value);  
	        } else if(value instanceof Timestamp){  
	            SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");  
	            return sdf.format(new Date(((Timestamp)value).getTime()));  
	        } 
	        return value == null ? "" : value.toString();  
	    }  
}

public class JsonUtil {

	public static interface PropertyHandler{
		Object toBeanValue(Field beanField, Object jsonObj);
	}

	static class SimpleTypeHandler implements PropertyHandler{

		@Override
		public Object toBeanValue(Field beanField, Object jsonObj) {
			Class<?> cls = beanField.getType();
			if (String.class.isAssignableFrom(cls)){
				return jsonObj.toString();
			}
			if (Integer.class.isAssignableFrom(cls) || cls.getName().equals("int")){
				return Integer.valueOf(jsonObj.toString());
			}
			if (Double.class.isAssignableFrom(cls) || cls.getName().equals("double")){
				return Double.valueOf(jsonObj.toString());
			}
			if (Date.class.isAssignableFrom(cls)){
				return Date.valueOf(jsonObj.toString());
			}
			if (Timestamp.class.isAssignableFrom(cls)){				
				return Timestamp.valueOf(jsonObj.toString());
			}
			return null;
		}
		
	}
	
	
	
	static JsonConfig jsonConfig = new JsonConfig();
	static{
		jsonConfig.registerJsonValueProcessor(Date.class, new JsonDateValueProcessor());
		jsonConfig.registerJsonValueProcessor(Timestamp.class, new JsonDateValueProcessor());
	}
	
	public static String toJson(Object bean){
		if (bean instanceof List || bean.getClass().isArray()){
			return JSONArray.fromObject(bean, jsonConfig).toString();
		} else if (bean instanceof String ||
				bean instanceof Integer ||
				bean instanceof Double ||
				bean instanceof Long){
			return bean.toString();
		} else{
			return JSONObject.fromObject(bean, jsonConfig).toString();
		}
	}
	
	public static byte[] toUtf8Json(Object bean) throws UnsupportedEncodingException{
		return toJson(bean).getBytes("utf-8");
	}

		
	public static Object toObject(JSONObject jo, Object obj, PropertyHandler propHandler) throws IOException{
		List<Field> fields = BeanUtil.getFields(obj.getClass());
		SimpleTypeHandler sth = new SimpleTypeHandler();
		for (Field fd: fields){
			Object jFd = jo.get(fd.getName());
			if (jFd != null){
				if (jFd instanceof JSONNull){
					Method md = BeanUtil.getMethod(
							obj.getClass(),
							BeanUtil.getSetMethod(fd.getName()),
							fd.getType());
					try {
						md.invoke(obj, null);
					} catch (IllegalAccessException | IllegalArgumentException | InvocationTargetException e) {
						e.printStackTrace();
					}
				}else{
					Object fValue = null;
					if (null != propHandler){
						fValue = propHandler.toBeanValue(fd, jFd);
					}
					if (fValue == null){
						fValue = sth.toBeanValue(fd, jFd);
					}
					if (fValue != null){
						Method md = BeanUtil.getMethod(
								obj.getClass(),
								BeanUtil.getSetMethod(fd.getName()),
								fd.getType());
						try {
							md.invoke(obj, fValue);
						} catch (IllegalAccessException | IllegalArgumentException | InvocationTargetException e) {
							// TODO Auto-generated catch block
							e.printStackTrace();
						}
					}
				}
			}
		}
		
		return obj;
	}
	
	
	public static List toObjects(JSONArray ja, Class<? extends ProtocolEntity> cls){
		List r = new ArrayList();
		for (int i = 0; i < ja.size(); ++i){
			try {
				ProtocolEntity pe = cls.newInstance();
				r.add(pe.fromJson(ja.getJSONObject(i)));
			} catch (InstantiationException | IllegalAccessException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			} catch (IOException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
			
		}
		return r;
	}
	
	public static List toObjects(JSONArray ja, Class<?> cls, PropertyHandler propHandler){
		List r = new ArrayList();
		for (int i = 0; i < ja.size(); ++i){
			
			if (String.class.isAssignableFrom(cls)){
				r.add(ja.getString(i));
			}
			else if (Integer.class.isAssignableFrom(cls) || cls.getName().equals("int")){
				r.add(Integer.valueOf(ja.get(i).toString()));
			}
			else if (Double.class.isAssignableFrom(cls) || cls.getName().equals("double")){
				r.add(Double.valueOf(ja.get(i).toString()));
			}
			else if (Date.class.isAssignableFrom(cls)){
				r.add(Date.valueOf(ja.get(i).toString()));
			}
			else if (Date.class.isAssignableFrom(cls)){
				r.add(Date.valueOf(ja.get(i).toString()));
			}
			else if (Timestamp.class.isAssignableFrom(cls)){
				r.add(new Timestamp(Date.valueOf(ja.get(i).toString()).getTime()));
			}
			else{
				try {
					r.add(JsonUtil.toObject(ja.getJSONObject(i), cls.newInstance(), propHandler));
				} catch (InstantiationException | IllegalAccessException | IOException e) {
					// TODO Auto-generated catch block
					e.printStackTrace();
				}
			}
		}
		return r;
	}
	
//	public static Object getObjects(HttpServletRequest request, String param, Class<?> cls) throws IOException{
//		String json = request.getParameter(param);
//		JSONArray ja = JSONArray.fromObject(json);
//		return toObjects(ja, cls);
//	}
	
//	public static Object getObject(HttpServletRequest request, String param, Class<?> cls) throws IOException{
//		String json = request.getParameter(param);
//		return JSONObject.toBean(JSONObject.fromObject(json), cls);
//	}
	
	public static byte[] nullOrJson(ProtocolEntity pe) throws UnsupportedEncodingException{
		return null == pe ? null : pe.toUtf8Json();
	}

}
