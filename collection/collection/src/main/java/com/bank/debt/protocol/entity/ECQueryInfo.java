package com.bank.debt.protocol.entity;

import java.util.List;

public class ECQueryInfo extends ProtocolEntityImpl{
	List<IF> ifs;
	List<ECCreditCard> creditCard;
	List<ECCreditLoan> creditLoan;
	List<ECCarLoan> carLoan;
	public List<IF> getIfs() {
		return ifs;
	}
	public void setIfs(List<IF> ifs) {
		this.ifs = ifs;
	}
	public List getCreditCard() {
		return creditCard;
	}
	public void setCreditCard(List<ECCreditCard> creditCard) {
		this.creditCard = creditCard;
	}
	public List getCreditLoan() {
		return creditLoan;
	}
	public void setCreditLoan(List<ECCreditLoan> creditLoan) {
		this.creditLoan = creditLoan;
	}
	public List getCarLoan() {
		return carLoan;
	}
	public void setCarLoan(List<ECCarLoan> carLoan) {
		this.carLoan = carLoan;
	}	
}
