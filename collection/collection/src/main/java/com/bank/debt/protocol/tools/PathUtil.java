package com.bank.debt.protocol.tools;

import java.text.SimpleDateFormat;

public class PathUtil {
	
	static SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd");
	
	public static String msgAttachementPath(Integer entrustedCase, Integer from, Integer to){
		return "/MSG/" + entrustedCase + "/" + from + "-" + to + "/";
	}
	
	public static String reportAttachementPath(Integer entrustedCase, Integer creator, Integer report){
		return "/REPORT/" + entrustedCase + "/" + creator + "/" + report + "/";
	}
	
	public static String zipAttachementPath(String attchName){
		return "附件/" + attchName;
	}
		
	public static String phoneRecordPath(String number){
		return "/PHONE_RECORDS/" + number + "/";
	}
}
