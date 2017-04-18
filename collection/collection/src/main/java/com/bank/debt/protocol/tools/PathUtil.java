package com.bank.debt.protocol.tools;

import java.sql.Timestamp;
import java.text.SimpleDateFormat;

public class PathUtil {
	
	public static class UploadName{
		Integer ecId;
		String number;
		String name;
		public Integer getEcId() {
			return ecId;
		}
		public void setEcId(Integer ecId) {
			this.ecId = ecId;
		}
		public String getNumber() {
			return number;
		}
		public void setNumber(String number) {
			this.number = number;
		}
		public String getName() {
			return name;
		}
		public void setName(String name) {
			this.name = name;
		}
		public Timestamp getTime(){
			return new Timestamp(Long.valueOf(this.name.substring(0, this.name.indexOf("."))));
		}
	}
	
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
	
	public static UploadName getUploadName(String name){
		UploadName un = new UploadName();
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
	public static boolean isPhoneAttach(String attach){
		return attach.startsWith("phone:");
	}
}
