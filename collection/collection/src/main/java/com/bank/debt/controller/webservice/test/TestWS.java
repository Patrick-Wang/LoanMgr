package com.bank.debt.controller.webservice.test;

import javax.jws.WebParam;
import javax.jws.WebService;

@WebService
public class TestWS {
	
	
	public String test(
			@WebParam(name = "usrName") String usrName, 
			@WebParam(name = "year") int year, 
			@WebParam(name = "month") int month){
		return "test";
	}	
}
