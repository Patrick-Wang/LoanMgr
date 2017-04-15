package com.bank.debt.service.entrustedcase;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.sql.Timestamp;
import java.util.Calendar;
import java.util.List;
import java.util.zip.ZipEntry;
import java.util.zip.ZipOutputStream;

import javax.annotation.Resource;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.commons.CommonsMultipartFile;

import com.bank.debt.model.dao.authority.AuthorityDao;
import com.bank.debt.model.dao.authority.AuthorityDaoImpl;
import com.bank.debt.model.dao.ecbatchcreator.ECBatchCreatorDao;
import com.bank.debt.model.dao.ecbatchcreator.ECBatchCreatorDaoImpl;
import com.bank.debt.model.dao.eccarloan.ECCarLoanDao;
import com.bank.debt.model.dao.eccarloan.ECCarLoanDaoImpl;
import com.bank.debt.model.dao.eccreditcard.ECCreditCardDao;
import com.bank.debt.model.dao.eccreditcard.ECCreditCardDaoImpl;
import com.bank.debt.model.dao.eccreditloan.ECCreditLoanDao;
import com.bank.debt.model.dao.eccreditloan.ECCreditLoanDaoImpl;
import com.bank.debt.model.dao.entrustedcasemanager.EntrustedCaseManagerDao;
import com.bank.debt.model.dao.entrustedcasemanager.EntrustedCaseManagerDaoImpl;
import com.bank.debt.model.dao.user.UserDao;
import com.bank.debt.model.dao.user.UserDaoImpl;
import com.bank.debt.model.entity.ECCarLoanEntity;
import com.bank.debt.model.entity.ECCreditCardEntity;
import com.bank.debt.model.entity.ECCreditLoanEntity;
import com.bank.debt.model.entity.EntrustedCaseManagerEntity;
import com.bank.debt.model.entity.IntfEntity;
import com.bank.debt.model.entity.UserEntity;
import com.bank.debt.protocol.entity.BaseEC;
import com.bank.debt.protocol.entity.ECCarLoan;
import com.bank.debt.protocol.entity.ECCreditCard;
import com.bank.debt.protocol.entity.ECCreditLoan;
import com.bank.debt.protocol.entity.ECQueryInfo;
import com.bank.debt.protocol.entity.EntrustedCaseReport;
import com.bank.debt.protocol.entity.IF;
import com.bank.debt.protocol.entity.QueryOption;
import com.bank.debt.protocol.entity.Result;
import com.bank.debt.protocol.error.ErrorCode;
import com.bank.debt.protocol.tools.AuthUtil;
import com.bank.debt.protocol.tools.Checking;
import com.bank.debt.protocol.tools.JsonUtil;
import com.bank.debt.protocol.tools.PathUtil;
import com.bank.debt.protocol.tools.map.ECQI2XlsMapping;
import com.bank.debt.protocol.tools.map.Mapper;
import com.bank.debt.protocol.tools.map.Mapping;
import com.bank.debt.protocol.tools.map.MappingFailedException;
import com.bank.debt.protocol.tools.map.MappingSkipException;
import com.bank.debt.protocol.tools.map.Xls2JsonMapping;
import com.bank.debt.protocol.tools.map.Xlsx2JsonMapping;
import com.bank.debt.protocol.type.EntrustedCaseType;
import com.bank.debt.service.ecreport.ECReportService;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

@Service(EntrustedCaseServiceImpl.NAME)
@Transactional("transaction")
public class EntrustedCaseServiceImpl implements EntrustedCaseService {
	@Resource(name=ECBatchCreatorDaoImpl.NAME)
	ECBatchCreatorDao eCBatchCreatorDao;

	@Resource(name=AuthorityDaoImpl.NAME)
	AuthorityDao authorityDao;

	@Resource(name=UserDaoImpl.NAME)
	UserDao userDao;
	
	@Resource(name=EntrustedCaseManagerDaoImpl.NAME)
	EntrustedCaseManagerDao entrustedCaseManagerDao;

	@Resource(name=ECCarLoanDaoImpl.NAME)
	ECCarLoanDao eCCarLoanDao;

	@Resource(name=ECCreditLoanDaoImpl.NAME)
	ECCreditLoanDao eCCreditLoanDao;

