package com.bank.debt.protocol.entity;

public class Result  extends ProtocolEntity{
	
	public Result() {
		
	}
	

	public Result(Integer code, String msg) {
		super();
		this.code = code;
		this.msg = msg;
	}


	Integer code;
	String msg;
	public Integer getCode() {
		return code;
	}
	public void setCode(Integer code) {
		this.code = code;
	}
	public String getMsg() {
		return msg;
	}
	public void setMsg(String msg) {
		this.msg = msg;
	}
	
	public Result clone(){
		return new Result(code, msg);
	}
}
