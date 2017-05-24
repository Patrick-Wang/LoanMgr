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
	public Integer getUnreadCount(Integer dest) {
		Query q = this.getEntityManager().createQuery("select count(*) from MessageEntity where isRead = 0 and dest.id = :dest");
		q.setParameter("dest", dest);
		return ((Long)q.getResultList().get(0)).intValue();
	}

	@Override
	public List<MessageEntity> getUnreadMsgToUser(UserEntity user) {
		Query q = this.getEntityManager().createQuery("from MessageEntity where dest.id =  :uid and isRead = 0");
		q.setParameter("uid", user.getId());
		return q.getResultList();
	}

	@Override
	public void deleteByECM(int id) {
		Query q = this.getEntityManager().createQuery("delete from MessageEntity where entrustedCaseManager.id = :ecId");
		q.setParameter("ecId", id);
		q.executeUpdate();
	}
	
	@Override
	public List<MessageEntity> getMsgWithUser(Integer entrustedCase, UserEntity user, Integer with) {
		String sql = "from MessageEntity where (dest.id = :usr or come.id = :usr) ";
		if (entrustedCase != null){
			sql += "and entrustedCaseManager.id = :entrustedCase ";
		}
		if (with != null){
			sql += "and (dest.id = :with or come.id = :with) ";
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
	public Integer getUnreadCount(Integer ecid, Integer dest) {
		Query q = this.getEntityManager().createQuery("select count(*) from MessageEntity where isRead = 0 and dest.id=:dest and entrustedCaseManager.id = :ecid");
		q.setParameter("dest", dest);
		q.setParameter("ecid", ecid);
		return ((Long)q.getResultList().get(0)).intValue();
	}

	@Override
	public List<MessageEntity> getMsgFromUser(UserEntity user, Integer isRead) {
		if (isRead == null){
			Query q = this.getEntityManager().createQuery("from MessageEntity where come.id =  :uid");
			q.setParameter("uid", user.getId());
			return q.getResultList();
		}else{
			Query q = this.getEntityManager().createQuery("from MessageEntity where come.id =  :uid and isRead = :isRead");
			q.setParameter("uid", user.getId());
			q.setParameter("isRead", isRead);
			return q.getResultList();
		}
	}
	
	@Override
	public List<MessageEntity> getECMsgs(Integer entrustedCase) {
		Query q = this.getEntityManager().createQuery("from MessageEntity where entrustedCaseManager.id = :entrustedCase ");
		q.setParameter("entrustedCase", entrustedCase);
		return q.getResultList();
		
	}

}
