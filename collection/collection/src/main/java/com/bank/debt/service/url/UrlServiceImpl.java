package com.bank.debt.service.url;

import com.bank.debt.model.dao.authif.AuthIFDaoImpl;
import com.bank.debt.model.dao.authif.AuthIFDao;
import java.util.Collection;

import javax.annotation.Resource;

import org.springframework.security.access.ConfigAttribute;
import org.springframework.security.web.access.intercept.FilterInvocationSecurityMetadataSource;
import org.springframework.stereotype.Service;

@Service(UrlServiceImpl.NAME)
public class UrlServiceImpl implements FilterInvocationSecurityMetadataSource {
	@Resource(name=AuthIFDaoImpl.NAME)
	AuthIFDao authIFDao;

	public final static String NAME = "urlService";


	@Override
	public Collection<ConfigAttribute> getAttributes(Object object) throws IllegalArgumentException {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public Collection<ConfigAttribute> getAllConfigAttributes() {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public boolean supports(Class<?> clazz) {
		// TODO Auto-generated method stub
		return false;
	}

}
