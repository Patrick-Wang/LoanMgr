package com.bank.debt.service.ecreport;

import java.io.IOException;
import java.io.OutputStream;
import java.sql.Date;
import java.util.List;

import javax.servlet.http.HttpServletResponse;

import org.springframework.web.multipart.commons.CommonsMultipartFile;

import com.bank.debt.model.entity.AttachementEntity;
import com.bank.debt.protocol.entity.EntrustedCaseReport;
import com.bank.debt.protocol.entity.Result;
import com.bank.debt.protocol.tools.map.MappingFailedException;


public interface ECReportService {

	List<EntrustedCaseReport> getECReports(Integer entrustedCase) ;

	boolean downloadAttachement(Integer attachement, HttpServletResponse response) throws IOException;

	Result createReport(String userName, EntrustedCaseReport ecr, CommonsMultipartFile[] attachements) throws IOException;

	Result updateReport(String userName, EntrustedCaseReport ecr, CommonsMultipartFile[] attachements) throws IOException;

	List<EntrustedCaseReport> getECReports(Integer entrustedCase, Date date) throws MappingFailedException;

	boolean downloadAttachement(Integer attach, OutputStream os) throws IOException;


}
