package com.bank.debt.service.ecreport;

import java.io.IOException;
import java.io.OutputStream;
import java.sql.Date;
import java.sql.Timestamp;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.List;
import java.util.UUID;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.commons.CommonsMultipartFile;

import com.bank.debt.model.dao.attachement.AttachementDao;
import com.bank.debt.model.dao.entrustedcasemanager.EntrustedCaseManagerDao;
import com.bank.debt.model.dao.entrustedcasemanager.EntrustedCaseManagerDaoImpl;
import com.bank.debt.model.dao.entrustedcasereport.EntrustedCaseReportDao;
import com.bank.debt.model.dao.entrustedcasereport.EntrustedCaseReportDaoImpl;
import com.bank.debt.model.dao.phonerecord.PhoneRecordDao;
import com.bank.debt.model.dao.user.UserDao;
import com.bank.debt.model.dao.user.UserDaoImpl;
import com.bank.debt.model.entity.AttachementEntity;
import com.bank.debt.model.entity.EntrustedCaseManagerEntity;
import com.bank.debt.model.entity.EntrustedCaseReportEntity;
import com.bank.debt.model.entity.PhoneRecordEntity;
import com.bank.debt.model.entity.UserEntity;
import com.bank.debt.protocol.entity.Attachement;
import com.bank.debt.protocol.entity.EntrustedCaseReport;
import com.bank.debt.protocol.entity.PhoneRecordStatus;
import com.bank.debt.protocol.entity.Result;
import com.bank.debt.protocol.error.ErrorCode;
import com.bank.debt.protocol.tools.Checking;
import com.bank.debt.protocol.tools.PathUtil;
import com.bank.debt.protocol.tools.map.AttachMapping;
import com.bank.debt.protocol.tools.map.Mapper;
import com.bank.debt.protocol.tools.map.Mapping;
import com.bank.debt.protocol.tools.map.MappingFailedException;
import com.bank.debt.protocol.tools.map.MappingSkipException;
import com.bank.debt.service.attachement.AttachementService;
import com.bank.debt.service.attachement.AttachementService.OnGetAttachement;
import com.bank.debt.service.phone.PhoneService;
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
	
	@Autowired
	PhoneService phoneService;
	
	@Autowired
	AttachementService attachementService;
	
	@Autowired
	AttachementDao attachementDao;
	
	@Autowired
	PhoneRecordDao phoneRecordDao;
	
	Mapping<EntrustedCaseReportEntity, EntrustedCaseReport> reportMapping = new Mapping<EntrustedCaseReportEntity, EntrustedCaseReport>(){

		SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd");
		Mapper<AttachementEntity, Attachement> attachMapper = new Mapper<AttachementEntity, Attachement>(AttachMapping.ae2aMapping);
		
		@Override
		public EntrustedCaseReport onMap(EntrustedCaseReportEntity from)
				throws MappingSkipException, MappingFailedException {
			EntrustedCaseReport ecr = new EntrustedCaseReport();
			ecr.setId(from.getId());
			ecr.setContent(from.getContent());
			ecr.setDate(formatter.format(from.getDate()));
			ecr.setEntrustedCaseId(from.getEntrustedCaseManager().getId());
			ecr.setAttachements(attachMapper.forceMap(from.getAttachements()));
			ecr.setTitle(from.getTitle());
			return ecr;
		}
	};
	
	public final static String NAME = "ECReportServiceImpl";

	@Override
	public List<EntrustedCaseReport> getECReports(Integer entrustedCase) {
		List<EntrustedCaseReportEntity> ecres = entrustedCaseReportDao.getByECId(entrustedCase);		
		Mapper<EntrustedCaseReportEntity, EntrustedCaseReport> mapper = new Mapper<EntrustedCaseReportEntity, EntrustedCaseReport>();
		mapper.setMapping(reportMapping);
		return mapper.forceMap(ecres);
	}
	
	@Override
	public List<EntrustedCaseReport> getECReports(Integer entrustedCase, Date date) throws MappingFailedException {
		List<EntrustedCaseReportEntity> ecres = entrustedCaseReportDao.getByECId(entrustedCase, date);		
		Mapper<EntrustedCaseReportEntity, EntrustedCaseReport> mapper = new Mapper<EntrustedCaseReportEntity, EntrustedCaseReport>();
		mapper.setMapping(reportMapping);
		return mapper.map(ecres);
	}

	@Override
	public boolean downloadAttachement(Integer attachement, HttpServletResponse response) throws IOException {
		
		Attachement acch = attachementService.getAttachement(attachement);
		response.setContentType("application/octet-stream");
		response.setHeader("Content-disposition", "attachment;filename=\""
				+ java.net.URLEncoder.encode(acch.getDisplay(), "UTF-8") + "\"");
		return downloadAttachement(attachement, response.getOutputStream());
	}
	
	@Override
	public boolean downloadAttachement(Integer attachement, OutputStream os) throws IOException {
		return attachementService.downloadAttachement(attachement, os);
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
				List<AttachementEntity> aes = ecre.getAttachements();
				if (null == ecre){
					aes = new ArrayList<AttachementEntity>();
				}
				
				Attachement atta = new Attachement();
				for (CommonsMultipartFile attach : attachements){
					atta.setDisplay(Checking.getFileName(attach));
					atta.setFileAddress(PathUtil.reportAttachementPath(
							ecre.getEntrustedCaseManager().getId(), 
							ecre.getCreator().getId(), 
							ecre.getId()) + UUID.randomUUID() + atta.getDisplay());
					Integer attaId = attachementService.uploadAttachement(atta, attach.getInputStream());
					if (attaId != null){
						aes.add(attachementDao.getById(attaId));
					}
				}
				
				ecre.setAttachements(aes);
			}
			
			entrustedCaseReportDao.merge(ecre);
			return ErrorCode.OK;

		}
		return ErrorCode.ECR_NOT_EXIST;
	}

	
	class OnGetAttachListener implements OnGetAttachement{
		
		EntrustedCaseReportEntity ecre;

		public OnGetAttachListener(EntrustedCaseReportEntity ecre) {
			super();
			this.ecre = ecre;
		}

		@Override
		public void onGetAttachement(AttachementEntity attach) {
			if (attach != null){
				PhoneRecordEntity pre = phoneRecordDao.getByAttachement(attach.getId());
				pre.setEntrustedCaseManager(ecre.getEntrustedCaseManager());
				phoneRecordDao.merge(pre);
				List<AttachementEntity> aes = ecre.getAttachements();
				if (null == aes){
					aes = new ArrayList<AttachementEntity>();
				}
				aes.add(attach);
				ecre.setAttachements(aes);
				entrustedCaseReportDao.merge(ecre);
			}
		}
	};
	
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
			ecre.setModifier(usr);
			ecre.setContent(ecr.getContent());
			if (ecr.getDate() != null){
				ecre.setDate(Date.valueOf(ecr.getDate()));
			}else{
				ecre.setDate(new Date(Calendar.getInstance().getTimeInMillis()));
			}
			

			if (ecr.getPhoneRecId() != null) {
				// 由 接电话 产生的 report
				PhoneRecordEntity pre = phoneRecordDao.getById(ecr.getPhoneRecId());
				pre.setEntrustedCaseManager(ecme);
				phoneRecordDao.merge(pre);

				List<AttachementEntity> aes = new ArrayList<AttachementEntity>();
				AttachementEntity ae = attachementDao.getById(pre.getAttachement());
				aes.add(ae);
				ecre.setAttachements(aes);
				entrustedCaseReportDao.merge(ecre);
			} else if (ecr.getAttachements() != null && ecr.getAttachements().size() == 1) {
				// 由 打电话 产生的 report
				ecre = entrustedCaseReportDao.merge(ecre);
				attachementService.getAttachementAsync(ecr.getAttachements().get(0).getDisplay(),
						new OnGetAttachListener(ecre));
			} else {
				if (Checking.isExist(attachements)) {
					List<AttachementEntity> aes = new ArrayList<AttachementEntity>();
					Attachement atta = new Attachement();
					for (CommonsMultipartFile attach : attachements) {
						atta.setDisplay(Checking.getFileName(attach));
						atta.setFileAddress(PathUtil.reportAttachementPath(ecre.getEntrustedCaseManager().getId(),
								ecre.getCreator().getId(), ecre.getId()) + UUID.randomUUID() + atta.getDisplay());
						Integer attaId = attachementService.uploadAttachement(atta, attach.getInputStream());
						if (attaId != null) {
							aes.add(attachementDao.getById(attaId));
						}
					}
					ecre.setAttachements(aes);
				}
				entrustedCaseReportDao.merge(ecre);
			}
			
			return ErrorCode.OK;
		}
		return ErrorCode.ECR_SUBMIT_FAILED;
	}


}
