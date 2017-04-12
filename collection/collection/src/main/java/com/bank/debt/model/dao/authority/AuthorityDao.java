package com.bank.debt.model.dao.authority;
import java.util.List;

import com.bank.debt.model.entity.AuthorityEntity;
import com.bank.debt.model.entity.RoleEntity;
import com.speed.frame.model.dao.AbstractReadWriteDao;



public interface AuthorityDao extends AbstractReadWriteDao<AuthorityEntity> {

	List<String> getRoleByUrl(String url);

	List<Integer> getIfsByRoleId(Integer roleId);

	void deleteAuthority(Integer roleId, List<Integer> ifs);

	AuthorityEntity getAuthority(Integer roleId, Integer ifid);

	List<String> getAuthAddrs(List<RoleEntity> roles, Integer idFrom, Integer idTo);

}