	@Resource(name=ECCreditCardDaoImpl.NAME)
	ECCreditCardDao eCCreditCardDao;

	@Autowired
	ECReportService eCReportService;
	
	
	Mapping<IntfEntity, IF> ifMapping = new Mapping<IntfEntity, IF>(){

		@Override
		public IF onMap(IntfEntity from) throws MappingSkipException, MappingFailedException {
			IF inif = new IF();
			inif.setAddress(from.getAddress());
			inif.setDescription(from.getDescription());
			return inif;
		}
	};
	
	public final static String NAME = "EntrustedCaseServiceImpl";

	@Override
	public Result importCarLoan(String owner, Integer type, CommonsMultipartFile file) {
		Result r = ErrorCode.ACCOUNT_UPDATE_FALIED.clone();
		UserEntity usr = userDao.getUserByName(owner);
		if (null != usr){
			JSONArray data = null;
			try {
				if (file.getName().endsWith("xls")){
					Mapper<InputStream, JSONArray> mapper = new Mapper<InputStream, JSONArray>();
					mapper.setMapping(new Xls2JsonMapping(ECCarLoanEntity.class));
					data = mapper.map(file.getInputStream());
				}else if (file.getName().endsWith("xlsx")){
					Mapper<InputStream, JSONArray> mapper = new Mapper<InputStream, JSONArray>();
					mapper.setMapping(new Xlsx2JsonMapping(ECCarLoanEntity.class));
					data = mapper.map(file.getInputStream());
				}

			} catch (IOException e) {
				r.setMsg(e.getMessage());
				e.printStackTrace();
			} catch (MappingFailedException e) {
				r.setMsg(e.getMessage());
				e.printStackTrace();
			}
			
			if (null != data){
				Timestamp current = new Timestamp(Calendar.getInstance().getTimeInMillis());
				List<ECCarLoanEntity> eccls = JsonUtil.toObjects(data, ECCarLoanEntity.class);
				Integer batchNo = null;
				if (!eccls.isEmpty()){
					batchNo = eCBatchCreatorDao.createBatchNo(current);
				}
				for (ECCarLoanEntity entity : eccls){
					entity = eCCarLoanDao.merge(entity);
					entity.updateCode();
					eCCarLoanDao.merge(entity);

					EntrustedCaseManagerEntity ecm = new EntrustedCaseManagerEntity();
					ecm.setOwner(usr);
					ecm.setBatchNo(batchNo);
					ecm.setModifier(usr);
					ecm.setCreatedTime(current);
					ecm.setLastModifiedTime(current);
					ecm.setEntrustedCase(entity.getId());
					ecm.setType(type);
					entrustedCaseManagerDao.merge(ecm);
				}
				r = ErrorCode.OK;
			}
		}
		return r;
	}

	@Override
	public Result importCreditCard(String owner, Integer type, CommonsMultipartFile file) {
		Result r = ErrorCode.ACCOUNT_UPDATE_FALIED.clone();
		UserEntity usr = userDao.getUserByName(owner);
		if (null != usr){
			JSONArray data = null;
			try {
				if (file.getName().endsWith("xls")){
					Mapper<InputStream, JSONArray> mapper = new Mapper<InputStream, JSONArray>();
					mapper.setMapping(new Xls2JsonMapping(ECCreditCardEntity.class));
					data = mapper.map(file.getInputStream());
				}else if (file.getName().endsWith("xlsx")){
					Mapper<InputStream, JSONArray> mapper = new Mapper<InputStream, JSONArray>();
					mapper.setMapping(new Xlsx2JsonMapping(ECCreditCardEntity.class));
					data = mapper.map(file.getInputStream());
				}
			} catch (IOException e) {
				r.setMsg(e.getMessage());
				e.printStackTrace();
			} catch (MappingFailedException e) {
				r.setMsg(e.getMessage());
				e.printStackTrace();
			}
			
			if (null != data){
				Timestamp current = new Timestamp(Calendar.getInstance().getTimeInMillis());
				List<ECCreditCardEntity> eccls = JsonUtil.toObjects(data, ECCreditCardEntity.class);
				Integer batchNo = null;
				if (!eccls.isEmpty()){
					batchNo = eCBatchCreatorDao.createBatchNo(current);
				}
				for (ECCreditCardEntity entity : eccls){
					entity = eCCreditCardDao.merge(entity);
					entity.updateCode();
					eCCreditCardDao.merge(entity);
					
					EntrustedCaseManagerEntity ecm = new EntrustedCaseManagerEntity();
					ecm.setOwner(usr);
					ecm.setBatchNo(batchNo);
					ecm.setModifier(usr);
					ecm.setCreatedTime(current);
					ecm.setLastModifiedTime(current);
					ecm.setEntrustedCase(entity.getId());
					ecm.setType(type);
					entrustedCaseManagerDao.merge(ecm);
				}
				r = ErrorCode.OK;
			}
		}
		return r;
	}

