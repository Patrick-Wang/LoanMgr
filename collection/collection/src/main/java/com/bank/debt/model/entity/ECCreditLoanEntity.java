package com.bank.debt.model.entity;

import javax.persistence.Column;
import javax.persistence.GenerationType;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import com.speed.frame.model.entity.AbstractReadWriteEntity;
import java.io.Serializable;
import java.sql.Date;

import javax.persistence.Entity;
import javax.persistence.Table;


@Entity
@Table(name = "entrusted_case_credit_loan")
public class ECCreditLoanEntity extends AbstractReadWriteEntity implements Serializable {
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	@Column(name = "id")
	public int getId() {
		return super.getId();
	}


	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	String	khh		;
	String	khxm		;
	String	zhh		;
	String	xb		;
	String	sfzh		;
	String	fkjg		;
	Double	qyje		;
	Double	fkje		;
	String	cplx		;
	Date	fksj		;
	Double	tqjqje		;
	Integer	zqs		;
	Integer	dqqs		;
	Integer	yhqs		;
	Double	sybj		;
	Double	yqlx		;
	Double	yqfx		;
	Double	yqglf		;
	Double	yqwyj		;
	Double	yqbj		;
	Double	whbj		;
	Double	yhke		;
	String	zhm		;
	String	yxm		;
	String	yxzh		;
	String	gjgs		;
	Double	yqts		;
	Double	zl		;
	String	cs		;
	String	dzyx		;
	String	hjdh		;
	String	hjdz		;
	String	sjhm		;
	String	zzdh		;
	String	zzdz		;
	String	gsmc		;
	String	gsdz		;
	String	gsdh		;
	String	llr1xm		;
	String	llr1gx		;
	String	llr1dh		;
	String	llr2xm		;
	String	llr2gx		;
	String	llr2dh		;
	String	llr3xm		;
	String	llr3gx		;
	String	llr3dh		;
	String	llr4xm		;
	String	llr4gx		;
	String	llr4dh		;
	String	llr5xm		;
	String	llr5gx		;
	String	llr5dh		;
	String	llr6xm		;
	String	llr6gx		;
	String	llr6dh		;
	String	llr7xm		;
	String	llr7gx		;
	String	llr7dh		;
	String	llr8xm		;
	String	llr8gx		;
	String	llr8dh		;
	String	llr9xm		;
	String	llr9gx		;
	String	llr9dh		;
	String	llr10xm		;
	String	llr10gx		;
	String	llr10dh		;
	public String getKhh() {
		return khh;
	}
	public void setKhh(String khh) {
		this.khh = khh;
	}
	public String getKhxm() {
		return khxm;
	}
	public void setKhxm(String khxm) {
		this.khxm = khxm;
	}
	public String getZhh() {
		return zhh;
	}
	public void setZhh(String zhh) {
		this.zhh = zhh;
	}
	public String getXb() {
		return xb;
	}
	public void setXb(String xb) {
		this.xb = xb;
	}
	public String getSfzh() {
		return sfzh;
	}
	public void setSfzh(String sfzh) {
		this.sfzh = sfzh;
	}
	public String getFkjg() {
		return fkjg;
	}
	public void setFkjg(String fkjg) {
		this.fkjg = fkjg;
	}
	public Double getQyje() {
		return qyje;
	}
	public void setQyje(Double qyje) {
		this.qyje = qyje;
	}
	public Double getFkje() {
		return fkje;
	}
	public void setFkje(Double fkje) {
		this.fkje = fkje;
	}
	public String getCplx() {
		return cplx;
	}
	public void setCplx(String cplx) {
		this.cplx = cplx;
	}
	public Date getFksj() {
		return fksj;
	}
	public void setFksj(Date fksj) {
		this.fksj = fksj;
	}
	public Double getTqjqje() {
		return tqjqje;
	}
	public void setTqjqje(Double tqjqje) {
		this.tqjqje = tqjqje;
	}
	public Integer getZqs() {
		return zqs;
	}
	public void setZqs(Integer zqs) {
		this.zqs = zqs;
	}
	public Integer getDqqs() {
		return dqqs;
	}
	public void setDqqs(Integer dqqs) {
		this.dqqs = dqqs;
	}
	public Integer getYhqs() {
		return yhqs;
	}
	public void setYhqs(Integer yhqs) {
		this.yhqs = yhqs;
	}
	public Double getSybj() {
		return sybj;
	}
	public void setSybj(Double sybj) {
		this.sybj = sybj;
	}
	public Double getYqlx() {
		return yqlx;
	}
	public void setYqlx(Double yqlx) {
		this.yqlx = yqlx;
	}
	public Double getYqfx() {
		return yqfx;
	}
	public void setYqfx(Double yqfx) {
		this.yqfx = yqfx;
	}
	public Double getYqglf() {
		return yqglf;
	}
	public void setYqglf(Double yqglf) {
		this.yqglf = yqglf;
	}
	public Double getYqwyj() {
		return yqwyj;
	}
	public void setYqwyj(Double yqwyj) {
		this.yqwyj = yqwyj;
	}
	public Double getYqbj() {
		return yqbj;
	}
	public void setYqbj(Double yqbj) {
		this.yqbj = yqbj;
	}
	public Double getWhbj() {
		return whbj;
	}
	public void setWhbj(Double whbj) {
		this.whbj = whbj;
	}
	public Double getYhke() {
		return yhke;
	}
	public void setYhke(Double yhke) {
		this.yhke = yhke;
	}
	public String getZhm() {
		return zhm;
	}
	public void setZhm(String zhm) {
		this.zhm = zhm;
	}
	public String getYxm() {
		return yxm;
	}
	public void setYxm(String yxm) {
		this.yxm = yxm;
	}
	public String getYxzh() {
		return yxzh;
	}
	public void setYxzh(String yxzh) {
		this.yxzh = yxzh;
	}
	public String getGjgs() {
		return gjgs;
	}
	public void setGjgs(String gjgs) {
		this.gjgs = gjgs;
	}
	public Double getYqts() {
		return yqts;
	}
	public void setYqts(Double yqts) {
		this.yqts = yqts;
	}
	public Double getZl() {
		return zl;
	}
	public void setZl(Double zl) {
		this.zl = zl;
	}
	public String getCs() {
		return cs;
	}
	public void setCs(String cs) {
		this.cs = cs;
	}
	public String getDzyx() {
		return dzyx;
	}
	public void setDzyx(String dzyx) {
		this.dzyx = dzyx;
	}
	public String getHjdh() {
		return hjdh;
	}
	public void setHjdh(String hjdh) {
		this.hjdh = hjdh;
	}
	public String getHjdz() {
		return hjdz;
	}
	public void setHjdz(String hjdz) {
		this.hjdz = hjdz;
	}
	public String getSjhm() {
		return sjhm;
	}
	public void setSjhm(String sjhm) {
		this.sjhm = sjhm;
	}
	public String getZzdh() {
		return zzdh;
	}
	public void setZzdh(String zzdh) {
		this.zzdh = zzdh;
	}
	public String getZzdz() {
		return zzdz;
	}
	public void setZzdz(String zzdz) {
		this.zzdz = zzdz;
	}
	public String getGsmc() {
		return gsmc;
	}
	public void setGsmc(String gsmc) {
		this.gsmc = gsmc;
	}
	public String getGsdz() {
		return gsdz;
	}
	public void setGsdz(String gsdz) {
		this.gsdz = gsdz;
	}
	public String getGsdh() {
		return gsdh;
	}
	public void setGsdh(String gsdh) {
		this.gsdh = gsdh;
	}
	public String getLlr1xm() {
		return llr1xm;
	}
	public void setLlr1xm(String llr1xm) {
		this.llr1xm = llr1xm;
	}
	public String getLlr1gx() {
		return llr1gx;
	}
	public void setLlr1gx(String llr1gx) {
		this.llr1gx = llr1gx;
	}
	public String getLlr1dh() {
		return llr1dh;
	}
	public void setLlr1dh(String llr1dh) {
		this.llr1dh = llr1dh;
	}
	public String getLlr2xm() {
		return llr2xm;
	}
	public void setLlr2xm(String llr2xm) {
		this.llr2xm = llr2xm;
	}
	public String getLlr2gx() {
		return llr2gx;
	}
	public void setLlr2gx(String llr2gx) {
		this.llr2gx = llr2gx;
	}
	public String getLlr2dh() {
		return llr2dh;
	}
	public void setLlr2dh(String llr2dh) {
		this.llr2dh = llr2dh;
	}
	public String getLlr3xm() {
		return llr3xm;
	}
	public void setLlr3xm(String llr3xm) {
		this.llr3xm = llr3xm;
	}
	public String getLlr3gx() {
		return llr3gx;
	}
	public void setLlr3gx(String llr3gx) {
		this.llr3gx = llr3gx;
	}
	public String getLlr3dh() {
		return llr3dh;
	}
	public void setLlr3dh(String llr3dh) {
		this.llr3dh = llr3dh;
	}
	public String getLlr4xm() {
		return llr4xm;
	}
	public void setLlr4xm(String llr4xm) {
		this.llr4xm = llr4xm;
	}
	public String getLlr4gx() {
		return llr4gx;
	}
	public void setLlr4gx(String llr4gx) {
		this.llr4gx = llr4gx;
	}
	public String getLlr4dh() {
		return llr4dh;
	}
	public void setLlr4dh(String llr4dh) {
		this.llr4dh = llr4dh;
	}
	public String getLlr5xm() {
		return llr5xm;
	}
	public void setLlr5xm(String llr5xm) {
		this.llr5xm = llr5xm;
	}
	public String getLlr5gx() {
		return llr5gx;
	}
	public void setLlr5gx(String llr5gx) {
		this.llr5gx = llr5gx;
	}
	public String getLlr5dh() {
		return llr5dh;
	}
	public void setLlr5dh(String llr5dh) {
		this.llr5dh = llr5dh;
	}
	public String getLlr6xm() {
		return llr6xm;
	}
	public void setLlr6xm(String llr6xm) {
		this.llr6xm = llr6xm;
	}
	public String getLlr6gx() {
		return llr6gx;
	}
	public void setLlr6gx(String llr6gx) {
		this.llr6gx = llr6gx;
	}
	public String getLlr6dh() {
		return llr6dh;
	}
	public void setLlr6dh(String llr6dh) {
		this.llr6dh = llr6dh;
	}
	public String getLlr7xm() {
		return llr7xm;
	}
	public void setLlr7xm(String llr7xm) {
		this.llr7xm = llr7xm;
	}
	public String getLlr7gx() {
		return llr7gx;
	}
	public void setLlr7gx(String llr7gx) {
		this.llr7gx = llr7gx;
	}
	public String getLlr7dh() {
		return llr7dh;
	}
	public void setLlr7dh(String llr7dh) {
		this.llr7dh = llr7dh;
	}
	public String getLlr8xm() {
		return llr8xm;
	}
	public void setLlr8xm(String llr8xm) {
		this.llr8xm = llr8xm;
	}
	public String getLlr8gx() {
		return llr8gx;
	}
	public void setLlr8gx(String llr8gx) {
		this.llr8gx = llr8gx;
	}
	public String getLlr8dh() {
		return llr8dh;
	}
	public void setLlr8dh(String llr8dh) {
		this.llr8dh = llr8dh;
	}
	public String getLlr9xm() {
		return llr9xm;
	}
	public void setLlr9xm(String llr9xm) {
		this.llr9xm = llr9xm;
	}
	public String getLlr9gx() {
		return llr9gx;
	}
	public void setLlr9gx(String llr9gx) {
		this.llr9gx = llr9gx;
	}
	public String getLlr9dh() {
		return llr9dh;
	}
	public void setLlr9dh(String llr9dh) {
		this.llr9dh = llr9dh;
	}
	public String getLlr10xm() {
		return llr10xm;
	}
	public void setLlr10xm(String llr10xm) {
		this.llr10xm = llr10xm;
	}
	public String getLlr10gx() {
		return llr10gx;
	}
	public void setLlr10gx(String llr10gx) {
		this.llr10gx = llr10gx;
	}
	public String getLlr10dh() {
		return llr10dh;
	}
	public void setLlr10dh(String llr10dh) {
		this.llr10dh = llr10dh;
	}

}
