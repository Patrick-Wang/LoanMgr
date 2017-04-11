package com.bank.debt.service.entrustedcase;

import java.io.IOException;
import java.io.OutputStream;
import java.util.List;

import org.springframework.web.multipart.commons.CommonsMultipartFile;

import com.bank.debt.protocol.entity.Result;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

public interface EntrustedCaseService {

	Result importCarLoan(String owner, Integer type, CommonsMultipartFile file);

	Result importCreditCard(String owner, Integer type, CommonsMultipartFile file);

	Result importCreditLoan(String owner, Integer type, CommonsMultipartFile file);

	List<String> getAllowIfsCarLoan(String userName);

	List<String> getAllowIfsCreditLoan(String userName);

	List<String> getAllowIfsCreditCard(String userName);

	void getDownloadCarLoan(String userName, JSONObject queryParam, OutputStream outputStream);

	void getDownloadCreditCard(String userName, JSONObject queryParam, OutputStream outputStream);

	void getDownloadCreditLoan(String userName, JSONObject queryParam, OutputStream outputStream);

	JSONArray searchCarLoan(String userName, JSONObject queryParam);

	JSONArray searchCreditCard(String userName, JSONObject queryParam);

	JSONArray searchCreditLoan(String userName, JSONObject queryParam);

	Result updateCreditLoan(String userName, JSONArray jdata) throws IOException;

	Result updateCreditCard(String userName, JSONArray jdata) throws IOException;

	Result updateCarLoan(String userName, JSONArray jdata) throws IOException;


}
