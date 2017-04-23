package com.bank.debt.service.entrustedcase;

import java.io.IOException;
import java.io.OutputStream;
import java.util.List;

import org.springframework.web.multipart.commons.CommonsMultipartFile;

import com.bank.debt.model.entity.ECCarLoanEntity;
import com.bank.debt.model.entity.ECCreditCardEntity;
import com.bank.debt.model.entity.ECCreditLoanEntity;
import com.bank.debt.protocol.entity.AcceptSummary;
import com.bank.debt.protocol.entity.AssignSummary;
import com.bank.debt.protocol.entity.EC;
import com.bank.debt.protocol.entity.QueryOption;
import com.bank.debt.protocol.entity.Result;
import com.bank.debt.protocol.tools.map.MappingFailedException;

import net.sf.json.JSONArray;

public interface EntrustedCaseService {

	Result importCarLoan(String owner, Integer type, CommonsMultipartFile file);

	Result importCreditCard(String owner, Integer type, CommonsMultipartFile file);

	Result importCreditLoan(String owner, Integer type, CommonsMultipartFile file);

	void getDownloadCarLoan(String userName, QueryOption qOpt, OutputStream outputStream) throws MappingFailedException, IOException;

	void getDownloadCreditCard(String userName, QueryOption qOpt, OutputStream outputStream) throws MappingFailedException, IOException;

	void getDownloadCreditLoan(String userName, QueryOption qOpt, OutputStream outputStream) throws MappingFailedException, IOException;

	List<EC<ECCarLoanEntity>> searchCarLoan(String userName, QueryOption qOpt);

	List<EC<ECCreditCardEntity>> searchCreditCard(String userName, QueryOption qOpt);

	List<EC<ECCreditLoanEntity>> searchCreditLoan(String userName, QueryOption qOpt);

	Result updateCreditLoan(String userName, JSONArray jdata) throws IOException;

	Result updateCreditCard(String userName, JSONArray jdata) throws IOException;

	Result updateCarLoan(String userName, JSONArray jdata) throws IOException;

	AssignSummary getAssignSummary(String userName);

	AcceptSummary getAcceptSummary(String userName);

}
