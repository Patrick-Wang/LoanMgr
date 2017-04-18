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
		String[] items = attachName.replace("phone:", "").split("_");
		PhoneRecordName un = new PhoneRecordName();
		if (items.length == 2){
			un.setNumber(items[0]);
			un.setName(items[1]);
		}else if (items.length == 3){
			un.setEcId(Integer.valueOf(items[0]));
			un.setNumber(items[1]);
			un.setName(items[2]);
		}
		return un;
	} 
}