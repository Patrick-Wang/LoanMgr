package com.bank.debt.model.dao.user;
import java.util.List;

import com.bank.debt.model.entity.UserEntity;
import com.speed.frame.model.dao.AbstractReadWriteDao;



public interface UserDao extends AbstractReadWriteDao<UserEntity> {

	UserEntity getUserByName(String name);

	List<UserEntity> getUserByIfs(List<String> ifList);

	Integer getCount();

}
