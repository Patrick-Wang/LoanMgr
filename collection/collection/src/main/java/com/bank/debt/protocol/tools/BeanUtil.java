package com.bank.debt.protocol.tools;

public class BeanUtil {
	public static String getGetMethod(String fieldName){
		return "get" + fieldName.substring(0, 1).toUpperCase() + fieldName.substring(1);
	}
	
	public static String getSetMethod(String fieldName){
		return "set" + fieldName.substring(0, 1).toUpperCase() + fieldName.substring(1);
	}
}
