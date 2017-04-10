package com.bank.debt.protocol.tools;

public class Checking {
	public static boolean isExist(String s){
		return s != null && !s.isEmpty();
	}
	
	public static boolean isExist(Integer i){
		return i != null;
	}
	
	public static boolean isExist(Integer[] ia){
		return ia != null && ia.length > 0;
	}
}
