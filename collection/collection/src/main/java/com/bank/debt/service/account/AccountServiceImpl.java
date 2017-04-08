package com.bank.debt.service.account;

import java.util.ArrayList;
import java.util.List;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.bank.debt.model.dao.organization.OrganizationDao;
import com.bank.debt.model.dao.organization.OrganizationDaoImpl;
import com.bank.debt.model.dao.user.UserDao;
import com.bank.debt.model.dao.user.UserDaoImpl;
import com.bank.debt.model.entity.OrganizationEntity;
import com.bank.debt.protocol.entity.Organization;

@Service(AccountServiceImpl.NAME)
@Transactional("transaction")
public class AccountServiceImpl implements AccountService {
	@Resource(name=UserDaoImpl.NAME)
	UserDao userDao;

	@Resource(name=OrganizationDaoImpl.NAME)
	OrganizationDao organizationDao;

	public final static String NAME = "AccountServiceImpl";

	
	Organization orgE2Org(OrganizationEntity entity){
		Organization org = new Organization();
		org.setId(entity.getId());
		org.setName(entity.getName());
		org.setStatus(entity.getStatus());
		List<Organization> subs = new ArrayList<Organization>();
		org.setSubOrgs(subs);
		for (OrganizationEntity child : entity.getChildren()){
			subs.add(orgE2Org(child));
		}
		return org;
	}
	
	@Override
	public List<Organization> getOrgs() {
		List<OrganizationEntity> orgEntities = organizationDao.getOrgs();
		List<Organization> subs = new ArrayList<Organization>();

		for (OrganizationEntity child : orgEntities){
			subs.add(orgE2Org(child));
		}
		return subs;
	}
 
}
