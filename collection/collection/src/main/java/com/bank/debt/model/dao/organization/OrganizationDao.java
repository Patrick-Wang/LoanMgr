package com.bank.debt.model.dao.organization;
import java.util.List;

import com.bank.debt.model.entity.OrganizationEntity;
import com.speed.frame.model.dao.AbstractReadWriteDao;



public interface OrganizationDao extends AbstractReadWriteDao<OrganizationEntity> {

	List<OrganizationEntity> getOrgs();

}
