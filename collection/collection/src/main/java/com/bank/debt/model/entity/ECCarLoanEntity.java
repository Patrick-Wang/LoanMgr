package com.bank.debt.model.entity;

import java.io.Serializable;
import java.sql.Date;
import java.text.SimpleDateFormat;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import com.speed.frame.model.entity.AbstractReadWriteEntity;


@Entity
@Table(name = "entrusted_case_car_loan")
public class ECCarLoanEntity extends AbstractReadWriteEntity implements Serializable {
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
	String code;
	String pch;
	Date wwrq;
	String wwzt;
	String wwjig;
	Double wwje;
	Double yhje;
	Double syje;
	Date	wwdqr	;
	Date	jarq	;
	String	khxm	;
	String	htbh	;
	String	wbsbh	;
	String	wwlx	;
	String	khxb	;
	Date	khcsrq	;
	String	khsfzh	;
	Integer	wfqs	;
	Double	wfje	;
	Double	yqts	;
	Double	yqje	;
	Double	ygckje	;
	Double	dkqx	;
	Integer	yqqs	;
	Integer	zjyqcs	;
	Integer	hkqs	;
	String	cs	;
	String	jxs	;
	String	khsj	;
	String	khzd	;
	String	khgs	;
	String	khgsdh	;
	String	fq	;
	String	qh	;
	String	yb	;
	String	poxm	;
	String	posj	;
	String	qtlxfs	;
	String	pogs	;
	String	pogsdh	;
	String	khlx	;
	Date	sqrq	;
	Date	fkrq	;
	Date	hkrq	;
	Date	bddqr	;
	Double	dkje	;
	String	dkzl	;
	Double	khll	;
	Double	cj	;
	String	cx	;
	String	zw	;
	Double	sr	;
	String	dbrxm	;
	String	ysqrgx	;
	Date	dbrcsrq	;
	String	dbrsfzh	;
	String	dbrsj	;
	String	dbrgsmc	;
	String	dbrgsdh	;
	String	dbrgsdz	;
	String	yx	;
	String	zh	;
	String	wydcyy	;
	String	yqyy	;
	String	dhqk	;
	String	dhlxr	;
	String	hkqk	;
	String	hkr	;
	String	xxxglb	;
	String	clqk	;
	String	khhztd	;
	String	clzt	;
	Date	fkuirq	;
	String	wwjg	;
	String	pcode	;
	String	ccode	;
	
