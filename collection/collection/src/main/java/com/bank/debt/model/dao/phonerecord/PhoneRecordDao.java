package com.bank.debt.model.dao.phonerecord;
import com.bank.debt.model.entity.PhoneRecordEntity;
import com.speed.frame.model.dao.AbstractReadWriteDao;



public interface PhoneRecordDao extends AbstractReadWriteDao<PhoneRecordEntity> {

	PhoneRecordEntity getByAttachement(int id);

	void deleteByECM(int id);

}
