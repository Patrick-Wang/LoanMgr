package com.bank.debt.service.entrustedcase;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.lang.reflect.Field;
import java.sql.Timestamp;
import java.util.ArrayList;
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
import com.bank.debt.model.entity.AttachementEntity;
import com.bank.debt.model.entity.ECCarLoanEntity;
import com.bank.debt.model.entity.ECCreditCardEntity;
import com.bank.debt.model.entity.ECCreditLoanEntity;
import com.bank.debt.model.entity.EntrustedCaseManagerEntity;
import com.bank.debt.model.entity.IntfEntity;
import com.bank.debt.model.entity.UserEntity;
import com.bank.debt.protocol.entity.AcceptSummary;
import com.bank.debt.protocol.entity.AssignSummary;
import com.bank.debt.protocol.entity.EC;
import com.bank.debt.protocol.entity.EntrustedCaseReport;
import com.bank.debt.protocol.entity.IF;
import com.bank.debt.protocol.entity.ManagerSummary;
import com.bank.debt.protocol.entity.QueryOption;
import com.bank.debt.protocol.entity.Result;
import com.bank.debt.protocol.error.ErrorCode;
import com.bank.debt.protocol.tools.BeanUtil;
import com.bank.debt.protocol.tools.Checking;
import com.bank.debt.protocol.tools.JsonUtil;
import com.bank.debt.protocol.tools.MathUtil;
import com.bank.debt.protocol.tools.PathUtil;
import com.bank.debt.protocol.tools.map.EC2XlsMapping;
import com.bank.debt.protocol.tools.map.Mapper;
import com.bank.debt.protocol.tools.map.Mapping;
import com.bank.debt.protocol.tools.map.MappingFailedException;
import com.bank.debt.protocol.tools.map.MappingSkipException;
import com.bank.debt.protocol.tools.map.Xls2JsonMapping;
import com.bank.debt.protocol.tools.map.Xlsx2JsonMapping;
import com.bank.debt.protocol.type.EntrustedCaseType;
import com.bank.debt.service.attachement.AttachementService;
import com.bank.debt.service.ecreport.ECReportService;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

@Service(EntrustedCaseServiceImpl.NAME)
@Transactional("transaction")
public class EntrustedCaseServiceImpl implements EntrustedCaseService{
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
	
