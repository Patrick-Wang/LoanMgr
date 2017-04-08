package com.bank.debt.model.dao.authority;
import java.util.List;

import com.bank.debt.model.entity.AuthorityEntity;
import com.speed.frame.model.dao.AbstractReadWriteDao;



public interface AuthorityDao extends AbstractReadWriteDao<AuthorityEntity> {

	List<String> getRoleByUrl(String url);

}
