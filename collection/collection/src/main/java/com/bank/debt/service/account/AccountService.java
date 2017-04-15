package com.bank.debt.service.account;

import java.util.List;

import com.bank.debt.model.entity.UserEntity;
import com.bank.debt.protocol.entity.CreateUser;
import com.bank.debt.protocol.entity.Organization;
import com.bank.debt.protocol.entity.Result;
import com.bank.debt.protocol.entity.User;

public interface AccountService {

	List<Organization> getOrgs();

	Result updateUsers(List<User> usrs);

	Result createUser(CreateUser usr);

	List<User> getAllUsers();

	UserEntity getUser(String userName);


}
