package com.bank.debt.service.ecmanager;

import java.util.ArrayList;
import java.util.List;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.bank.debt.model.dao.authority.AuthorityDao;
import com.bank.debt.model.dao.authority.AuthorityDaoImpl;
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
import com.bank.debt.model.entity.UserEntity;
import com.bank.debt.protocol.entity.EntrustedCaseManageInfo;
import com.bank.debt.protocol.entity.Result;
import com.bank.debt.protocol.error.ErrorCode;
import com.bank.debt.protocol.famous.AuthAddress;
import com.bank.debt.protocol.type.EntrustedCaseType;

@Service(ECManagerServiceImpl.NAME)
@Transactional("transaction")
public class ECManagerServiceImpl implements ECManagerService {
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
	
	public final static String NAME = "ECManagerServiceImpl";

	@Override
	public List<EntrustedCaseManageInfo> getManageInfos(String userName) {
		UserEntity usr = userDao.getUserByName(userName);
		List<EntrustedCaseManagerEntity> ecmes = null;
		if (authorityDao.existAuthAddr(usr.getRoles(), 1000, 2000, AuthAddress.ECM_ALL)){
			ecmes = entrustedCaseManagerDao.getAll();
		} else if (authorityDao.existAuthAddr(usr.getRoles(), 1000, 2000, AuthAddress.ECM_OWNER)){
			ecmes = entrustedCaseManagerDao.getByOwner(usr.getId());
		}
		return ecme2ecmi(ecmes);
	}

	private List<EntrustedCaseManageInfo> ecme2ecmi(List<EntrustedCaseManagerEntity> ecmes) {
		List<EntrustedCaseManageInfo> ecmis = new ArrayList<EntrustedCaseManageInfo>();
		for (EntrustedCaseManagerEntity entity : ecmes){
			ecmis.add(ecme2ecmi(entity));
		}
		return ecmis;
	}
	
	private EntrustedCaseManageInfo ecme2ecmi(EntrustedCaseManagerEntity ecme) {
		EntrustedCaseManageInfo ecmi = new EntrustedCaseManageInfo();
		ecmi.setAssigneeId(ecme.getAssignee().getId());
		ecmi.setAssigneeName(ecme.getAssignee().getUsername());
		ecmi.setId(ecme.getId());
		ecmi.setOwnerId(ecme.getOwner().getId());
		ecmi.setOwnerName(ecme.getOwner().getUsername());
		return ecmi;
	}

	@Override
	public Result updateManageInfo(String userName, List<EntrustedCaseManageInfo> ecmis) {
		UserEntity usr = userDao.getUserByName(userName);
		Result r = ErrorCode.ECM_UPDATE_FAILED;
		if (usr != null){
			r = ErrorCode.OK.clone();
			boolean changed = false;
			List<EntrustedCaseManagerEntity> ecmes = new ArrayList<EntrustedCaseManagerEntity>();
			for (EntrustedCaseManageInfo ecmi : ecmis){
				EntrustedCaseManagerEntity ecme = entrustedCaseManagerDao.getById(ecmi.getId());
				
				if (null == ecme){
					r = ErrorCode.ECM_UPDATE_FAILED;
					break;
				}
				
				changed = false;
				
				if (null != ecmi.getAssigneeId() && 
						(ecme.getAssignee() == null ||
						ecme.getAssignee().getId() != ecmi.getAssigneeId())){
					UserEntity assignee = userDao.getById(ecmi.getAssigneeId());
					if (null != assignee){
						ecme.setAssignee(assignee);
						switch(ecme.getType()){
						case EntrustedCaseType.CAR_LOAN:
							ECCarLoanEntity entity = eCCarLoanDao.getById(ecme.getEntrustedCase());
							if (entity.getWwzt() == null || "未分配".equals(entity.getWwzt())){
								entity.setWwzt("工作中");
								eCCarLoanDao.merge(entity);
							}
							break;
						case EntrustedCaseType.CREDIT_CARD:
							ECCreditCardEntity entity2 = eCCreditCardDao.getById(ecme.getEntrustedCase());
							if (entity2.getWwzt() == null ||  "未分配".equals(entity2.getWwzt())){
								entity2.setWwzt("工作中");
								eCCreditCardDao.merge(entity2);
							}
							break;
						case EntrustedCaseType.CREDIT_LOAN:
							ECCreditLoanEntity entity3 = eCCreditLoanDao.getById(ecme.getEntrustedCase());
							if (entity3.getWwzt() == null ||  "未分配".equals(entity3.getWwzt())){
								entity3.setWwzt("工作中");
								eCCreditLoanDao.merge(entity3);
							}
							break;
						}
						changed = true;
					}else{
						r = ErrorCode.ECM_UPDATE_FAILED;
						r.setMsg(ecmi.getAssigneeId() + " 不存在");
						break;
					}
				}
				
				if (ecmi.getOwnerId() != null && 
						(ecme.getOwner() == null ||
						ecme.getOwner().getId() != ecmi.getOwnerId())){
					UserEntity owner = userDao.getById(ecmi.getOwnerId());
					if (null != owner){
						ecme.setOwner(owner);
						changed = true;
					}else{
						r = ErrorCode.ECM_UPDATE_FAILED.clone();
						r.setMsg(ecmi.getOwnerName() + " 不存在");
						break;
					}
				}
				
				if (changed){
					ecmes.add(ecme);
				}
			}
			if (r.getCode() == ErrorCode.OK.getCode()){
				if (ecmes.isEmpty()){
					r.setMsg("沒有任何更新");
				}else{
					entrustedCaseManagerDao.merge(ecmes);
				}
			}
		}
		
		return r;
	}

}
