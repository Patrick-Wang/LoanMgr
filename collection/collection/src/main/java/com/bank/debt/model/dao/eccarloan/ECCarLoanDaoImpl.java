package com.bank.debt.model.dao.eccarloan;


import java.sql.Date;
import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;

import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.bank.debt.model.entity.ECCarLoanEntity;
import com.bank.debt.model.entity.UserEntity;
import com.bank.debt.protocol.entity.QueryOption;
import com.speed.frame.model.dao.AbstractReadWriteDaoImpl;



@Repository(ECCarLoanDaoImpl.NAME)
@Transactional("transaction")
public class ECCarLoanDaoImpl extends AbstractReadWriteDaoImpl<ECCarLoanEntity> implements ECCarLoanDao {
	public final static String NAME = "ECCarLoanDaoImpl";

	@PersistenceContext(unitName = "localDB")
	public void setEntityManager(EntityManager entityManager) {
		super.setEntityManager(entityManager);
	}

	Query makeQuery(String sel, UserEntity ue, QueryOption qOpt){
		String sql = sel;//"select ecme, eccle from ECCarLoanEntity eccle, EntrustedCaseManagerEntity ecme";
		String where = " where entrustedCase = eccle.id and type = 0";
		
		if (qOpt.getAssignToMe()){
			where += " and ecme.assignee.id=:me ";
		}
		
		if (qOpt.getMyOwn()){
			where += " and ecme.owner.id=:me ";
		}
		
		if (qOpt.getName() != null){
			where += " and khxm like :name ";
		}
		
		if (qOpt.getPIN() != null){
			where += " and  khsfzh like :pin ";
		}
		
		if (qOpt.getCode() != null){
			where += " and  code like :code ";
		}
		
		if (qOpt.getWwrq() != null){
			where += " and  wwrq = :wwrq ";
		}
		
		if (qOpt.getWwjg() != null){
			where += " and  wwjg like :wwjg ";
		}
		
		if (qOpt.getWwzt() != null){
			where += " and  wwzt like :wwzt ";
		}

		if (qOpt.getBatchNo() != null){
			where += " and batchNo = :batchNo ";
		}
		
		if (qOpt.getMgrId() != null){
			where += " and ecme.id = :mgrId ";
		}
		
		if (qOpt.getYqtsStartOpen() != null){
			where += " and yqts > :yqtsStart ";
		}
		
		if (qOpt.getYqtsEndClose() != null){
			where += " and yqts <= :yqtsEnd ";
		}
		
		if (qOpt.getAssignee() != null){
			where += " and ecme.assignee.id=:assignee ";
		}

        if (qOpt.getPch() != null){
            where += " and eccle.pch=:pch ";
        }

		Query q = this.getEntityManager().createQuery(sql + where);
		
		if (qOpt.getName() != null){
			q.setParameter("name", "%" + qOpt.getName() + "%");
		}
		
		if (qOpt.getPIN() != null){
			q.setParameter("pin", "%" + qOpt.getPIN() + "%");
		}
		
		if (qOpt.getCode() != null){
			q.setParameter("code", "%" + qOpt.getCode() + "%");
		}
		
		if (qOpt.getWwrq() != null){
			q.setParameter("wwrq", Date.valueOf(qOpt.getWwrq()));
		}
		
		if (qOpt.getWwjg() != null){
			q.setParameter("wwjg", "%" + qOpt.getWwjg() + "%");
		}
		
		if (qOpt.getWwzt() != null){
			q.setParameter("wwzt", "%" + qOpt.getWwzt() + "%");
		}
		
		if (qOpt.getBatchNo() != null){
			q.setParameter("batchNo", qOpt.getBatchNo());
		}
		
		if (qOpt.getMgrId() != null){
			q.setParameter("mgrId", qOpt.getMgrId());
		}
		
		if (qOpt.getAssignToMe() || qOpt.getMyOwn()){
			q.setParameter("me", ue.getId());
		}
		
		if (qOpt.getYqtsStartOpen() != null){
			q.setParameter("yqtsStart", qOpt.getYqtsStartOpen());
		}
		
		if (qOpt.getYqtsEndClose() != null){
			q.setParameter("yqtsEnd", qOpt.getYqtsEndClose());
		}
		if (qOpt.getAssignee() != null){
			q.setParameter("assignee", qOpt.getAssignee());
		}

        if (qOpt.getPch() != null){
            q.setParameter("pch", qOpt.getPch());
        }
		return q;
	}
	
	@Override
	public List<Object[]> search(UserEntity ue, QueryOption qOpt) {
		Query q = makeQuery(
				"select ecme, eccle "
				+ "from ECCarLoanEntity eccle, "
				+ "EntrustedCaseManagerEntity ecme",
				ue, qOpt);
		if (qOpt.getLimit() != null){
			q.setMaxResults(qOpt.getLimit());
		}
		
		if (qOpt.getPageNum() != null && qOpt.getPageSize() != null){
			q.setFirstResult(qOpt.getPageNum() * qOpt.getPageSize());
			q.setMaxResults(qOpt.getPageSize());
		}
		return q.getResultList();
	}

	@Override
	public int getCompleteForOwner(UserEntity ue) {
		Query q = this.getEntityManager().createQuery("select count(*) "
				+ "from ECCarLoanEntity eccle, EntrustedCaseManagerEntity ecme "
				+ "where eccle.id = ecme.entrustedCase and "
				+ "wwzt='已退案' and "
				+ "ecme.owner.id = :uid");
		q.setParameter("uid", ue.getId());
		List ret = q.getResultList();
		return ((Long)(ret.get(0))).intValue();
	}

	@Override
	public int getCompleteForAssignee(UserEntity ue) {
		Query q = this.getEntityManager().createQuery("select count(*) "
				+ "from ECCarLoanEntity eccle, EntrustedCaseManagerEntity ecme "
				+ "where eccle.id = ecme.entrustedCase and "
				+ "wwzt='已退案' and "
				+ "ecme.assignee.id = :uid");
		q.setParameter("uid", ue.getId());
		List ret = q.getResultList();
		return ((Long)(ret.get(0))).intValue();
	}

	@Override
	public Double getLjje() {
		Query q = this.getEntityManager().createQuery("select sum(wwje) "
				+ "from ECCarLoanEntity");
		List ret = q.getResultList();
		return (Double) ret.get(0);
	}
	
	@Override
	public Double getYhje() {
		Query q = this.getEntityManager().createQuery("select sum(yhje) "
				+ "from ECCarLoanEntity");


		List ret = q.getResultList();
		return (Double) ret.get(0);
	}
	
	@Override
	public List<String> getWwjgs() {
		Query q = this.getEntityManager().createQuery("select distinct wwjg "
				+ "from ECCarLoanEntity where wwjg is not null");
		List ret = q.getResultList();
		return ret;
	}

	@Override
	public Integer count(UserEntity ue, QueryOption qOpt) {
		Query q = makeQuery(
				"select count(*) "
				+ "from ECCarLoanEntity eccle, "
				+ "EntrustedCaseManagerEntity ecme",
				ue, qOpt);
		List ret = q.getResultList();
		return ((Long)(ret.get(0))).intValue();
	}

    @Override
    public List<String> getPch() {

        Query q = this.getEntityManager().createQuery("select distinct pch from ECCarLoanEntity ");
        List ret = q.getResultList();
        return ret;
    }
}
