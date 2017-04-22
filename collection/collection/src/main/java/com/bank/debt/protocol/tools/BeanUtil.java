package com.bank.debt.protocol.tools;

import java.lang.reflect.Field;
import java.lang.reflect.Method;
import java.util.ArrayList;
import java.util.List;

public class BeanUtil {
	public static String getGetMethod(String fieldName){
		return "get" + fieldName.substring(0, 1).toUpperCase() + fieldName.substring(1);
	}
	
	public static String getSetMethod(String fieldName){
		return "set" + fieldName.substring(0, 1).toUpperCase() + fieldName.substring(1);
	}
	
	public static boolean isSetMethod(String method){
		return  method.length() > 3 && 
				method.startsWith("set") && 
				method.charAt(3) >= 'A' && 
				method.charAt(3) <= 'A';
	}
	
	public static Method getMethod(Class<?> beanClass, String name, Class<?> type){
		try {
			Method method = beanClass.getMethod(name, type);
			return method;
		} catch (NoSuchMethodException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (SecurityException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return null;
	}
	
	public static List<Field> getBeanFieldTypes(Class<?> beanClass){
		List<Field> types = new ArrayList<Field>();
		Field[] fields = beanClass.getDeclaredFields();
		for (Field field : fields){
			try {
				Method method = beanClass.getMethod(BeanUtil.getSetMethod(field.getName()), field.getType());
				types.add(field);
			} catch (NoSuchMethodException e) {
				// TODO Auto-generated catch block
				//e.printStackTrace();
			} catch (SecurityException e) {
				// TODO Auto-generated catch block
				//e.printStackTrace();
			}
			
		}
		return types;
	}
}
