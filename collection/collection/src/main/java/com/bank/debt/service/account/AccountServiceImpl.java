package com.bank.debt.service.account;

import java.util.ArrayList;
import java.util.List;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.bank.debt.model.dao.organization.OrganizationDao;
import com.bank.debt.model.dao.organization.OrganizationDaoImpl;
import com.bank.debt.model.dao.role.RoleDao;
import com.bank.debt.model.dao.role.RoleDaoImpl;
import com.bank.debt.model.dao.user.UserDao;
import com.bank.debt.model.dao.user.UserDaoImpl;
import com.bank.debt.model.entity.OrganizationEntity;
import com.bank.debt.model.entity.RoleEntity;
import com.bank.debt.model.entity.UserEntity;
import com.bank.debt.protocol.entity.CreateUser;
import com.bank.debt.protocol.entity.Organization;
import com.bank.debt.protocol.entity.Result;
import com.bank.debt.protocol.entity.User;
import com.bank.debt.protocol.error.ErrorCode;
import com.bank.debt.protocol.tools.Checking;

@Service(AccountServiceImpl.NAME)
@Transactional("transaction")
public class AccountServiceImpl implements AccountService {
	@Resource(name=RoleDaoImpl.NAME)
	RoleDao roleDao;

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

	private UserEntity updateUser(User usr){
		if (!Checking.isExist(usr.getId())){
			return null;
		}
		UserEntity ue = userDao.getById(usr.getId());
		if (null == ue){
			return null;
		}
		
		if (Checking.isExist(usr.getId())){
			OrganizationEntity org = organizationDao.getById(usr.getOrgId());
			if (null == org){
				return null;
			}else{
				ue.setOrg(org);
			}
		}
		
		if (Checking.isExist(usr.getPassword())){
			ue.setPassword(usr.getPassword());
		}
		
		if (Checking.isExist(usr.getStatus())){
			ue.setStatus(usr.getStatus());
		}
		
		if (Checking.isExist(usr.getRoles())){
			List<RoleEntity> roles = new ArrayList<RoleEntity>();
			ue.setRoles(roles);
			for (Integer role : usr.getRoles()){
				RoleEntity r = roleDao.getById(role);
				if (r != null){
					roles.add(r);
				}else{
					return null;
				}
			}

		}
		
		return ue;

	}
	
	@Override
	public Result updateUsers(List<User> usrs) {
		List<UserEntity> updateUsers = new ArrayList<UserEntity>();
		for (User usr : usrs){
			UserEntity ue = this.updateUser(usr);
			if (ue != null){
				updateUsers.add(ue);
			}else{
				return ErrorCode.ACCOUNT_UPDATE_FALIED;
			}
		}
		
		for (UserEntity usr : updateUsers){
			this.userDao.merge(usr);
		}
		
		return ErrorCode.OK;
		
	}

	@Override
	public Result createUser(CreateUser usr) {
		UserEntity ue = userDao.getUserByName(usr.getName());
		if (null == ue){
			return ErrorCode.ACCOUNT_USER_EXIST;
		}
		OrganizationEntity org = organizationDao.getById(usr.getOrgId());
		if (null == org){
			return ErrorCode.ACCOUNT_ORG_NOT_EXIST;
		}
		
		Result result = ErrorCode.OK;
		ue = new UserEntity();
		ue.setPassword(usr.getPassword());
		ue.setUsername(usr.getName());
		ue.setOrg(org);
		List<RoleEntity> roles = new ArrayList<RoleEntity>();
		ue.setRoles(roles);
		for (Integer role : usr.getRoles()){
			RoleEntity r = roleDao.getById(role);
			if (r != null){
				roles.add(r);
			}else{
				result = ErrorCode.ACCOUNT_ROLE_NOT_EXIST;
				break;
			}
		}

		if (result == ErrorCode.OK){
			userDao.merge(ue);
		}

		return result;
		
	}

	
	
	@Override
	public List<User> getAllUsers() {
		List<UserEntity> usrs = userDao.getAll();
		List<User> ret = new ArrayList<User>();
		for (UserEntity ue : usrs){
			ret.add(ue2user(ue));
		}
		return ret;
	}

	private User ue2user(UserEntity ue) {
		User usr = new User();
		usr.setId(ue.getId());
		usr.setName(ue.getUsername());
		usr.setOrgId(ue.getOrg().getId());
		usr.setOrgName(ue.getOrg().getName());
		usr.setStatus(ue.getStatus());		
		return usr;
	}
 
}