	@Override
	public Result importCreditLoan(String owner, Integer type, CommonsMultipartFile file) {
		Result r = ErrorCode.ACCOUNT_UPDATE_FALIED.clone();
		UserEntity usr = userDao.getUserByName(owner);
		if (null != usr){
			JSONArray data = null;
			try {
				if (file.getName().endsWith("xls")){
					Mapper<InputStream, JSONArray> mapper = new Mapper<InputStream, JSONArray>();
					mapper.setMapping(new Xls2JsonMapping(ECCreditLoanEntity.class));
					data = mapper.map(file.getInputStream());
				}else if (file.getName().endsWith("xlsx")){
					Mapper<InputStream, JSONArray> mapper = new Mapper<InputStream, JSONArray>();
					mapper.setMapping(new Xlsx2JsonMapping(ECCreditLoanEntity.class));
					data = mapper.map(file.getInputStream());
				}
			} catch (IOException e) {
				r.setMsg(e.getMessage());
				e.printStackTrace();
			} catch (MappingFailedException e) {
				r.setMsg(e.getMessage());
				e.printStackTrace();
			}
			
			if (null != data){
				Timestamp current = new Timestamp(Calendar.getInstance().getTimeInMillis());
				List<ECCreditLoanEntity> eccls = JsonUtil.toObjects(data, ECCreditLoanEntity.class);
				Integer batchNo = null;
				if (!eccls.isEmpty()){
					batchNo = eCBatchCreatorDao.createBatchNo(current);
				}
				for (ECCreditLoanEntity entity : eccls){
					entity = eCCreditLoanDao.merge(entity);
					entity.updateCode();
					eCCreditLoanDao.merge(entity);
					
					EntrustedCaseManagerEntity ecm = new EntrustedCaseManagerEntity();
					ecm.setOwner(usr);
					ecm.setBatchNo(batchNo);
					ecm.setModifier(usr);
					ecm.setCreatedTime(current);
					ecm.setLastModifiedTime(current);
					ecm.setEntrustedCase(entity.getId());
					ecm.setType(type);
					entrustedCaseManagerDao.merge(ecm);
				}
				r = ErrorCode.OK;
			}
		}
		return r;
	}


	List<IntfEntity> getAllowIfsCarLoan(String user) {
		UserEntity usr = userDao.getUserByName(user);
		if (null != usr){
			List<IntfEntity> auths = authorityDao.getAuthAddrs(usr.getRoles(), 1000, 1200);
			return auths;
		}
		return null;
	}


	List<IntfEntity> getAllowIfsCreditLoan(String user) {
		UserEntity usr = userDao.getUserByName(user);
		if (null != usr){
			List<IntfEntity> auths = authorityDao.getAuthAddrs(usr.getRoles(), 1200, 1400);
			return auths;
		}
		return null;
	}


	List<IntfEntity> getAllowIfsCreditCard(String user) {
		UserEntity usr = userDao.getUserByName(user);
		if (null != usr){
			List<IntfEntity> auths = authorityDao.getAuthAddrs(usr.getRoles(), 1400, 1600);
			return auths;
		}
		return null;
	}

	private void zipAttachement(ZipOutputStream zipOut, BaseEC baseEc) throws IOException{
		for (EntrustedCaseReport ecr : baseEc.getReports()){
			if (Checking.isExist(ecr.getAttachements())){
				for (String attach : ecr.getAttachements()){
					ByteArrayOutputStream baos = new ByteArrayOutputStream();
					eCReportService.downloadAttachement(ecr.getId(), attach, baos);
					zipOut.putNextEntry(new ZipEntry(PathUtil.zipReportAttachementPath(
							ecr.getDate(), ecr.getId(), ecr.getTitle(), attach)));
					zipOut.write(baos.toByteArray());
				}
			}
		}
	}
	
