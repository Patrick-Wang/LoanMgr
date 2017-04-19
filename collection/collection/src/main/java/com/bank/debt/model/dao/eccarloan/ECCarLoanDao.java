package com.bank.debt.model.dao.eccarloan;
import java.util.List;

import com.bank.debt.model.entity.ECCarLoanEntity;
import com.bank.debt.model.entity.UserEntity;
import com.bank.debt.protocol.entity.ECCarLoan;
import com.bank.debt.protocol.entity.QueryOption;
import com.speed.frame.model.dao.AbstractReadWriteDao;



public interface ECCarLoanDao extends AbstractReadWriteDao<ECCarLoanEntity> {

	List<ECCarLoan> search(QueryOption qOpt);

	int getCompleteForOwner(UserEntity ue);

	int getCompleteForAssignee(UserEntity ue);

}
