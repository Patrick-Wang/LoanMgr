package com.bank.debt.model.dao.area;
import com.bank.debt.model.entity.AreaEntity;
import com.speed.frame.model.dao.AbstractReadWriteDao;



public interface AreaDao extends AbstractReadWriteDao<AreaEntity> {


	String getArea(String pid);

}
