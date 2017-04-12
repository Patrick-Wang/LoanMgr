package com.bank.debt.protocol.tools;

public class PathUtil {
	public static String msgAttachementPath(Integer entrustedCase, Integer from, Integer to){
		return "/MSG/" + entrustedCase + "/" + from + "-" + to + "/";
	}
	
	public static String reportAttachementPath(Integer entrustedCase, Integer creator, Integer report){
		return "/REPORT/" + entrustedCase + "/" + creator + "/" + report + "/";
	}
	
}
