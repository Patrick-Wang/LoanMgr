package com.bank.debt.model.dao.eccreditloan;
import java.util.List;

import com.bank.debt.model.entity.ECCreditLoanEntity;
import com.bank.debt.model.entity.UserEntity;
import com.bank.debt.protocol.entity.QueryOption;
import com.speed.frame.model.dao.AbstractReadWriteDao;



public interface ECCreditLoanDao extends AbstractReadWriteDao<ECCreditLoanEntity> {

	List<Object[]> search(UserEntity ue, QueryOption qOpt);

	int getCompleteForOwner(UserEntity ue);

	int getCompleteForAssignee(UserEntity ue);

	Double getLjje();

	Double getYhje();

	List<String> getWwjgs();

	Integer count(UserEntity ue, QueryOption qOpt);

	List<String> getPch();
}
