package com.bank.debt.model.dao.eccreditloan;
import java.util.List;

import com.bank.debt.model.entity.ECCreditLoanEntity;
import com.bank.debt.model.entity.UserEntity;
import com.bank.debt.protocol.entity.ECCreditLoan;
import com.bank.debt.protocol.entity.QueryOption;
import com.speed.frame.model.dao.AbstractReadWriteDao;



public interface ECCreditLoanDao extends AbstractReadWriteDao<ECCreditLoanEntity> {

	List<ECCreditLoan> search(QueryOption qOpt);

	int getCompleteForOwner(UserEntity ue);

	int getCompleteForAssignee(UserEntity ue);

}
