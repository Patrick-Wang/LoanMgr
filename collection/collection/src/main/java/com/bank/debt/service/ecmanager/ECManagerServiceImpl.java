package com.bank.debt.service.ecmanager;

import java.util.ArrayList;
import java.util.List;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.bank.debt.model.dao.authority.AuthorityDao;
import com.bank.debt.model.dao.authority.AuthorityDaoImpl;
import com.bank.debt.model.dao.entrustedcasemanager.EntrustedCaseManagerDao;
import com.bank.debt.model.dao.entrustedcasemanager.EntrustedCaseManagerDaoImpl;
import com.bank.debt.model.dao.user.UserDao;
import com.bank.debt.model.dao.user.UserDaoImpl;
import com.bank.debt.model.entity.EntrustedCaseManagerEntity;
import com.bank.debt.model.entity.UserEntity;
import com.bank.debt.protocol.entity.EntrustedCaseManageInfo;
import com.bank.debt.protocol.entity.Result;
import com.bank.debt.protocol.error.ErrorCode;
import com.bank.debt.protocol.famous.AuthAddress;

@Service(ECManagerServiceImpl.NAME)
@Transactional("transaction")
public class ECManagerServiceImpl implements ECManagerService {
	@Resource(name=AuthorityDaoImpl.NAME)
	AuthorityDao authorityDao;

	@Resource(name=UserDaoImpl.NAME)
	UserDao userDao;

	@Resource(name=EntrustedCaseManagerDaoImpl.NAME)
	EntrustedCaseManagerDao entrustedCaseManagerDao;

	public final static String NAME = "ECManagerServiceImpl";

	@Override
	public List<EntrustedCaseManageInfo> getManageInfos(String userName) {
		UserEntity usr = userDao.getUserByName(userName);
		List<String> addrs = authorityDao.getAuthAddrs(usr.getRoles(), 1600, 1800);
		List<EntrustedCaseManagerEntity> ecmes = null;
		if (addrs.contains(AuthAddress.ECM_ALL)){
			ecmes = entrustedCaseManagerDao.getAll();
		} else if (addrs.contains(AuthAddress.ECM_OWNER)){
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
			r = ErrorCode.OK;
			boolean changed = false;
			List<EntrustedCaseManagerEntity> ecmes = new ArrayList<EntrustedCaseManagerEntity>();
			for (EntrustedCaseManageInfo ecmi : ecmis){
				EntrustedCaseManagerEntity ecme = entrustedCaseManagerDao.getById(ecmi.getId());
				
				if (null != ecme){
					r = ErrorCode.ECM_UPDATE_FAILED;
					break;
				}
				
				changed = false;
				
				if (ecme.getAssignee().getId() != ecmi.getAssigneeId()){
					UserEntity assignee = userDao.getById(ecmi.getAssigneeId());
					if (null != assignee){
						ecme.setAssignee(assignee);
						changed = true;
					}else{
						r = ErrorCode.ECM_UPDATE_FAILED;
						r.setMsg(ecmi.getAssigneeId() + " 不存在");
						break;
					}
				}
				
				if (ecme.getOwner().getId() != ecmi.getOwnerId()){
					UserEntity owner = userDao.getById(ecmi.getOwnerId());
					if (null != owner){
						ecme.setAssignee(owner);
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
				entrustedCaseManagerDao.merge(ecmes);
			}
		}
		
		return r;
	}

}
