package com.bank.debt.service.authority;

import java.util.ArrayList;
import java.util.List;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.bank.debt.model.dao.authority.AuthorityDao;
import com.bank.debt.model.dao.authority.AuthorityDaoImpl;
import com.bank.debt.model.dao.intf.IntfDao;
import com.bank.debt.model.dao.intf.IntfDaoImpl;
import com.bank.debt.model.dao.role.RoleDao;
import com.bank.debt.model.dao.role.RoleDaoImpl;
import com.bank.debt.model.entity.AuthorityEntity;
import com.bank.debt.model.entity.IntfEntity;
import com.bank.debt.model.entity.RoleEntity;
import com.bank.debt.protocol.entity.IF;
import com.bank.debt.protocol.entity.Role;

@Service(AuthorityServiceImpl.NAME)
@Transactional("transaction")
public class AuthorityServiceImpl implements AuthorityService {
	@Resource(name=AuthorityDaoImpl.NAME)
	AuthorityDao authorityDao;

	@Resource(name=IntfDaoImpl.NAME)
	IntfDao intfDao;

	@Resource(name=RoleDaoImpl.NAME)
	RoleDao roleDao;

	public final static String NAME = "AuthorityServiceImpl";

	@Override
	public List<Role> getAllRols() {
		List<RoleEntity> allRole = roleDao.getAll();
		List<Role> ret = new ArrayList<Role>();
		for (RoleEntity entity : allRole){
			ret.add(re2role(entity));
		}
		return ret;
	}

	private Role re2role(RoleEntity entity) {
		Role role = new Role();
		role.setId(entity.getId());
		role.setName(entity.getName());
		return role;
	}

	@Override
	public List<IF> getUIIfs() {
		List<IntfEntity> allifs = intfDao.getUIIfs();
		List<IF> ret = new ArrayList<IF>();
		for (IntfEntity entity : allifs){
			ret.add(ife2if(entity));
		}
		return ret;
	}

	private IF ife2if(IntfEntity entity) {
		IF inif = new IF();
		inif.setAddress(entity.getAddress());
		inif.setDescription(entity.getDescription());
		inif.setId(entity.getId());
		return inif;
	}

	@Override
	public List<Integer> getRoleIfs(Integer roleId) {
		return authorityDao.getIfsByRoleId(roleId);
	}

	@Override
	public void deleteRoleIfs(Integer roleId, List<Integer> ifs) {
		authorityDao.deleteAuthority(roleId, ifs);
	}

	@Override
	public void addRoleIfs(Integer roleId, List<Integer> ifs) {
		for (Integer id : ifs){
			AuthorityEntity auth = authorityDao.getAuthority(roleId, id);;
			if (null == auth){
				auth = new AuthorityEntity();
			}
			
			IntfEntity intf = intfDao.getById(id);
			RoleEntity re = roleDao.getById(roleId);
			if (intf != null && re != null){
				auth.setIntf(intf);
				auth.setRole(re);
				authorityDao.merge(auth);
			}
		}
	}

}
