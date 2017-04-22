package com.bank.debt.protocol.tools;

import java.util.List;

import org.springframework.web.multipart.commons.CommonsMultipartFile;

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
	
	public static boolean isExist(CommonsMultipartFile[] ia){
		return ia != null && ia.length > 0;
	}

	public static boolean isExist(String[] ia) {
		return ia != null && ia.length > 0;
	}
	
	public static boolean isExist(List ia) {
		return ia != null && ia.size() > 0;
	}
}
