package com.bank.debt.protocol.tools;

import com.bank.debt.protocol.entity.ECQueryInfo;
import com.bank.debt.protocol.filter.DataIFFilter;

public class AuthUtil {

	public static ECQueryInfo filterECQI(ECQueryInfo ecqi){
		DataIFFilter diff = new DataIFFilter(ecqi.getIfs());
		if (ecqi.getCarLoan() != null){
			diff.filter(ecqi.getCarLoan());
		}
		if (ecqi.getCreditCard() != null){
			diff.filter(ecqi.getCreditCard());
		}
		if (ecqi.getCreditLoan()!= null){
			diff.filter(ecqi.getCreditLoan());
		}
		return ecqi;
	}
}
