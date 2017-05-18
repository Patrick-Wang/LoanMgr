package com.bank.debt.service.url;

import java.util.Collection;
import java.util.HashSet;
import java.util.List;

import javax.annotation.Resource;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.ConfigAttribute;
import org.springframework.security.web.FilterInvocation;
import org.springframework.security.web.access.intercept.FilterInvocationSecurityMetadataSource;
import org.springframework.stereotype.Service;

import com.bank.debt.model.dao.authority.AuthorityDao;
import com.bank.debt.model.dao.authority.AuthorityDaoImpl;
import com.bank.debt.model.dao.role.RoleDao;
import com.bank.debt.model.entity.RoleEntity;

class ConfigAttributeImpl implements ConfigAttribute {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	String attr;

	public ConfigAttributeImpl(String attr) {
		super();
		this.attr = attr;
	}

	@Override
	public String getAttribute() {
		// TODO Auto-generated method stub
		return attr;
	}

}

@Service(UrlServiceImpl.NAME)
public class UrlServiceImpl implements FilterInvocationSecurityMetadataSource {
	@Resource(name = AuthorityDaoImpl.NAME)
	AuthorityDao authIFDao;

	@Autowired
	RoleDao roleDao;

	public final static String NAME = "urlService";

	Collection<ConfigAttribute> cas = new HashSet<ConfigAttribute>();

	@Autowired
	public void init() {
		List<RoleEntity> rs = roleDao.getAll();

		for (RoleEntity r : rs) {
			cas.add(new ConfigAttributeImpl(r.getName()));
		}

	}

	// 所有接口都是全角色可访问
	@Override
	public Collection<ConfigAttribute> getAttributes(Object object) throws IllegalArgumentException {
		// FilterInvocation filterInvocation = (FilterInvocation) object;
		//
		// String url = filterInvocation.getRequest().getServletPath();
		// List<String> roles = authIFDao.getRoleByUrl(url);
		// if (!roles.isEmpty()) {
		//
		// Collection<ConfigAttribute> c = new HashSet<ConfigAttribute>();
		// for (String role : roles){
		// c.add(new ConfigAttributeImpl(role));
		// }
		//
		// return c;
		// } else {
		// // 如果返回为null则说明此url地址不需要相应的角色就可以访问, 这样Security会放行
		// return null;
		// }
		return cas;
	}

	@Override
	public Collection<ConfigAttribute> getAllConfigAttributes() {
		// TODO Auto-generated method stub
		return null;
	}

	/**
	 * 如果为真则说明支持当前格式类型,才会到上面的 getAttributes 方法中
	 */
	@Override
	public boolean supports(Class<?> clazz) {
		// TODO Auto-generated method stub
		// 需要返回true表示支持
		return true;
	}

}