	@Autowired
	AttachementService attachementService;
	
	
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
				String fileName = Checking.getFileName(file);
				if (fileName.endsWith("xls")){
					Mapper<InputStream, JSONArray> mapper = new Mapper<InputStream, JSONArray>();
					mapper.setMapping(new Xls2JsonMapping(ECCarLoanEntity.class));
					data = mapper.map(file.getInputStream());
				}else if (fileName.endsWith("xlsx")){
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
				List<ECCarLoanEntity> eccls = JsonUtil.toObjects(data, ECCarLoanEntity.class, null);
				Integer batchNo = null;
				if (!eccls.isEmpty()){
					batchNo = eCBatchCreatorDao.createBatchNo(current);
				}
				for (ECCarLoanEntity entity : eccls){
					if (null == entity.getWwzt()){
						entity.setWwzt("未分配");
					}
					entity = eCCarLoanDao.merge(entity);
					entity.update();
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
				r = ErrorCode.OK.clone();
				r.setMsg(data.size() + "");
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
				String fName = Checking.getFileName(file);
				if (fName.endsWith("xls")){
					Mapper<InputStream, JSONArray> mapper = new Mapper<InputStream, JSONArray>();
					mapper.setMapping(new Xls2JsonMapping(ECCreditCardEntity.class));
					data = mapper.map(file.getInputStream());
				}else if (fName.endsWith("xlsx")){
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
				List<ECCreditCardEntity> eccls = JsonUtil.toObjects(data, ECCreditCardEntity.class, null);
				Integer batchNo = null;
				if (!eccls.isEmpty()){
					batchNo = eCBatchCreatorDao.createBatchNo(current);
				}
				for (ECCreditCardEntity entity : eccls){
					if (null == entity.getWwzt()){
						entity.setWwzt("未分配");
					}
					entity = eCCreditCardDao.merge(entity);
					entity.update();
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
				String fName = Checking.getFileName(file);
				if (fName.endsWith("xls")){
					Mapper<InputStream, JSONArray> mapper = new Mapper<InputStream, JSONArray>();
					mapper.setMapping(new Xls2JsonMapping(ECCreditLoanEntity.class));
					data = mapper.map(file.getInputStream());
				}else if (fName.endsWith("xlsx")){
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
				List<ECCreditLoanEntity> eccls = JsonUtil.toObjects(data, ECCreditLoanEntity.class, null);
				Integer batchNo = null;
				if (!eccls.isEmpty()){
					batchNo = eCBatchCreatorDao.createBatchNo(current);
				}
				for (ECCreditLoanEntity entity : eccls){
					if (null == entity.getWwzt()){
						entity.setWwzt("未分配");
					}
					entity = eCCreditLoanDao.merge(entity);
					entity.update();
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


	List<IntfEntity> getDataInfs(String user) {
		UserEntity usr = userDao.getUserByName(user);
		if (null != usr){
			List<IntfEntity> auths = authorityDao.getAuthAddrs(usr.getRoles(), 1000, 2000);
			return auths;
		}
		return null;
	}

	private void zipAttachement(ZipOutputStream zipOut, List<EntrustedCaseReport> reports) throws IOException{
		for (EntrustedCaseReport ecr : reports){
			if (Checking.isExist(ecr.getAttachements())){
				for (AttachementEntity attach : ecr.getAttachements()){
					ByteArrayOutputStream baos = new ByteArrayOutputStream();
					eCReportService.downloadAttachement(attach.getId(), baos);
					zipOut.putNextEntry(new ZipEntry(PathUtil.zipReportAttachementPath(
							ecr.getDate(), ecr.getId(), ecr.getTitle(), attach.getDisplay())));
					zipOut.write(baos.toByteArray());
					zipOut.closeEntry();
				}
			}
		}
	}
	
	@Override
	public void getDownloadCarLoan(String userName, QueryOption qOpt, OutputStream outputStream) throws MappingFailedException, IOException {
		ZipOutputStream zipOut = new ZipOutputStream(outputStream);
		List<EC> ecs = (List)searchCarLoan(null, qOpt);
		Mapper<List<EC>, OutputStream> mapper2 = new Mapper<List<EC>, OutputStream>(new EC2XlsMapping(EC2XlsMapping.carLoanTitle));
		ByteArrayOutputStream os = (ByteArrayOutputStream) mapper2.map(ecs);
		outputStream.write(os.toByteArray());
//		zipOut.putNextEntry(new ZipEntry("委案信息.xls"));
//		zipOut.write(os.toByteArray());
//		for (int i = 0; i < ecs.size(); ++i){
//			zipAttachement(zipOut, ecs.get(i).getReports());				
//		}
	}

	
	
	
	@Override
	public void getDownloadCreditCard(String userName, QueryOption qOpt, OutputStream outputStream) throws IOException, MappingFailedException {
		ZipOutputStream zipOut = new ZipOutputStream(outputStream);
		List<EC> ecs = (List)searchCreditCard(null, qOpt);
		Mapper<List<EC>, OutputStream> mapper2 = new Mapper<List<EC>, OutputStream>(new EC2XlsMapping(EC2XlsMapping.creditCardTitle));
		ByteArrayOutputStream os = (ByteArrayOutputStream) mapper2.map(ecs);
		outputStream.write(os.toByteArray());
//		zipOut.putNextEntry(new ZipEntry("委案信息.xls"));
//		zipOut.write(os.toByteArray());
//		for (int i = 0; i < ecs.size(); ++i){
//			zipAttachement(zipOut, ecs.get(i).getReports());				
//		}
	}

	@Override
	public void getDownloadCreditLoan(String userName, QueryOption qOpt, OutputStream outputStream) throws MappingFailedException, IOException {
		ZipOutputStream zipOut = new ZipOutputStream(outputStream);
		List<EC> ecs = (List)searchCreditLoan(null, qOpt);
		Mapper<List<EC>, OutputStream> mapper2 = new Mapper<List<EC>, OutputStream>(new EC2XlsMapping(EC2XlsMapping.creditLoanTitle));
		ByteArrayOutputStream os = (ByteArrayOutputStream) mapper2.map((List<EC>)ecs);
		outputStream.write(os.toByteArray());
//		zipOut.putNextEntry(new ZipEntry("委案信息.xls"));
//		zipOut.write(os.toByteArray());
//		for (int i = 0; i < ecs.size(); ++i){
//			zipAttachement(zipOut, ecs.get(i).getReports());				
//		}
	}
 
	@Override
	public void downloadAll(String usr, Integer batchNo, OutputStream outputStream) throws MappingFailedException, IOException {
		ZipOutputStream zipOut = new ZipOutputStream(outputStream);
		List<EC> ecs = (List)searchCreditLoan(null, new QueryOption(batchNo));
		Mapper<List<EC>, OutputStream> mapper = new Mapper<List<EC>, OutputStream>(new EC2XlsMapping(EC2XlsMapping.creditLoanTitle));
		ByteArrayOutputStream os = (ByteArrayOutputStream) mapper.map((List<EC>)ecs);
		zipOut.putNextEntry(new ZipEntry("信贷.xls"));
		zipOut.write(os.toByteArray());
		zipOut.closeEntry();
		for (int i = 0; i < ecs.size(); ++i){
			zipAttachement(zipOut, ecs.get(i).getReports());				
		}
		
		ecs = (List)searchCreditCard(null, new QueryOption(batchNo));
		mapper.setMapping(new EC2XlsMapping(EC2XlsMapping.creditCardTitle));
		os = (ByteArrayOutputStream) mapper.map(ecs);
		zipOut.putNextEntry(new ZipEntry("信用卡.xls"));
		zipOut.write(os.toByteArray());
		zipOut.closeEntry();
		for (int i = 0; i < ecs.size(); ++i){
			zipAttachement(zipOut, ecs.get(i).getReports());				
		}

		
		ecs = (List)searchCarLoan(null, new QueryOption(batchNo));
		mapper.setMapping(new EC2XlsMapping(EC2XlsMapping.carLoanTitle));
		os = (ByteArrayOutputStream) mapper.map(ecs);
		zipOut.putNextEntry(new ZipEntry("车贷.xls"));
		zipOut.write(os.toByteArray());
		zipOut.closeEntry();
		for (int i = 0; i < ecs.size(); ++i){
			zipAttachement(zipOut, ecs.get(i).getReports());				
		}
		zipOut.close();		
	}
	
	@Override
	public List<EC> searchCarLoan(String userName, QueryOption qOpt) {
		UserEntity ue = null;
		if (qOpt.getAssignToMe() || qOpt.getMyOwn()){
			ue = userDao.getUserByName(userName);
		}
	
		List<Object[]> objs = eCCarLoanDao.search(ue, qOpt);
		List<EC> eccls = new ArrayList<EC>();
		for (Object[] row : objs){
			EC eccl = new EC();
			EntrustedCaseManagerEntity ecme = (EntrustedCaseManagerEntity) row[0];
			ECCarLoanEntity eccle = (ECCarLoanEntity) row[1];
			eccl.setManagerId(ecme.getId());
			eccl.setLoan(new Mapper<ECCarLoanEntity, List<Object>>(new Mapping<ECCarLoanEntity, List<Object>>(){
				@Override
				public List<Object> onMap(ECCarLoanEntity from) throws MappingSkipException, MappingFailedException {
					List<Field> fds = BeanUtil.getFields(from.getClass());
					List<Object> rets = new ArrayList<Object>();
					for (Field fd : fds){
						if (!fd.getName().equals("entityVersion")){
							rets.add(BeanUtil.doGet(from, fd.getName()));
						};
					}
					return rets;
				}
			}).forceMap(eccle));
			eccl.setOwner(ecme.getOwner().getUsername());
			eccl.setAssignee(ecme.getAssignee() != null ? ecme.getAssignee().getUsername() : null);
			eccl.setOwnerId(ecme.getOwner().getId());
			eccl.setAssigneeId(ecme.getAssignee() != null ? ecme.getAssignee().getId() : null);
			eccl.setReports(eCReportService.getECReports(ecme.getId()));
			eccls.add(eccl);
		}
		return eccls;
	}

	@Override
	public List<EC> searchCreditCard(String userName, QueryOption qOpt) {
		UserEntity ue = null;
		if (qOpt.getAssignToMe() || qOpt.getMyOwn()){
			ue = userDao.getUserByName(userName);
		}
		List<Object[]> objs = eCCreditCardDao.search(ue, qOpt);			
		List<EC> eccls = new ArrayList<EC>();
		for (Object[] row : objs){
			EC eccl = new EC();
			EntrustedCaseManagerEntity ecme = (EntrustedCaseManagerEntity) row[0];
			ECCreditCardEntity eccle = (ECCreditCardEntity) row[1];
			eccl.setManagerId(ecme.getId());
			eccl.setLoan(new Mapper<ECCreditCardEntity, List<Object>>(new Mapping<ECCreditCardEntity, List<Object>>(){
				@Override
				public List<Object> onMap(ECCreditCardEntity from) throws MappingSkipException, MappingFailedException {
					List<Field> fds = BeanUtil.getFields(from.getClass());
					List<Object> rets = new ArrayList<Object>();
					for (Field fd : fds){
						if (!fd.getName().equals("entityVersion")){
							rets.add(BeanUtil.doGet(from, fd.getName()));
						};
					}
					return rets;
				}
			}).forceMap(eccle));
			eccl.setOwner(ecme.getOwner().getUsername());
			eccl.setAssignee(ecme.getAssignee() != null ? ecme.getAssignee().getUsername() : null);
			eccl.setOwnerId(ecme.getOwner().getId());
			eccl.setAssigneeId(ecme.getAssignee() != null ? ecme.getAssignee().getId() : null);
			eccl.setReports(eCReportService.getECReports(ecme.getId()));
			eccls.add(eccl);
		}
		return eccls;

	}

	@Override
	public List<EC> searchCreditLoan(String userName, QueryOption qOpt) {
		UserEntity ue = null;
		if (qOpt.getAssignToMe() || qOpt.getMyOwn()){
			ue = userDao.getUserByName(userName);
		}
		List<Object[]> objs = eCCreditLoanDao.search(ue, qOpt);		
		List<EC> eccls = new ArrayList<EC>();
		for (Object[] row : objs){
			EC eccl = new EC();
			EntrustedCaseManagerEntity ecme = (EntrustedCaseManagerEntity) row[0];
			ECCreditLoanEntity eccle = (ECCreditLoanEntity) row[1];
			eccl.setManagerId(ecme.getId());
			eccl.setLoan(new Mapper<ECCreditLoanEntity, List<Object>>(new Mapping<ECCreditLoanEntity, List<Object>>(){
				@Override
				public List<Object> onMap(ECCreditLoanEntity from) throws MappingSkipException, MappingFailedException {
					List<Field> fds = BeanUtil.getFields(from.getClass());
					List<Object> rets = new ArrayList<Object>();
					for (Field fd : fds){
						if (!fd.getName().equals("entityVersion")){
							rets.add(BeanUtil.doGet(from, fd.getName()));
						};
					}
					return rets;
				}
			}).forceMap(eccle));
			eccl.setOwner(ecme.getOwner().getUsername());
			eccl.setAssignee(ecme.getAssignee() != null ? ecme.getAssignee().getUsername() : null);
			eccl.setOwnerId(ecme.getOwner().getId());
			eccl.setAssigneeId(ecme.getAssignee() != null ? ecme.getAssignee().getId() : null);
			eccl.setReports(eCReportService.getECReports(ecme.getId()));
			eccls.add(eccl);
		}
		return eccls;
	}

	@Override
	public Result updateCreditLoan(String userName, JSONArray jdata) throws IOException {
		UserEntity usr = userDao.getUserByName(userName);
		if (null != usr){
			for (int i = 0; i < jdata.size(); ++i){
				JSONObject jec = jdata.getJSONObject(i);
				if (jec.containsKey("id")){
					EntrustedCaseManagerEntity ecme = entrustedCaseManagerDao.getByECId(EntrustedCaseType.CREDIT_LOAN, jec.getInt("id"));
					ECCreditLoanEntity entity = eCCreditLoanDao.getById(ecme.getEntrustedCase());
					if (entity != null){
						JsonUtil.toObject(jec, entity, null);
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

	@Override
	public Result updateCreditCard(String userName, JSONArray jdata) throws IOException {
		UserEntity usr = userDao.getUserByName(userName);
		if (null != usr){
			for (int i = 0; i < jdata.size(); ++i){
				JSONObject jec = jdata.getJSONObject(i);
				if (jec.containsKey("id")){
					EntrustedCaseManagerEntity ecme = entrustedCaseManagerDao.getByECId(EntrustedCaseType.CREDIT_CARD, jec.getInt("id"));
					ECCreditCardEntity entity = eCCreditCardDao.getById(ecme.getEntrustedCase());
					if (entity != null){
						JsonUtil.toObject(jec, entity, null);
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
					ECCarLoanEntity entity = eCCarLoanDao.getById(ecme.getEntrustedCase());
					if (entity != null && ecme != null){
						JsonUtil.toObject(jec, entity, null);
						eCCarLoanDao.merge(entity);
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
	public AssignSummary getAssignSummary(String userName) {
		UserEntity ue = userDao.getUserByName(userName);
		AssignSummary as = new AssignSummary();
		as.setTotal(entrustedCaseManagerDao.getTotalForOwner(ue));
		as.setAssign(entrustedCaseManagerDao.getAssignedCount(ue));
		as.setUnassign(as.getTotal() - as.getAssign());
		as.setComplete(eCCreditLoanDao.getCompleteForOwner(ue)
				+ eCCarLoanDao.getCompleteForOwner(ue)
				+ eCCreditCardDao.getCompleteForOwner(ue));
		return as;
	}

	@Override
	public AcceptSummary getAcceptSummary(String userName) {
		UserEntity ue = userDao.getUserByName(userName);
		AcceptSummary as = new AcceptSummary();
		as.setComplete(eCCreditLoanDao.getCompleteForAssignee(ue)
				+ eCCarLoanDao.getCompleteForAssignee(ue)
				+ eCCreditCardDao.getCompleteForAssignee(ue));
		as.setTotal(entrustedCaseManagerDao.getTotalForAssignee(ue));
		return as;
	}

	@Override
	public List<Integer> getBatchs() {
		return entrustedCaseManagerDao.getBatchNOs();
	}

	@Override
	public ManagerSummary getManagerSummary(String userName) {
		ManagerSummary ms = new ManagerSummary();
		ms.setYgs(userDao.getCount());
		ms.setLjje(MathUtil.sum(new Double[]{eCCreditLoanDao.getLjje(), 
				eCCarLoanDao.getLjje(), 
				eCCreditCardDao.getLjje()}));
		ms.setYhje(MathUtil.sum(new Double[]{eCCreditLoanDao.getYhje(), 
				eCCarLoanDao.getYhje(),
				eCCreditCardDao.getYhje()}));
		return ms;
	}

	@Override
	public Result getDeleteECs(Integer type, List<Integer> mgrIds) {
		for (int i = 0; i < mgrIds.size(); ++i){
			EntrustedCaseManagerEntity ecme = this.entrustedCaseManagerDao.getByECId(type, mgrIds.get(i));
			if (null != ecme){
				entrustedCaseManagerDao.delete(ecme);
			}
			
			switch(type){
			case EntrustedCaseType.CAR_LOAN:
				eCCarLoanDao.deleteById(mgrIds.get(i));
				break;
			case EntrustedCaseType.CREDIT_CARD:
				eCCreditCardDao.deleteById(mgrIds.get(i));
				break;
			case EntrustedCaseType.CREDIT_LOAN:
				eCCreditLoanDao.deleteById(mgrIds.get(i));
				break;
			}
		}
		return ErrorCode.OK;
	}







}
