package com.bank.debt.service.roleaccessdecisionmanager;

import java.util.Collection;

import org.springframework.security.access.AccessDecisionManager;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.access.ConfigAttribute;
import org.springframework.security.authentication.InsufficientAuthenticationException;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.stereotype.Service;

@Service(RoleAccessDecisionManagerService.NAME)
public class RoleAccessDecisionManagerService implements AccessDecisionManager  {
	public final static String NAME = "roleAccessDecisionManager";
	/**
     * 决策方法： 如果方法执行完毕没有抛出异常,则说明可以放行, 否则抛出异常 AccessDeniedException
     */
    @Override
    public void decide(Authentication authentication, Object object, Collection<ConfigAttribute> configAttributes) throws AccessDeniedException, InsufficientAuthenticationException {

        // 如果登陆成功,则信息会存储在Authorities中
        Collection<? extends GrantedAuthority> myRoles = authentication.getAuthorities();
        // 如果前面的 getAttributes() 返回非空,则返回的数据做为形参传入, 如果返回为null 则不会进入decide() 直接放行

        for (GrantedAuthority myRole : myRoles) {// 当前登录的角色
            for (ConfigAttribute urlRoles : configAttributes) {// 前台传入的url的角色，UrlDaoImpl.getAttributes获得的
                if (myRole.getAuthority().equals(urlRoles.getAttribute())) {
                    return;
                }
            }
        }

        throw new AccessDeniedException("权限越界！");
    }

    /**
     * 返回true表示支持
     */
    @Override
    public boolean supports(ConfigAttribute attribute) {
        return true;
    }

    /**
     * 返回true表示支持
     */
    @Override
    public boolean supports(Class<?> clazz) {
        return true;
    }
}