	private void zipECQI(ZipOutputStream zipOut, String name, ECQueryInfo ecqi) throws MappingFailedException, IOException{
		Mapper<ECQueryInfo, OutputStream> mapper2 = new Mapper<ECQueryInfo, OutputStream>(new ECQI2XlsMapping());
		ByteArrayOutputStream os = (ByteArrayOutputStream) mapper2.map(ecqi);
		zipOut.putNextEntry(new ZipEntry(name));
		zipOut.write(os.toByteArray());
	}
	
	
	@Override
	public void getDownloadCarLoan(String userName, QueryOption qOpt, OutputStream outputStream) throws MappingFailedException, IOException {
		List<IntfEntity> auths = getAllowIfsCarLoan(userName);
		if (null != auths && !auths.isEmpty()){
			List<ECCarLoan> eccls = eCCarLoanDao.search(qOpt);
			Mapper<IntfEntity, IF> mapper = new Mapper<IntfEntity, IF>(ifMapping);
			List<IF> ifs = mapper.forceMap(auths);
			ECQueryInfo ecqi = new ECQueryInfo();
			ecqi.setCarLoan(eccls);
			ecqi.setIfs(ifs);
			ZipOutputStream zipOut = new ZipOutputStream(outputStream);
			zipECQI(zipOut, "委案信息.xls", ecqi);
			for (int i = 0; i < eccls.size(); ++i){
				zipAttachement(zipOut, eccls.get(i));				
			}
		}
	}

	@Override
	public void getDownloadCreditCard(String userName, QueryOption qOpt, OutputStream outputStream) throws IOException, MappingFailedException {
		List<IntfEntity> auths = getAllowIfsCreditCard(userName);
		if (null != auths && !auths.isEmpty()){
			List<ECCreditCard> ecccs = eCCreditCardDao.search(qOpt);
			Mapper<IntfEntity, IF> mapper = new Mapper<IntfEntity, IF>(ifMapping);
			List<IF> ifs = mapper.forceMap(auths);
			ECQueryInfo ecqi = new ECQueryInfo();
			ecqi.setCreditCard(ecccs);
			ecqi.setIfs(ifs);
			ZipOutputStream zipOut = new ZipOutputStream(outputStream);
			zipECQI(zipOut, "委案信息.xls", ecqi);
			for (int i = 0; i < ecccs.size(); ++i){
				zipAttachement(zipOut, ecccs.get(i));				
			}
		}
	}

	@Override
	public void getDownloadCreditLoan(String userName, QueryOption qOpt, OutputStream outputStream) throws MappingFailedException, IOException {
		List<IntfEntity> auths = getAllowIfsCreditLoan(userName);
		if (null != auths && !auths.isEmpty()){
			List<ECCreditLoan> eccls = eCCreditLoanDao.search(qOpt);
			Mapper<IntfEntity, IF> mapper = new Mapper<IntfEntity, IF>(ifMapping);
			List<IF> ifs = mapper.forceMap(auths);
			ECQueryInfo ecqi = new ECQueryInfo();
			ecqi.setCreditLoan(eccls);
			ecqi.setIfs(ifs);
			ZipOutputStream zipOut = new ZipOutputStream(outputStream);
			zipECQI(zipOut, "委案信息.xls", ecqi);
			for (int i = 0; i < eccls.size(); ++i){
				zipAttachement(zipOut, eccls.get(i));				
			}
		}
	}

	@Override
	public ECQueryInfo searchCarLoan(String userName, QueryOption qOpt) {
		List<IntfEntity> auths = getAllowIfsCarLoan(userName);
		if (null != auths && !auths.isEmpty()){
			Mapper<IntfEntity, IF> mapper = new Mapper<IntfEntity, IF>(ifMapping);
			List<IF> ifs = mapper.forceMap(auths);
			List<ECCarLoan> eccls = eCCarLoanDao.search(qOpt);
			ECQueryInfo ecqi = new ECQueryInfo();
			ecqi.setCarLoan(eccls);
			ecqi.setIfs(ifs);
			return AuthUtil.filterECQI(ecqi);
		}
		return null;
	}

