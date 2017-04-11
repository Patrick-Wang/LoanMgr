package com.bank.debt.service.ecmanager;

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
		// TODO Auto-generated method stub
		return null;
	}

}
