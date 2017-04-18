package com.bank.debt.protocol.tools;

import java.text.SimpleDateFormat;

import com.bank.debt.protocol.entity.PhoneRecordName;

public class PathUtil {
	
	static SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd");
	
	public static String msgAttachementPath(Integer entrustedCase, Integer from, Integer to){
		return "/MSG/" + entrustedCase + "/" + from + "-" + to + "/";
	}
	
	public static String reportAttachementPath(Integer entrustedCase, Integer creator, Integer report){
		return "/REPORT/" + entrustedCase + "/" + creator + "/" + report + "/";
	}
	
	public static String zipReportAttachementPath(String date, Integer reportId, String title, String attchName){
		return "Attachement/" + 
				date + "/" + 
				reportId + (title == null ? "" : "_" + title) + "/" + attchName;
	}
	
	public static PhoneRecordName getUploadName(String name){
		PhoneRecordName un = new PhoneRecordName();
		int index = name.indexOf("_");
		un.setEcId(Integer.valueOf(name.substring(0, index)));
		name = name.substring(index + 1);
		index = name.indexOf("_");
		un.setNumber(name.substring(0, index));
		un.setName(name.substring(index + 1));
		return un;
	}
	
	public static String phoneRecordPath(String number){
		return "/PHONE_RECORDS/" + number + "/";
	}
}
