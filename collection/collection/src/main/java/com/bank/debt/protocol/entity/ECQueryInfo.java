package com.bank.debt.protocol.entity;

import java.io.IOException;
import java.lang.reflect.Field;
import java.util.List;

import com.bank.debt.protocol.tools.JsonUtil;
import com.bank.debt.protocol.tools.JsonUtil.PropertyHandler;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

public class ECQueryInfo extends ProtocolEntityImpl{
	List<ECCreditCard> creditCard;
	List<ECCreditLoan> creditLoan;
	List<ECCarLoan> carLoan;
	
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
	@Override
	public ProtocolEntity fromJson(JSONObject jo) throws IOException {
		return (ProtocolEntity) JsonUtil.toObject(jo, this, new PropertyHandler(){

			@Override
			public Object toBeanValue(Field beanField, Object jsonObj) {
				if (beanField.getName().equals("ifs")){
					return JsonUtil.toObjects((JSONArray) jsonObj, IF.class);
				}
				if (beanField.getName().equals("creditCard")){
					return JsonUtil.toObjects((JSONArray) jsonObj, ECCreditCard.class);
				}
				if (beanField.getName().equals("creditLoan")){
					return JsonUtil.toObjects((JSONArray) jsonObj, ECCreditLoan.class);
				}
				if (beanField.getName().equals("carLoan")){
					return JsonUtil.toObjects((JSONArray) jsonObj, ECCarLoan.class);
				}
				return null;
			}
			
		});
	}	
}
