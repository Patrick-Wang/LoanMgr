package com.bank.debt.model.dao.message;


import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;

import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.bank.debt.model.entity.MessageEntity;
import com.bank.debt.model.entity.UserEntity;
import com.speed.frame.model.dao.AbstractReadWriteDaoImpl;



@Repository(MessageDaoImpl.NAME)
@Transactional("transaction")
public class MessageDaoImpl extends AbstractReadWriteDaoImpl<MessageEntity> implements MessageDao {
	public final static String NAME = "MessageDaoImpl";

	@PersistenceContext(unitName = "localDB")
	public void setEntityManager(EntityManager entityManager) {
		super.setEntityManager(entityManager);
	}

	@Override
	public Integer getUnreadCount(Integer to) {
		Query q = this.getEntityManager().createQuery("select count(*) from MessageEntity where read = 0 and to.id = :to");
		q.setParameter("to", to);
		return ((Long)q.getResultList().get(0)).intValue();
	}

	@Override
	public List<MessageEntity> getUnreadMsgToUser(UserEntity user) {
		Query q = this.getEntityManager().createQuery("from MessageEntity where to.id =  :uid and read = 0");
		q.setParameter("uid", user.getId());
		return q.getResultList();
	}

	@Override
	public List<MessageEntity> getMsgWithUser(Integer entrustedCase, UserEntity user, Integer with) {
		String sql = "from MessageEntity where (to.id = :usr or come.id = :usr) ";
		if (entrustedCase != null){
			sql += "and entrustedCaseManager.id = :entrustedCase ";
		}
		if (with != null){
			sql += "and (to.id = :with or come.id = :with) ";
		}
		
		sql += " order by sendTime ";
		Query q = this.getEntityManager().createQuery(sql);
		q.setParameter("usr", user.getId());
		if (entrustedCase != null){
			q.setParameter("entrustedCase", entrustedCase);
		}
		if (with != null){
			q.setParameter("with", with);
		}
		return q.getResultList();
	}

	@Override
	public Integer getUnreadCount(Integer ecid, Integer to) {
		Query q = this.getEntityManager().createQuery("select count(*) from MessageEntity where read = 0 and to.id=:to and entrustedCaseManager.id = :ecid");
		q.setParameter("to", to);
		q.setParameter("ecid", ecid);
		return ((Long)q.getResultList().get(0)).intValue();
	}

	@Override
	public List<MessageEntity> getMsgFromUser(UserEntity user, Integer read) {
		if (read == null){
			Query q = this.getEntityManager().createQuery("from MessageEntity where come.id =  :uid");
			q.setParameter("uid", user.getId());
			return q.getResultList();
		}else{
			Query q = this.getEntityManager().createQuery("from MessageEntity where come.id =  :uid and read = :read");
			q.setParameter("uid", user.getId());
			q.setParameter("read", read);
			return q.getResultList();
		}
	}

}
