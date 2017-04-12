package com.bank.debt.service.authority;

import java.util.List;

import com.bank.debt.protocol.entity.IF;
import com.bank.debt.protocol.entity.Role;

public interface AuthorityService {

	List<Role> getAllRols();

	List<IF> getUIIfs();

	List<Integer> getRoleIfs(Integer roleId);

	void deleteRoleIfs(Integer roleId, List<Integer> ifs);

	void addRoleIfs(Integer roleId, List<Integer> ifs);

	List<IF> getDataIfs();


}