	public Date getWwrq() {
		return wwrq;
	}
	public void setWwrq(Date wwrq) {
		this.wwrq = wwrq;
	}
	public Date getWwdqr() {
		return wwdqr;
	}
	public void setWwdqr(Date wwdqr) {
		this.wwdqr = wwdqr;
	}
	public Date getJarq() {
		return jarq;
	}
	public void setJarq(Date jarq) {
		this.jarq = jarq;
	}
	public String getKhxm() {
		return khxm;
	}
	public void setKhxm(String khxm) {
		this.khxm = khxm;
	}
	public String getHtbh() {
		return htbh;
	}
	public void setHtbh(String htbh) {
		this.htbh = htbh;
	}
	public String getWbsbh() {
		return wbsbh;
	}
	public void setWbsbh(String wbsbh) {
		this.wbsbh = wbsbh;
	}
	public String getWwlx() {
		return wwlx;
	}
	public void setWwlx(String wwlx) {
		this.wwlx = wwlx;
	}
	public String getKhxb() {
		return khxb;
	}
	public void setKhxb(String khxb) {
		this.khxb = khxb;
	}
	public Date getKhcsrq() {
		return khcsrq;
	}
	public void setKhcsrq(Date khcsrq) {
		this.khcsrq = khcsrq;
	}
	public String getKhsfzh() {
		return khsfzh;
	}
	public void setKhsfzh(String khsfzh) {
		this.khsfzh = khsfzh;
	}
	public String getWwzt() {
		return wwzt;
	}
	public void setWwzt(String wwzt) {
		this.wwzt = wwzt;
	}
	public Integer getWfqs() {
		return wfqs;
	}
	public void setWfqs(Integer wfqs) {
		this.wfqs = wfqs;
	}
	public Double getWfje() {
		return wfje;
	}
	public void setWfje(Double wfje) {
		this.wfje = wfje;
	}
	public Double getYqts() {
		return yqts;
	}
	public void setYqts(Double yqts) {
		this.yqts = yqts;
	}
	public Double getYqje() {
		return yqje;
	}
	public void setYqje(Double yqje) {
		this.yqje = yqje;
	}
	public Double getYgckje() {
		return ygckje;
	}
	public void setYgckje(Double ygckje) {
		this.ygckje = ygckje;
	}
	public Double getDkqx() {
		return dkqx;
	}
	public void setDkqx(Double dkqx) {
		this.dkqx = dkqx;
	}
	public Integer getYqqs() {
		return yqqs;
	}
	public void setYqqs(Integer yqqs) {
		this.yqqs = yqqs;
	}
	public Integer getZjyqcs() {
		return zjyqcs;
	}
	public void setZjyqcs(Integer zjyqcs) {
		this.zjyqcs = zjyqcs;
	}
	public Integer getHkqs() {
		return hkqs;
	}
	public void setHkqs(Integer hkqs) {
		this.hkqs = hkqs;
	}
	public String getCs() {
		return cs;
	}
	public void setCs(String cs) {
		this.cs = cs;
	}
	public String getJxs() {
		return jxs;
	}
	public void setJxs(String jxs) {
		this.jxs = jxs;
	}
	public String getKhsj() {
		return khsj;
	}
	public void setKhsj(String khsj) {
		this.khsj = khsj;
	}
	public String getKhzd() {
		return khzd;
	}
	public void setKhzd(String khzd) {
		this.khzd = khzd;
	}
	public String getKhgs() {
		return khgs;
	}
	public void setKhgs(String khgs) {
		this.khgs = khgs;
	}
	public String getKhgsdh() {
		return khgsdh;
	}
	public void setKhgsdh(String khgsdh) {
		this.khgsdh = khgsdh;
	}
	public String getFq() {
		return fq;
	}
	public void setFq(String fq) {
		this.fq = fq;
	}
	public String getQh() {
		return qh;
	}
	public void setQh(String qh) {
		this.qh = qh;
	}
	public String getYb() {
		return yb;
	}
	public void setYb(String yb) {
		this.yb = yb;
	}
	public String getPoxm() {
		return poxm;
	}
	public void setPoxm(String poxm) {
		this.poxm = poxm;
	}
	public String getPosj() {
		return posj;
	}
	public void setPosj(String posj) {
		this.posj = posj;
	}
	public String getQtlxfs() {
		return qtlxfs;
	}
	public void setQtlxfs(String qtlxfs) {
		this.qtlxfs = qtlxfs;
	}
	public String getPogs() {
		return pogs;
	}
	public void setPogs(String pogs) {
		this.pogs = pogs;
	}
	public String getPogsdh() {
		return pogsdh;
	}
	public void setPogsdh(String pogsdh) {
		this.pogsdh = pogsdh;
	}
	public String getKhlx() {
		return khlx;
	}
	public void setKhlx(String khlx) {
		this.khlx = khlx;
	}
	public Date getSqrq() {
		return sqrq;
	}
	public void setSqrq(Date sqrq) {
		this.sqrq = sqrq;
	}
	public Date getFkrq() {
		return fkrq;
	}
	public void setFkrq(Date fkrq) {
		this.fkrq = fkrq;
	}
	public Date getHkrq() {
		return hkrq;
	}
	public void setHkrq(Date hkrq) {
		this.hkrq = hkrq;
	}
	public Date getBddqr() {
		return bddqr;
	}
	public void setBddqr(Date bddqr) {
		this.bddqr = bddqr;
	}
	public Double getDkje() {
		return dkje;
	}
	public void setDkje(Double dkje) {
		this.dkje = dkje;
	}
	public String getDkzl() {
		return dkzl;
	}
	public void setDkzl(String dkzl) {
		this.dkzl = dkzl;
	}
	public Double getKhll() {
		return khll;
	}
	public void setKhll(Double khll) {
		this.khll = khll;
	}
	public Double getCj() {
		return cj;
	}
	public void setCj(Double cj) {
		this.cj = cj;
	}
	public String getCx() {
		return cx;
	}
	public void setCx(String cx) {
		this.cx = cx;
	}
	public String getZw() {
		return zw;
	}
	public void setZw(String zw) {
		this.zw = zw;
	}
	public Double getSr() {
		return sr;
	}
	public void setSr(Double sr) {
		this.sr = sr;
	}
	public String getDbrxm() {
		return dbrxm;
	}
	public void setDbrxm(String dbrxm) {
		this.dbrxm = dbrxm;
	}
	public String getYsqrgx() {
		return ysqrgx;
	}
	public void setYsqrgx(String ysqrgx) {
		this.ysqrgx = ysqrgx;
	}
	public Date getDbrcsrq() {
		return dbrcsrq;
	}
	public void setDbrcsrq(Date dbrcsrq) {
		this.dbrcsrq = dbrcsrq;
	}
	public String getDbrsfzh() {
		return dbrsfzh;
	}
	public void setDbrsfzh(String dbrsfzh) {
		this.dbrsfzh = dbrsfzh;
	}
	public String getDbrsj() {
		return dbrsj;
	}
	public void setDbrsj(String dbrsj) {
		this.dbrsj = dbrsj;
	}
	public String getDbrgsmc() {
		return dbrgsmc;
	}
	public void setDbrgsmc(String dbrgsmc) {
		this.dbrgsmc = dbrgsmc;
	}
	public String getDbrgsdh() {
		return dbrgsdh;
	}
	public void setDbrgsdh(String dbrgsdh) {
		this.dbrgsdh = dbrgsdh;
	}
	public String getDbrgsdz() {
		return dbrgsdz;
	}
	public void setDbrgsdz(String dbrgsdz) {
		this.dbrgsdz = dbrgsdz;
	}
	public String getYx() {
		return yx;
	}
	public void setYx(String yx) {
		this.yx = yx;
	}
	public String getZh() {
		return zh;
	}
	public void setZh(String zh) {
		this.zh = zh;
	}
	public String getWydcyy() {
		return wydcyy;
	}
	public void setWydcyy(String wydcyy) {
		this.wydcyy = wydcyy;
	}
	public String getYqyy() {
		return yqyy;
	}
	public void setYqyy(String yqyy) {
		this.yqyy = yqyy;
	}
	public String getDhqk() {
		return dhqk;
	}
	public void setDhqk(String dhqk) {
		this.dhqk = dhqk;
	}
	public String getDhlxr() {
		return dhlxr;
	}
	public void setDhlxr(String dhlxr) {
		this.dhlxr = dhlxr;
	}
	public String getHkqk() {
		return hkqk;
	}
	public void setHkqk(String hkqk) {
		this.hkqk = hkqk;
	}
	public String getHkr() {
		return hkr;
	}
	public void setHkr(String hkr) {
		this.hkr = hkr;
	}
	public String getXxxglb() {
		return xxxglb;
	}
	public void setXxxglb(String xxxglb) {
		this.xxxglb = xxxglb;
	}
	public String getClqk() {
		return clqk;
	}
	public void setClqk(String clqk) {
		this.clqk = clqk;
	}
	public String getKhhztd() {
		return khhztd;
	}
	public void setKhhztd(String khhztd) {
		this.khhztd = khhztd;
	}
	public String getClzt() {
		return clzt;
	}
	public void setClzt(String clzt) {
		this.clzt = clzt;
	}
	public Date getFkuirq() {
		return fkuirq;
	}
	public void setFkuirq(Date fkuirq) {
		this.fkuirq = fkuirq;
	}
	public String getWwjg() {
		return wwjg;
	}
	public void setWwjg(String wwjg) {
		this.wwjg = wwjg;
	}
	public String getPcode() {
		return pcode;
	}
	public void setPcode(String pcode) {
		this.pcode = pcode;
	}
	public String getCcode() {
		return ccode;
	}
	public void setCcode(String ccode) {
		this.ccode = ccode;
	}
	public String getCode() {
		return code;
	}
	public void setCode(String code) {
		this.code = code;
	}
	public void update() {
		this.code = String.format("00%08d", this.getId());
		if (this.wwjg != null && this.wwrq != null){
            SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");  
			this.pch = wwjg + sdf.format(this.wwrq);
		}
	}
	public String getPch() {
		return pch;
	}
	public void setPch(String pch) {
		this.pch = pch;
	}
	public String getWwjig() {
		return wwjig;
	}
	public void setWwjig(String wwjig) {
		this.wwjig = wwjig;
	}
	public Double getWwje() {
		return wwje;
	}
	public void setWwje(Double wwje) {
		this.wwje = wwje;
	}
	public Double getYhje() {
		return yhje;
	}
	public void setYhje(Double yhje) {
		this.yhje = yhje;
	}
	public Double getSyje() {
		return syje;
	}
	public void setSyje(Double syje) {
		this.syje = syje;
	}
}
