package com.bank.debt.protocol.tools;

import java.util.ArrayList;
import java.util.List;
import java.util.Map.Entry;

import javax.servlet.http.HttpServletRequest;

import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;
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
	
	public static CommonsMultipartFile[] getMultipartFiles(HttpServletRequest request, String paramName){
		if (request instanceof MultipartHttpServletRequest){
			MultipartHttpServletRequest mhsr = (MultipartHttpServletRequest) request;
			List<CommonsMultipartFile> retFiles = new ArrayList<CommonsMultipartFile>();
			for (Entry<String, MultipartFile> entry : mhsr.getFileMap().entrySet()){
				if (entry.getKey().startsWith(paramName)){
					retFiles.add((CommonsMultipartFile) entry.getValue());
				}
			}
			CommonsMultipartFile[] result = new CommonsMultipartFile[retFiles.size()];
			retFiles.toArray(result);
			return result;
		}
		return null;
	}
	
	public static String getFileName(CommonsMultipartFile file){
		String fileName = file.getOriginalFilename();
		int index = fileName.lastIndexOf("\\");
		if (index >= 0){
			fileName = fileName.substring(index + 1);
		}
		index = fileName.lastIndexOf("/");
		if (index >= 0){
			fileName = fileName.substring(index + 1);
		}
		return fileName;
	}
}
