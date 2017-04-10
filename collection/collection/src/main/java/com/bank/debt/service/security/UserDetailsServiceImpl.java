package com.bank.debt.service.security;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.bank.debt.model.dao.user.UserDao;
import com.bank.debt.model.entity.RoleEntity;
import com.bank.debt.model.entity.UserEntity;

@Service(value="userDetailsServiceImpl")
public class UserDetailsServiceImpl implements UserDetailsService {

	@Autowired
	UserDao userDao;
	
	@Override
	public UserDetails loadUserByUsername(String userName) throws UsernameNotFoundException {
		UserEntity user = userDao.getUserByName(userName);
		if (null != user){
			List<GrantedAuthority> gas = new ArrayList<GrantedAuthority>();
			for (RoleEntity role : user.getRoles()){
				gas.add(new GrantedAuthorityImpl(role.getName()));
			}
			return new User(user.getUsername(), user.getPassword(), gas);
		}
		throw new UsernameNotFoundException(userName);
	}

}
