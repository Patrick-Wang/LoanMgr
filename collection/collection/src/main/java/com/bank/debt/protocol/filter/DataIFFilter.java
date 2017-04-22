package com.bank.debt.protocol.filter;

import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.Method;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import com.bank.debt.protocol.entity.IF;
import com.bank.debt.protocol.tools.BeanUtil;

public class DataIFFilter {

	Set<String> setMethods;
	public DataIFFilter(List<IF> dataIfs) {
		this.setMethods = getSetMethodsFromIfs(dataIfs);
	}
	
	private Set<String> getSetMethodsFromIfs(List<IF> dataIfs){
		Set<String> setMethods = new HashSet<String>();
		for(int i = 0; i < dataIfs.size(); ++i){
			setMethods.add(BeanUtil.getSetMethod(dataIfs.get(i).getFieldFromAddr()));
		}
		return setMethods;
	}
	
	public Object filter(Object ec){
		Method[] mds = ec.getClass().getMethods();
		for (Method md : mds){
			if (md.getParameterTypes().length == 1 && !setMethods.contains(md.getName())){
				if (BeanUtil.isSetMethod(md.getName())){
					try {
						md.invoke(ec, null);
					} catch (IllegalAccessException | IllegalArgumentException | InvocationTargetException e) {
						e.printStackTrace();
					}
				}
			}
		}
		return ec;
	}
	
	public List<Object> filter(List<Object> ecs){
		for (Object bec : ecs){
			filter(bec);
		}
		return ecs;
	}

}
