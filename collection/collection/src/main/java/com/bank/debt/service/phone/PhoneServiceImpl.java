package com.bank.debt.service.phone;

import java.io.IOException;
import java.io.InputStream;
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

import com.bank.debt.model.dao.entrustedcasemanager.EntrustedCaseManagerDao;
import com.bank.debt.model.dao.phonerecord.PhoneRecordDao;
import com.bank.debt.model.dao.phonerecord.PhoneRecordDaoImpl;
import com.bank.debt.model.entity.EntrustedCaseManagerEntity;
import com.bank.debt.model.entity.PhoneRecordEntity;
import com.bank.debt.protocol.entity.PhoneRecord;
import com.bank.debt.protocol.entity.Result;
import com.bank.debt.protocol.error.ErrorCode;
import com.bank.debt.protocol.tools.PathUtil;
import com.bank.debt.protocol.tools.PathUtil.UploadName;
import com.bank.debt.protocol.tools.map.Mapper;
import com.bank.debt.protocol.tools.map.Mapping;
import com.bank.debt.protocol.tools.map.MappingFailedException;
import com.bank.debt.protocol.tools.map.MappingSkipException;
import com.bank.debt.service.service.ftp.FtpService;


@Service(PhoneServiceImpl.NAME)
@Transactional("transaction")
public class PhoneServiceImpl implements PhoneService {
	@Resource(name=PhoneRecordDaoImpl.NAME)
	PhoneRecordDao phoneRecordDao;

	@Autowired
	FtpService ftpService;
	
	@Autowired 
	EntrustedCaseManagerDao ecmDao;
	
	public final static String NAME = "PhoneServiceImpl";

	@Override
	public List<PhoneRecord> getCallRecords() {
		List<PhoneRecordEntity> res = phoneRecordDao.getAll();
		Mapper<PhoneRecordEntity, PhoneRecord> mapper = new Mapper<PhoneRecordEntity, PhoneRecord>(new Mapping<PhoneRecordEntity, PhoneRecord>(){

			SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
			 
			@Override
			public PhoneRecord onMap(PhoneRecordEntity from) throws MappingSkipException, MappingFailedException {
				PhoneRecord pr = new PhoneRecord();
				pr.setPhoneNum(from.getNumber());
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
	public Result uploadRecord(UploadName un, InputStream inputStream) throws IOException {
		if (ftpService.updoadFile(PathUtil.phoneRecordPath(un.getNumber()), un.getName(), inputStream)){
			EntrustedCaseManagerEntity ecm = ecmDao.getById(un.getEcId());
			PhoneRecordEntity pre = new PhoneRecordEntity();
			if (null != ecm){
				pre.setEntrustedCase(ecm.getId());
				pre.setNumber(un.getNumber());
				pre.setStatus(0);				
				pre.setStartTime(un.getTime());
				phoneRecordDao.merge(pre);
			}
			return ErrorCode.OK;
		}
		return ErrorCode.PHONE_UPLOAD_FAILED;
	}

	@Override
	public Result recordMissedCall(String number, String time) {
		PhoneRecordEntity pre = new PhoneRecordEntity();
		pre.setNumber(number);
		pre.setStatus(1);
		pre.setStartTime(new Timestamp(Date.valueOf(time).getTime()));
		phoneRecordDao.merge(pre);
		return ErrorCode.OK;
	}

	@Override
	public Result donwloandRecord(UploadName un, OutputStream os) throws IOException {
		if (ftpService.downloadFile(PathUtil.phoneRecordPath(un.getNumber()),  un.getName(), os)){
			return ErrorCode.OK;
		}
		return ErrorCode.PHONE_DOWNLOAD_FAILED;
	}



}
