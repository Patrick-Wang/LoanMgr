package com.bank.debt.model.dao.ecbatchcreator;
import java.sql.Timestamp;

import com.bank.debt.model.entity.ECBatchCreatorEntity;
import com.speed.frame.model.dao.AbstractReadWriteDao;



public interface ECBatchCreatorDao extends AbstractReadWriteDao<ECBatchCreatorEntity> {

	Integer createBatchNo(Timestamp current);

}