	@Override
	public ECQueryInfo searchCreditCard(String userName, QueryOption qOpt) {
		List<IntfEntity> auths = getAllowIfsCreditCard(userName);
		if (null != auths && !auths.isEmpty()){
			Mapper<IntfEntity, IF> mapper = new Mapper<IntfEntity, IF>(ifMapping);
			List<IF> ifs = mapper.forceMap(auths);
			List<ECCreditCard> ecccs = eCCreditCardDao.search(qOpt);
			ECQueryInfo ecqi = new ECQueryInfo();
			ecqi.setCreditCard(ecccs);
			ecqi.setIfs(ifs);
			return AuthUtil.filterECQI(ecqi);
		}
		return null;
	}

	@Override
	public ECQueryInfo searchCreditLoan(String userName, QueryOption qOpt) {
		List<IntfEntity> auths = getAllowIfsCreditLoan(userName);
		if (null != auths && !auths.isEmpty()){
			Mapper<IntfEntity, IF> mapper = new Mapper<IntfEntity, IF>(ifMapping);
			List<IF> ifs = mapper.forceMap(auths);
			List<ECCreditLoan> eccls = eCCreditLoanDao.search(qOpt);
			ECQueryInfo ecqi = new ECQueryInfo();
			ecqi.setCreditLoan(eccls);
			ecqi.setIfs(ifs);
			return AuthUtil.filterECQI(ecqi);
		}
		return null;
	}

	@Override
	public Result updateCreditLoan(String userName, JSONArray jdata) throws IOException {
		UserEntity usr = userDao.getUserByName(userName);
		if (null != usr){
			for (int i = 0; i < jdata.size(); ++i){
				JSONObject jec = jdata.getJSONObject(i);
				if (jec.containsKey("id")){
					EntrustedCaseManagerEntity ecme = entrustedCaseManagerDao.getByECId(EntrustedCaseType.CREDIT_LOAN, jec.getInt("id"));
					ECCarLoanEntity entity = eCCarLoanDao.getById(jec.getInt("id"));
					if (entity != null){
						JsonUtil.toObject(jec, entity);
						eCCarLoanDao.merge(entity);
					}
				}
			}
			return ErrorCode.OK;
		}
		return ErrorCode.EC_UPDATE_FAILED;
	}

	@Override
	public Result updateCreditCard(String userName, JSONArray jdata) throws IOException {
		UserEntity usr = userDao.getUserByName(userName);
		if (null != usr){
			for (int i = 0; i < jdata.size(); ++i){
				JSONObject jec = jdata.getJSONObject(i);
				if (jec.containsKey("id")){
					EntrustedCaseManagerEntity ecme = entrustedCaseManagerDao.getByECId(EntrustedCaseType.CREDIT_CARD, jec.getInt("id"));
					ECCreditCardEntity entity = eCCreditCardDao.getById(jec.getInt("id"));
					if (entity != null){
						JsonUtil.toObject(jec, entity);
						eCCreditCardDao.merge(entity);
						ecme.setLastModifiedTime(new Timestamp(Calendar.getInstance().getTimeInMillis()));
						ecme.setModifier(usr);
						entrustedCaseManagerDao.merge(ecme);
					}
				}
			}
			return ErrorCode.OK;
		}
		return ErrorCode.EC_UPDATE_FAILED;
	}

	@Override
	public Result updateCarLoan(String userName, JSONArray jdata) throws IOException {
		UserEntity usr = userDao.getUserByName(userName);
		if (null != usr){
			for (int i = 0; i < jdata.size(); ++i){
				JSONObject jec = jdata.getJSONObject(i);
				if (jec.containsKey("id")){
					EntrustedCaseManagerEntity ecme = entrustedCaseManagerDao.getByECId(EntrustedCaseType.CAR_LOAN, jec.getInt("id"));
					ECCreditLoanEntity entity = eCCreditLoanDao.getById(jec.getInt("id"));
					if (entity != null && ecme != null){
						JsonUtil.toObject(jec, entity);
						eCCreditLoanDao.merge(entity);
						ecme.setLastModifiedTime(new Timestamp(Calendar.getInstance().getTimeInMillis()));
						ecme.setModifier(usr);
						entrustedCaseManagerDao.merge(ecme);
					}
				}
			}
			return ErrorCode.OK;
		}
		return ErrorCode.EC_UPDATE_FAILED;
	}





}
