package com.bank.debt.protocol.entity;

import java.sql.Timestamp;

public class PhoneRecordName{
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
	
	public static boolean isPhoneAttach(String attachName){
		return attachName.startsWith("phone:");
	} 
	
	public static PhoneRecordName parse(String attachName){
		String name = attachName.replace("phone:", "");
		PhoneRecordName un = new PhoneRecordName();
		int index = name.indexOf("_");
		un.setEcId(Integer.valueOf(name.substring(0, index)));
		name = name.substring(index + 1);
		index = name.indexOf("_");
		un.setNumber(name.substring(0, index));
		un.setName(name.substring(index + 1));
		return un;
	} 
}