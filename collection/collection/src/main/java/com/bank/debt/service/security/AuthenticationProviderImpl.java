package com.bank.debt.service.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.authentication.dao.AbstractUserDetailsAuthenticationProvider;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.stereotype.Service;

@Service(value="authenticationProvider")
public class AuthenticationProviderImpl extends AbstractUserDetailsAuthenticationProvider   {

	@Autowired
	UserDetailsService uds;
	


	@Override
	protected UserDetails retrieveUser(String username, UsernamePasswordAuthenticationToken authentication)
			throws AuthenticationException {
		System.out.println("retrieveUser");
		return (UserDetails) uds.loadUserByUsername(username);
	}



	@Override
	protected void additionalAuthenticationChecks(UserDetails userDetails,
			UsernamePasswordAuthenticationToken authentication) throws AuthenticationException {
		String psw = (String) authentication.getCredentials();
		if (!userDetails.getPassword().equals(psw)){
			throw new BadCredentialsException(userDetails.getUsername());
		}
		
	}



}
