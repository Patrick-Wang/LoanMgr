package com.bank.debt.model.dao.intf;
import java.util.List;

import com.bank.debt.model.entity.IntfEntity;
import com.speed.frame.model.dao.AbstractReadWriteDao;



public interface IntfDao extends AbstractReadWriteDao<IntfEntity> {

	List<IntfEntity> getUIIfs();

	List<IntfEntity> getDataIfs();

}
