package com.speed.frame.model.dao;

import java.util.List;

import com.speed.frame.model.entity.AbstractReadWriteEntity;

public interface AbstractReadWriteDao<T extends AbstractReadWriteEntity>
		extends DaoBase<T> {
	public void create(T entity);

	public void persist(T entity);

	public T merge(T entity);
	
	public void merge(List<T> entities);

	public void delete(T entity);

	public void deleteById(int id);
}
