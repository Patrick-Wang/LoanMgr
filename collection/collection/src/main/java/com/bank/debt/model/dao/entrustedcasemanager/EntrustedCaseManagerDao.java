package com.bank.debt.model.dao.entrustedcasemanager;
import java.util.List;

import com.bank.debt.model.entity.EntrustedCaseManagerEntity;
import com.bank.debt.model.entity.UserEntity;
import com.speed.frame.model.dao.AbstractReadWriteDao;



public interface EntrustedCaseManagerDao extends AbstractReadWriteDao<EntrustedCaseManagerEntity> {

	EntrustedCaseManagerEntity getByECId(Integer ecType, Integer ecId);

	List<EntrustedCaseManagerEntity> getByOwner(Integer id);

	Integer getAssignedCount(UserEntity ue);

	Integer getTotalForOwner(UserEntity ue);

	List<Integer> getBatchNOs();

}
