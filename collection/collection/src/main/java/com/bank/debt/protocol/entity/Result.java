package com.bank.debt.protocol.entity;

public class Result  extends ProtocolEntityImpl{
	
	public Result() {
		
	}
	

	public Result(int code, String msg) {
		super();
		this.code = code;
		this.msg = msg;
	}


	int code;
	String msg;
	public int getCode() {
		return code;
	}
	public void setCode(int code) {
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
