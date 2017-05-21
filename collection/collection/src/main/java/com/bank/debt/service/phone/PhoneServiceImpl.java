package com.bank.debt.service.phone;

import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.sql.Date;
import java.sql.Timestamp;
import java.text.SimpleDateFormat;
import java.util.List;
import java.util.UUID;

import javax.annotation.Resource;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.bank.debt.model.dao.eccarloan.ECCarLoanDao;
import com.bank.debt.model.dao.eccarloan.ECCarLoanDaoImpl;
import com.bank.debt.model.dao.eccreditcard.ECCreditCardDao;
import com.bank.debt.model.dao.eccreditcard.ECCreditCardDaoImpl;
import com.bank.debt.model.dao.eccreditloan.ECCreditLoanDao;
import com.bank.debt.model.dao.eccreditloan.ECCreditLoanDaoImpl;
import com.bank.debt.model.dao.entrustedcasemanager.EntrustedCaseManagerDao;
import com.bank.debt.model.dao.entrustedcasereport.EntrustedCaseReportDao;
import com.bank.debt.model.dao.phonerecord.PhoneRecordDao;
import com.bank.debt.model.dao.phonerecord.PhoneRecordDaoImpl;
import com.bank.debt.model.entity.PhoneRecordEntity;
import com.bank.debt.protocol.entity.Attachement;
import com.bank.debt.protocol.entity.PhoneRecord;
import com.bank.debt.protocol.entity.PhoneRecordStatus;
import com.bank.debt.protocol.entity.Result;
import com.bank.debt.protocol.error.ErrorCode;
import com.bank.debt.protocol.tools.map.Mapper;
import com.bank.debt.protocol.tools.map.Mapping;
import com.bank.debt.protocol.tools.map.MappingFailedException;
import com.bank.debt.protocol.tools.map.MappingSkipException;
import com.bank.debt.protocol.type.EntrustedCaseType;
import com.bank.debt.service.attachement.AttachementService;
import com.bank.debt.service.service.ftp.FtpService;


@Service(PhoneServiceImpl.NAME)
@Transactional("transaction")
public class PhoneServiceImpl implements PhoneService {
	@Resource(name=PhoneRecordDaoImpl.NAME)
	PhoneRecordDao phoneRecordDao;

	
	@Autowired
	EntrustedCaseReportDao ecrDao;
	
	@Autowired
	AttachementService attachementService;
	
	@Autowired
	FtpService ftpService;
	
	@Autowired 
	EntrustedCaseManagerDao ecmDao;
	
	
	@Resource(name=ECCarLoanDaoImpl.NAME)
	ECCarLoanDao eCCarLoanDao;

	@Resource(name=ECCreditLoanDaoImpl.NAME)
	ECCreditLoanDao eCCreditLoanDao;

	@Resource(name=ECCreditCardDaoImpl.NAME)
	ECCreditCardDao eCCreditCardDao;
	
	
	public final static String NAME = "PhoneServiceImpl";

	@Override
	public List<PhoneRecord> getCallRecords() {
		List<PhoneRecordEntity> res = phoneRecordDao.getAll();
		Mapper<PhoneRecordEntity, PhoneRecord> mapper = new Mapper<PhoneRecordEntity, PhoneRecord>(new Mapping<PhoneRecordEntity, PhoneRecord>(){

			SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
			 
			@Override
			public PhoneRecord onMap(PhoneRecordEntity from) throws MappingSkipException, MappingFailedException {
				PhoneRecord pr = new PhoneRecord();
				pr.setRecId(from.getId());
				pr.setPhoneNum(from.getNumber());
				if (from.getEntrustedCaseManager() != null){
					pr.setEcId(from.getEntrustedCaseManager().getId());
					pr.setEcType(from.getEntrustedCaseManager().getType());
					switch (from.getEntrustedCaseManager().getType()){
					case EntrustedCaseType.CAR_LOAN:
						pr.setEcCode(eCCarLoanDao.getById(from.getEntrustedCaseManager().getEntrustedCase()).getCode());
						break;
					case EntrustedCaseType.CREDIT_CARD:
						pr.setEcCode(eCCreditLoanDao.getById(from.getEntrustedCaseManager().getEntrustedCase()).getCode());
						break;
					case EntrustedCaseType.CREDIT_LOAN:
						pr.setEcCode(eCCreditCardDao.getById(from.getEntrustedCaseManager().getEntrustedCase()).getCode());
						break;
					}
				}
				pr.setStatus(from.getStatus());
				if (from.getStartTime() != null){
					pr.setTime(formatter.format(from.getStartTime()));
				}
				return pr;
			}
			
		});
		return mapper.forceMap(res);
	}

	@Override
	public Result uploadRecord(String number, Integer status, String name, InputStream inputStream) throws IOException {
		PhoneRecordEntity pre = new PhoneRecordEntity();
		pre.setNumber(number);
		pre.setStatus(status);
		pre.setStartTime(new Timestamp(System.currentTimeMillis()));
		Attachement attach  = new Attachement();
		attach.setDisplay(name);
		attach.setFileAddress("/PHONE_RECORDS/" + UUID.randomUUID().toString());
		Integer attachId = attachementService.uploadAttachement(attach, inputStream);
		if (null != attachId){	
			pre.setAttachement(attachId);
			pre.setEndTime(new Timestamp(System.currentTimeMillis()));
			this.phoneRecordDao.merge(pre);
			Result ok = ErrorCode.OK.clone();
			ok.setMsg(attachId + "");
			return ok;
		}
		return ErrorCode.PHONE_UPLOAD_FAILED;
	}

	@Override
	public Result recordMissedCall(String number, String time) {
		PhoneRecordEntity pre = new PhoneRecordEntity();
		pre.setNumber(number);
		pre.setStatus(PhoneRecordStatus.missed);
		pre.setStartTime(new Timestamp(Date.valueOf(time).getTime()));
		phoneRecordDao.merge(pre);
		return ErrorCode.OK;
	}

	@Override
	public Result donwloandRecord(Integer attachId, OutputStream os) throws IOException {
		if (attachementService.downloadAttachement(attachId, os)){
			return ErrorCode.OK;
		}
		return ErrorCode.PHONE_DOWNLOAD_FAILED;
	}

	@Override
	public Result updateStatus(Integer recId, Integer status) {
		PhoneRecordEntity pre = phoneRecordDao.getById(recId);
		if (null != pre && null != status){
			pre.setStatus(status);
			phoneRecordDao.merge(pre);
			return ErrorCode.OK;
		}
		return ErrorCode.PHONE_UPDATESTATUS_FAILED;
	}



}
