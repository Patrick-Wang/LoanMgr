package com.bank.debt.model.dao.eccreditcard;
import java.util.List;

import com.bank.debt.model.entity.ECCreditCardEntity;
import com.bank.debt.model.entity.UserEntity;
import com.bank.debt.protocol.entity.QueryOption;
import com.speed.frame.model.dao.AbstractReadWriteDao;



public interface ECCreditCardDao extends AbstractReadWriteDao<ECCreditCardEntity> {

	List<Object[]> search(UserEntity ue, QueryOption qOpt);

	int getCompleteForOwner(UserEntity ue);

	int getCompleteForAssignee(UserEntity ue);

	Double getLjje();

	Double getYhje();

	List<String> getWwjgs();

	Integer count(UserEntity ue, QueryOption qOpt);

}
