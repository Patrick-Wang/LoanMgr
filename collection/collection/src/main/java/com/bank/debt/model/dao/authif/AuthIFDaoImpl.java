package com.bank.debt.model.dao.authif;


import com.bank.debt.model.dao.authif.AuthIFDao;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;



@Repository(AuthIFDaoImpl.NAME)
@Transactional("transaction")
public class AuthIFDaoImpl implements AuthIFDao {
	public final static String NAME = "AuthIFDaoImpl";

	@PersistenceContext(unitName = "interface")
	EntityManager entityManager;
}
