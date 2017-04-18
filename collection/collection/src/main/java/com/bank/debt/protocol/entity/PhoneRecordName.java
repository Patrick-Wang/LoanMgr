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
}