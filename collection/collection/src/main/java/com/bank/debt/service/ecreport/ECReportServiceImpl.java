package com.bank.debt.service.ecreport;

import java.io.IOException;
import java.io.OutputStream;
import java.sql.Date;
import java.sql.Timestamp;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.List;

import javax.annotation.Resource;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.commons.CommonsMultipartFile;

import com.bank.debt.model.dao.entrustedcasemanager.EntrustedCaseManagerDao;
import com.bank.debt.model.dao.entrustedcasemanager.EntrustedCaseManagerDaoImpl;
import com.bank.debt.model.dao.entrustedcasereport.EntrustedCaseReportDao;
import com.bank.debt.model.dao.entrustedcasereport.EntrustedCaseReportDaoImpl;
import com.bank.debt.model.dao.user.UserDao;
import com.bank.debt.model.dao.user.UserDaoImpl;
import com.bank.debt.model.entity.EntrustedCaseManagerEntity;
import com.bank.debt.model.entity.EntrustedCaseReportEntity;
import com.bank.debt.model.entity.UserEntity;
import com.bank.debt.protocol.entity.EntrustedCaseReport;
import com.bank.debt.protocol.entity.Result;
import com.bank.debt.protocol.error.ErrorCode;
import com.bank.debt.protocol.tools.Checking;
import com.bank.debt.protocol.tools.PathUtil;
import com.bank.debt.protocol.tools.map.Mapper;
import com.bank.debt.protocol.tools.map.Mapping;
import com.bank.debt.protocol.tools.map.MappingFailedException;
import com.bank.debt.protocol.tools.map.MappingSkipException;
import com.bank.debt.service.service.ftp.FtpService;

import net.sf.json.JSONArray;

@Service(ECReportServiceImpl.NAME)
@Transactional("transaction")
public class ECReportServiceImpl implements ECReportService {
	@Resource(name=UserDaoImpl.NAME)
	UserDao userDao;

	@Resource(name=EntrustedCaseManagerDaoImpl.NAME)
	EntrustedCaseManagerDao entrustedCaseManagerDao;

	@Resource(name=EntrustedCaseReportDaoImpl.NAME)
	EntrustedCaseReportDao entrustedCaseReportDao;

	@Autowired
	FtpService ftpService;
	
	public final static String NAME = "ECReportServiceImpl";

	@Override
	public List<EntrustedCaseReport> getECReports(Integer entrustedCase) throws MappingFailedException {
		List<EntrustedCaseReportEntity> ecres = entrustedCaseReportDao.getByECId(entrustedCase);		
		Mapper<EntrustedCaseReportEntity, EntrustedCaseReport> mapper = new Mapper<EntrustedCaseReportEntity, EntrustedCaseReport>();
		mapper.setMapping(new Mapping<EntrustedCaseReportEntity, EntrustedCaseReport>(){

			SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd");
			
			@Override
			public EntrustedCaseReport onMap(EntrustedCaseReportEntity from)
					throws MappingSkipException, MappingFailedException {
				EntrustedCaseReport ecr = new EntrustedCaseReport();
				ecr.setId(from.getId());
				ecr.setContent(from.getContent());
				ecr.setDate(formatter.format(from.getDate()));
				ecr.setEntrustedCaseId(from.getEntrustedCaseManager().getId());
				ecr.setAttachements((String[]) from.jsonAttachements().toArray());
				ecr.setTitle(from.getTitle());
				return ecr;
			}
		});
		return mapper.map(ecres);
	}

	@Override
	public boolean downloadAttachement(Integer report, String attachement, OutputStream outputStream) throws IOException {
		EntrustedCaseReportEntity ecre = entrustedCaseReportDao.getById(report);
		if (ecre != null){
			ftpService.downloadFile(
					PathUtil.reportAttachementPath(ecre.getEntrustedCaseManager().getId(), ecre.getCreator().getId(), report), attachement, outputStream);
			return true;
		}
		return false;
	}

	@Override
	public Result updateReport(String userName, EntrustedCaseReport ecr, CommonsMultipartFile[] attachements) throws IOException {
		UserEntity usr = userDao.getUserByName(userName);
		EntrustedCaseReportEntity ecre = entrustedCaseReportDao.getById(ecr.getId());
		if (ecre != null && usr != null){
			
			ecre.setModifier(usr);
			ecre.setLastModifiedTime(new Timestamp(Calendar.getInstance().getTimeInMillis()));
			
			if (ecr.getTitle() != null){
				ecre.setTitle(ecr.getTitle());
			}
			
			if (ecr.getContent() != null){
				ecre.setContent(ecr.getContent());
			}
			
			if (ecr.getDate() != null){
				ecre.setDate(Date.valueOf(ecr.getDate()));
			}
			
			if (Checking.isExist(attachements)){
				JSONArray jattachs = ecre.jsonAttachements();
				for (CommonsMultipartFile attach : attachements){
					ftpService.updoadFile(
							PathUtil.reportAttachementPath(ecre.getEntrustedCaseManager().getId(), ecre.getCreator().getId(), ecre.getId()), 
							attach.getName(), 
							attach.getInputStream());
					jattachs.add(attach.getName());
				}
				ecre.setAttachements(jattachs.toString());
			}
			

			entrustedCaseReportDao.merge(ecre);
			return ErrorCode.OK;

		}
		return ErrorCode.ECR_NOT_EXIST;
	}

	@Override
	public Result createReport(String userName, EntrustedCaseReport ecr, CommonsMultipartFile[] attachements) throws IOException {
		UserEntity usr = userDao.getUserByName(userName);
		EntrustedCaseManagerEntity ecme = entrustedCaseManagerDao.getById(ecr.getEntrustedCaseId());
		if (ecme != null && usr != null){
			EntrustedCaseReportEntity ecre = new EntrustedCaseReportEntity();
			ecre.setEntrustedCaseManager(ecme);
			ecre.setCreatedTime(new Timestamp(Calendar.getInstance().getTimeInMillis()));
			ecre.setCreator(usr);
			ecre.setLastModifiedTime(new Timestamp(Calendar.getInstance().getTimeInMillis()));
			ecre.setTitle(ecr.getTitle());
			ecre.setContent(ecr.getContent());
			ecre.setModifier(usr);			
			if (ecr.getDate() != null){
				ecre.setDate(Date.valueOf(ecr.getDate()));
			}else{
				ecre.setDate(new Date(Calendar.getInstance().getTimeInMillis()));
			}
			
			if (Checking.isExist(attachements)){
				JSONArray jattachs = ecre.jsonAttachements();
				for (CommonsMultipartFile attach : attachements){
					ftpService.updoadFile(
							PathUtil.reportAttachementPath(ecre.getEntrustedCaseManager().getId(), ecre.getCreator().getId(), ecre.getId()), 
							attach.getName(), 
							attach.getInputStream());
					jattachs.add(attach.getName());
				}
				ecre.setAttachements(jattachs.toString());
			}
			entrustedCaseReportDao.merge(ecre);
			return ErrorCode.OK;
		}
		return ErrorCode.ECR_SUBMIT_FAILED;
	}
}
