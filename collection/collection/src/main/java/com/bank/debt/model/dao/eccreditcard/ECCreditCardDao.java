package com.bank.debt.model.dao.eccreditcard;
import java.util.List;

import com.bank.debt.model.entity.ECCreditCardEntity;
import com.bank.debt.protocol.entity.ECCreditCard;
import com.bank.debt.protocol.entity.QueryOption;
import com.speed.frame.model.dao.AbstractReadWriteDao;



public interface ECCreditCardDao extends AbstractReadWriteDao<ECCreditCardEntity> {

	List<ECCreditCard> search(QueryOption qOpt);

}
