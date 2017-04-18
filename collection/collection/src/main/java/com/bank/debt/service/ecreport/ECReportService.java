package com.bank.debt.service.ecreport;

import java.io.IOException;
import java.io.OutputStream;
import java.sql.Date;
import java.util.List;

import org.springframework.web.multipart.commons.CommonsMultipartFile;

import com.bank.debt.protocol.entity.EntrustedCaseReport;
import com.bank.debt.protocol.entity.Result;
import com.bank.debt.protocol.tools.map.MappingFailedException;


public interface ECReportService {

	List<EntrustedCaseReport> getECReports(Integer entrustedCase) throws MappingFailedException;

	boolean downloadAttachement(Integer report, String attachement, OutputStream outputStream) throws IOException;

	Result createReport(String userName, EntrustedCaseReport ecr, List<String> phoneNames, CommonsMultipartFile[] attachements) throws IOException;

	Result updateReport(String userName, EntrustedCaseReport ecr, List<String> phoneNames, CommonsMultipartFile[] attachements) throws IOException;

	List<EntrustedCaseReport> getECReports(Integer entrustedCase, Date date) throws MappingFailedException;


}
