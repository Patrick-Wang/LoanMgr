package com.bank.debt.model.dao.attachement;
import com.bank.debt.model.entity.AttachementEntity;
import com.speed.frame.model.dao.AbstractReadWriteDao;



public interface AttachementDao extends AbstractReadWriteDao<AttachementEntity> {

	AttachementEntity getByDisplayName(String displayName);

}
