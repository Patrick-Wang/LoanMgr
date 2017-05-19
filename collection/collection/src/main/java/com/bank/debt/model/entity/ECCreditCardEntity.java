package com.bank.debt.model.entity;

import javax.persistence.Column;
import javax.persistence.GenerationType;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import com.speed.frame.model.entity.AbstractReadWriteEntity;
import java.io.Serializable;
import java.sql.Date;
import java.sql.Timestamp;
import java.text.SimpleDateFormat;

import javax.persistence.Entity;
import javax.persistence.Table;


@Entity
@Table(name = "entrusted_case_credit_card")
public class ECCreditCardEntity extends AbstractReadWriteEntity implements Serializable {
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
	String wwzt; //未分配、已分配、进行中、已结案
	String wwjig;
	Double wwje;
	Double yhje;
	Double syje;
	Date tarq;
	String	gaxlh		;
	String	xm		;
	String	wtf		;
	String	ajzt		;
	String	zjh		;
	String	zjlx		;
	String	xb		;
	String	cszt		;
	String	wfzt		;
	String	khx		;
	String	kh		;
	String	zh		;
	String	zhmc		;
	String	kl		;
	String	dah		;
	Date	warq		;
	Double	waje		;
	Double	ptpje		;
	Double	cpje		;
	Double	zxqk		;
	String	rmb		;
	String	gb		;
	String	wb		;
	String	csy		;
	String	csyid		;
	String	csybm		;
	String	csqy		;
	String	csxj		;
	String	zhtd		;
	Double	yhk		;
	String	fpls		;
	Timestamp	fpsj		;
	Date	xcgjrq		;
	Integer	gjcs		;
	Double	mzxs		;
	Double	yqzl		;
	String	yx		;
	String	qq		;
	String	sj		;
	String	jthm		;
	String	dwhm		;
	String	dwmc		;
	String	dwdz		;
	String	dwyb		;
	String	jtdz		;
	String	jtyb		;
	String	dzddz		;
	String	dzdyb		;
	String	hjdz		;
	String	hjdyb		;
	String	zw		;
	String	bm		;
	String	sf		;
	String	cs		;
	String	qx		;
	Date	sr		;
	Double	nl		;
	Double	wczje		;
	String  biz;
	String	ycsjl		;
	Double	bj		;
	Double	zdhke		;
	Double	xyed		;
	String	tqjb		;
	String	xdfl		;
	String	csfl		;
	Double	yqlx		;
	Double	znj		;
	Date	zhhkr		;
	Date	zhxfr		;
	Date	zhtxr		;
	Date	tkr		;
	Date	kkr		;
	Double	hkqx		;
	String	lxr1xm		;
	String	lxr1zjh		;
	String	lxr1gx		;
	String	lxr1dw		;
	String	lxr1jtdh		;
	String	lxr1dwdh		;
	String	lxr1sj		;
	String	lxr1dz		;
	String	lxr2xm		;
	String	lxr2zjh		;
	String	lxr2gx		;
	String	lxr2dw		;
	String	lxr2jtdh		;
	String	lxr2dwdh		;
	String	lxr2sj		;
	String	lxr2dz		;
	String	lxr3xm		;
	String	lxr3zjh		;
	String	lxr3gx		;
	String	lxr3dw		;
	String	lxr3jtdh		;
	String	lxr3dwdh		;
	String	lxr3sj		;
	String	lxr3dz		;
	String	lxr4xm		;
	String	lxr4zjh		;
	String	lxr4gx		;
	String	lxr4dw		;
	String	lxr4jtdh		;
	String	lxr4dwdh		;
	String	lxr4sj		;
	String	lxr4dz		;
	String	lxr5xm		;
	String	lxr5zj		;
	String	lxr5gx		;
	String	lxr5dw		;
	String	lxr5jtdh		;
	String	lxr5dwdh		;
	String	lxr5sj		;
	String	lxr5dz		;
	String	lxr6xm		;
	String	lxr6zj		;
	String	lxr6gx		;
	String	lxr6dw		;
	String	lxr6jtdh		;
	String	lxr6dwdh		;
	String	lxr6sj		;
	String	lxr6dz		;
	String	bz1		;
	String	bz2		;
	String	bz3		;
	String	bz4		;
	String	bz5		;
	String	bz6		;
	String	sp		;
	String	sh		;
	Double	zqk		;
	Double	qkye		;
	String	sqdh		;
	Date	yqrq		;
	String	cssb		;
	Double	yqts		;
	Double	wtqx		;
	Integer	waqs		;
	Integer	yhqs		;
	Date	zdr		;
	Double	gded		;
	Double	zdzq		;
	Double	zhhke		;
	Date	yjtar		;
	String	sfzk		;
	String	fkkr		;
	Date	dkrq		;
	Double	sybj		;
	Integer	yqqs		;
	Integer	zyqcs		;
	Double	dkll		;
	Double	myhk		;
	Double	yqje		;
	Double	yqbj		;
	Double	yqfx		;
	Double	yqglf		;
	Double	wyj		;
	Double	cxf		;
	Date	dkjzr		;
	Double	bzj		;
	String	sbdnh		;
	String	sbkh		;
	Date	sjtar		;
	String	cx		;
	String	pzh		;
	String	cjh		;
	String	jg		;
	String	zdyxx		;
	String	zxcj		;

	public String getGaxlh() {
		return gaxlh;
	}
	public void setGaxlh(String gaxlh) {
		this.gaxlh = gaxlh;
	}
	public String getXm() {
		return xm;
	}
	public void setXm(String xm) {
		this.xm = xm;
	}
	public String getWtf() {
		return wtf;
	}
	public void setWtf(String wtf) {
		this.wtf = wtf;
	}
	public String getPch() {
		return pch;
	}
	public void setPch(String pch) {
		this.pch = pch;
	}
	public String getAjzt() {
		return ajzt;
	}
	public void setAjzt(String ajzt) {
		this.ajzt = ajzt;
	}
	public String getZjh() {
		return zjh;
	}
	public void setZjh(String zjh) {
		this.zjh = zjh;
	}
	public String getZjlx() {
		return zjlx;
	}
	public void setZjlx(String zjlx) {
		this.zjlx = zjlx;
	}
	public String getXb() {
		return xb;
	}
	public void setXb(String xb) {
		this.xb = xb;
	}
	public String getCszt() {
		return cszt;
	}
	public void setCszt(String cszt) {
		this.cszt = cszt;
	}
	public String getWfzt() {
		return wfzt;
	}
	public void setWfzt(String wfzt) {
		this.wfzt = wfzt;
	}
	public String getKhx() {
		return khx;
	}
	public void setKhx(String khx) {
		this.khx = khx;
	}
	public String getKh() {
		return kh;
	}
	public void setKh(String kh) {
		this.kh = kh;
	}
	public String getZh() {
		return zh;
	}
	public void setZh(String zh) {
		this.zh = zh;
	}
	public String getZhmc() {
		return zhmc;
	}
	public void setZhmc(String zhmc) {
		this.zhmc = zhmc;
	}
	public String getKl() {
		return kl;
	}
	public void setKl(String kl) {
		this.kl = kl;
	}
	public String getDah() {
		return dah;
	}
	public void setDah(String dah) {
		this.dah = dah;
	}
	public Date getWarq() {
		return warq;
	}
	public void setWarq(Date warq) {
		this.warq = warq;
	}
	public Double getWaje() {
		return waje;
	}
	public void setWaje(Double waje) {
		this.waje = waje;
	}
	public Double getPtpje() {
		return ptpje;
	}
	public void setPtpje(Double ptpje) {
		this.ptpje = ptpje;
	}
	public Double getCpje() {
		return cpje;
	}
	public void setCpje(Double cpje) {
		this.cpje = cpje;
	}
	public Double getZxqk() {
		return zxqk;
	}
	public void setZxqk(Double zxqk) {
		this.zxqk = zxqk;
	}
	public String getRmb() {
		return rmb;
	}
	public void setRmb(String rmb) {
		this.rmb = rmb;
	}
	public String getGb() {
		return gb;
	}
	public void setGb(String gb) {
		this.gb = gb;
	}
	public String getWb() {
		return wb;
	}
	public void setWb(String wb) {
		this.wb = wb;
	}
	public String getCsy() {
		return csy;
	}
	public void setCsy(String csy) {
		this.csy = csy;
	}
	public String getCsyid() {
		return csyid;
	}
	public void setCsyid(String csyid) {
		this.csyid = csyid;
	}
	public String getCsybm() {
		return csybm;
	}
	public void setCsybm(String csybm) {
		this.csybm = csybm;
	}
	public String getCsqy() {
		return csqy;
	}
	public void setCsqy(String csqy) {
		this.csqy = csqy;
	}
	public String getCsxj() {
		return csxj;
	}
	public void setCsxj(String csxj) {
		this.csxj = csxj;
	}
	public String getZhtd() {
		return zhtd;
	}
	public void setZhtd(String zhtd) {
		this.zhtd = zhtd;
	}
	public Double getYhk() {
		return yhk;
	}
	public void setYhk(Double yhk) {
		this.yhk = yhk;
	}
	public String getFpls() {
		return fpls;
	}
	public void setFpls(String fpls) {
		this.fpls = fpls;
	}
	public Timestamp getFpsj() {
		return fpsj;
	}
	public void setFpsj(Timestamp fpsj) {
		this.fpsj = fpsj;
	}
	public Date getXcgjrq() {
		return xcgjrq;
	}
	public void setXcgjrq(Date xcgjrq) {
		this.xcgjrq = xcgjrq;
	}
	public Integer getGjcs() {
		return gjcs;
	}
	public void setGjcs(Integer gjcs) {
		this.gjcs = gjcs;
	}
	public Double getMzxs() {
		return mzxs;
	}
	public void setMzxs(Double mzxs) {
		this.mzxs = mzxs;
	}
	public Double getYqzl() {
		return yqzl;
	}
	public void setYqzl(Double yqzl) {
		this.yqzl = yqzl;
	}
	public String getYx() {
		return yx;
	}
	public void setYx(String yx) {
		this.yx = yx;
	}
	public String getQq() {
		return qq;
	}
	public void setQq(String qq) {
		this.qq = qq;
	}
	public String getSj() {
		return sj;
	}
	public void setSj(String sj) {
		this.sj = sj;
	}
	public String getJthm() {
		return jthm;
	}
	public void setJthm(String jthm) {
		this.jthm = jthm;
	}
	public String getDwhm() {
		return dwhm;
	}
	public void setDwhm(String dwhm) {
		this.dwhm = dwhm;
	}
	public String getDwmc() {
		return dwmc;
	}
	public void setDwmc(String dwmc) {
		this.dwmc = dwmc;
	}
	public String getDwdz() {
		return dwdz;
	}
	public void setDwdz(String dwdz) {
		this.dwdz = dwdz;
	}
	public String getDwyb() {
		return dwyb;
	}
	public void setDwyb(String dwyb) {
		this.dwyb = dwyb;
	}
	public String getJtdz() {
		return jtdz;
	}
	public void setJtdz(String jtdz) {
		this.jtdz = jtdz;
	}
	public String getJtyb() {
		return jtyb;
	}
	public void setJtyb(String jtyb) {
		this.jtyb = jtyb;
	}
	public String getDzddz() {
		return dzddz;
	}
	public void setDzddz(String dzddz) {
		this.dzddz = dzddz;
	}
	public String getDzdyb() {
		return dzdyb;
	}
	public void setDzdyb(String dzdyb) {
		this.dzdyb = dzdyb;
	}
	public String getHjdz() {
		return hjdz;
	}
	public void setHjdz(String hjdz) {
		this.hjdz = hjdz;
	}
	public String getHjdyb() {
		return hjdyb;
	}
	public void setHjdyb(String hjdyb) {
		this.hjdyb = hjdyb;
	}
	public String getZw() {
		return zw;
	}
	public void setZw(String zw) {
		this.zw = zw;
	}
	public String getBm() {
		return bm;
	}
	public void setBm(String bm) {
		this.bm = bm;
	}
	public String getSf() {
		return sf;
	}
	public void setSf(String sf) {
		this.sf = sf;
	}
	public String getCs() {
		return cs;
	}
	public void setCs(String cs) {
		this.cs = cs;
	}
	public String getQx() {
		return qx;
	}
	public void setQx(String qx) {
		this.qx = qx;
	}
	public Date getSr() {
		return sr;
	}
	public void setSr(Date sr) {
		this.sr = sr;
	}
	public Double getNl() {
		return nl;
	}
	public void setNl(Double nl) {
		this.nl = nl;
	}
	public Double getWczje() {
		return wczje;
	}
	public void setWczje(Double wczje) {
		this.wczje = wczje;
	}
	public String getBiz() {
		return biz;
	}
	public void setBiz(String biz) {
		this.biz = biz;
	}
	public String getYcsjl() {
		return ycsjl;
	}
	public void setYcsjl(String ycsjl) {
		this.ycsjl = ycsjl;
	}
	public Double getBj() {
		return bj;
	}
	public void setBj(Double bj) {
		this.bj = bj;
	}
	public Double getZdhke() {
		return zdhke;
	}
	public void setZdhke(Double zdhke) {
		this.zdhke = zdhke;
	}
	public Double getXyed() {
		return xyed;
	}
	public void setXyed(Double xyed) {
		this.xyed = xyed;
	}
	public String getTqjb() {
		return tqjb;
	}
	public void setTqjb(String tqjb) {
		this.tqjb = tqjb;
	}
	public String getXdfl() {
		return xdfl;
	}
	public void setXdfl(String xdfl) {
		this.xdfl = xdfl;
	}
	public String getCsfl() {
		return csfl;
	}
	public void setCsfl(String csfl) {
		this.csfl = csfl;
	}
	public Double getYqlx() {
		return yqlx;
	}
	public void setYqlx(Double yqlx) {
		this.yqlx = yqlx;
	}
	public Double getZnj() {
		return znj;
	}
	public void setZnj(Double znj) {
		this.znj = znj;
	}
	public Date getZhhkr() {
		return zhhkr;
	}
	public void setZhhkr(Date zhhkr) {
		this.zhhkr = zhhkr;
	}
	public Date getZhxfr() {
		return zhxfr;
	}
	public void setZhxfr(Date zhxfr) {
		this.zhxfr = zhxfr;
	}
	public Date getZhtxr() {
		return zhtxr;
	}
	public void setZhtxr(Date zhtxr) {
		this.zhtxr = zhtxr;
	}
	public Date getTkr() {
		return tkr;
	}
	public void setTkr(Date tkr) {
		this.tkr = tkr;
	}
	public Date getKkr() {
		return kkr;
	}
	public void setKkr(Date kkr) {
		this.kkr = kkr;
	}
	public Double getHkqx() {
		return hkqx;
	}
	public void setHkqx(Double hkqx) {
		this.hkqx = hkqx;
	}
	public String getLxr1xm() {
		return lxr1xm;
	}
	public void setLxr1xm(String lxr1xm) {
		this.lxr1xm = lxr1xm;
	}
	public String getLxr1zjh() {
		return lxr1zjh;
	}
	public void setLxr1zjh(String lxr1zjh) {
		this.lxr1zjh = lxr1zjh;
	}
	public String getLxr1gx() {
		return lxr1gx;
	}
	public void setLxr1gx(String lxr1gx) {
		this.lxr1gx = lxr1gx;
	}
	public String getLxr1dw() {
		return lxr1dw;
	}
	public void setLxr1dw(String lxr1dw) {
		this.lxr1dw = lxr1dw;
	}
	public String getLxr1jtdh() {
		return lxr1jtdh;
	}
	public void setLxr1jtdh(String lxr1jtdh) {
		this.lxr1jtdh = lxr1jtdh;
	}
	public String getLxr1dwdh() {
		return lxr1dwdh;
	}
	public void setLxr1dwdh(String lxr1dwdh) {
		this.lxr1dwdh = lxr1dwdh;
	}
	public String getLxr1sj() {
		return lxr1sj;
	}
	public void setLxr1sj(String lxr1sj) {
		this.lxr1sj = lxr1sj;
	}
	public String getLxr1dz() {
		return lxr1dz;
	}
	public void setLxr1dz(String lxr1dz) {
		this.lxr1dz = lxr1dz;
	}
	public String getLxr2xm() {
		return lxr2xm;
	}
	public void setLxr2xm(String lxr2xm) {
		this.lxr2xm = lxr2xm;
	}
	public String getLxr2zjh() {
		return lxr2zjh;
	}
	public void setLxr2zjh(String lxr2zjh) {
		this.lxr2zjh = lxr2zjh;
	}
	public String getLxr2gx() {
		return lxr2gx;
	}
	public void setLxr2gx(String lxr2gx) {
		this.lxr2gx = lxr2gx;
	}
	public String getLxr2dw() {
		return lxr2dw;
	}
	public void setLxr2dw(String lxr2dw) {
		this.lxr2dw = lxr2dw;
	}
	public String getLxr2jtdh() {
		return lxr2jtdh;
	}
	public void setLxr2jtdh(String lxr2jtdh) {
		this.lxr2jtdh = lxr2jtdh;
	}
	public String getLxr2dwdh() {
		return lxr2dwdh;
	}
	public void setLxr2dwdh(String lxr2dwdh) {
		this.lxr2dwdh = lxr2dwdh;
	}
	public String getLxr2sj() {
		return lxr2sj;
	}
	public void setLxr2sj(String lxr2sj) {
		this.lxr2sj = lxr2sj;
	}
	public String getLxr2dz() {
		return lxr2dz;
	}
	public void setLxr2dz(String lxr2dz) {
		this.lxr2dz = lxr2dz;
	}
	public String getLxr3xm() {
		return lxr3xm;
	}
	public void setLxr3xm(String lxr3xm) {
		this.lxr3xm = lxr3xm;
	}
	public String getLxr3zjh() {
		return lxr3zjh;
	}
	public void setLxr3zjh(String lxr3zjh) {
		this.lxr3zjh = lxr3zjh;
	}
	public String getLxr3gx() {
		return lxr3gx;
	}
	public void setLxr3gx(String lxr3gx) {
		this.lxr3gx = lxr3gx;
	}
	public String getLxr3dw() {
		return lxr3dw;
	}
	public void setLxr3dw(String lxr3dw) {
		this.lxr3dw = lxr3dw;
	}
	public String getLxr3jtdh() {
		return lxr3jtdh;
	}
	public void setLxr3jtdh(String lxr3jtdh) {
		this.lxr3jtdh = lxr3jtdh;
	}
	public String getLxr3dwdh() {
		return lxr3dwdh;
	}
	public void setLxr3dwdh(String lxr3dwdh) {
		this.lxr3dwdh = lxr3dwdh;
	}
	public String getLxr3sj() {
		return lxr3sj;
	}
	public void setLxr3sj(String lxr3sj) {
		this.lxr3sj = lxr3sj;
	}
	public String getLxr3dz() {
		return lxr3dz;
	}
	public void setLxr3dz(String lxr3dz) {
		this.lxr3dz = lxr3dz;
	}
	public String getLxr4xm() {
		return lxr4xm;
	}
	public void setLxr4xm(String lxr4xm) {
		this.lxr4xm = lxr4xm;
	}
	public String getLxr4zjh() {
		return lxr4zjh;
	}
	public void setLxr4zjh(String lxr4zjh) {
		this.lxr4zjh = lxr4zjh;
	}
	public String getLxr4gx() {
		return lxr4gx;
	}
	public void setLxr4gx(String lxr4gx) {
		this.lxr4gx = lxr4gx;
	}
	public String getLxr4dw() {
		return lxr4dw;
	}
	public void setLxr4dw(String lxr4dw) {
		this.lxr4dw = lxr4dw;
	}
	public String getLxr4jtdh() {
		return lxr4jtdh;
	}
	public void setLxr4jtdh(String lxr4jtdh) {
		this.lxr4jtdh = lxr4jtdh;
	}
	public String getLxr4dwdh() {
		return lxr4dwdh;
	}
	public void setLxr4dwdh(String lxr4dwdh) {
		this.lxr4dwdh = lxr4dwdh;
	}
	public String getLxr4sj() {
		return lxr4sj;
	}
	public void setLxr4sj(String lxr4sj) {
		this.lxr4sj = lxr4sj;
	}
	public String getLxr4dz() {
		return lxr4dz;
	}
	public void setLxr4dz(String lxr4dz) {
		this.lxr4dz = lxr4dz;
	}
	public String getLxr5xm() {
		return lxr5xm;
	}
	public void setLxr5xm(String lxr5xm) {
		this.lxr5xm = lxr5xm;
	}
	public String getLxr5zj() {
		return lxr5zj;
	}
	public void setLxr5zj(String lxr5zj) {
		this.lxr5zj = lxr5zj;
	}
	public String getLxr5gx() {
		return lxr5gx;
	}
	public void setLxr5gx(String lxr5gx) {
		this.lxr5gx = lxr5gx;
	}
	public String getLxr5dw() {
		return lxr5dw;
	}
	public void setLxr5dw(String lxr5dw) {
		this.lxr5dw = lxr5dw;
	}
	public String getLxr5jtdh() {
		return lxr5jtdh;
	}
	public void setLxr5jtdh(String lxr5jtdh) {
		this.lxr5jtdh = lxr5jtdh;
	}
	public String getLxr5dwdh() {
		return lxr5dwdh;
	}
	public void setLxr5dwdh(String lxr5dwdh) {
		this.lxr5dwdh = lxr5dwdh;
	}
	public String getLxr5sj() {
		return lxr5sj;
	}
	public void setLxr5sj(String lxr5sj) {
		this.lxr5sj = lxr5sj;
	}
	public String getLxr5dz() {
		return lxr5dz;
	}
	public void setLxr5dz(String lxr5dz) {
		this.lxr5dz = lxr5dz;
	}
	public String getLxr6xm() {
		return lxr6xm;
	}
	public void setLxr6xm(String lxr6xm) {
		this.lxr6xm = lxr6xm;
	}
	public String getLxr6zj() {
		return lxr6zj;
	}
	public void setLxr6zj(String lxr6zj) {
		this.lxr6zj = lxr6zj;
	}
	public String getLxr6gx() {
		return lxr6gx;
	}
	public void setLxr6gx(String lxr6gx) {
		this.lxr6gx = lxr6gx;
	}
	public String getLxr6dw() {
		return lxr6dw;
	}
	public void setLxr6dw(String lxr6dw) {
		this.lxr6dw = lxr6dw;
	}
	public String getLxr6jtdh() {
		return lxr6jtdh;
	}
	public void setLxr6jtdh(String lxr6jtdh) {
		this.lxr6jtdh = lxr6jtdh;
	}
	public String getLxr6dwdh() {
		return lxr6dwdh;
	}
	public void setLxr6dwdh(String lxr6dwdh) {
		this.lxr6dwdh = lxr6dwdh;
	}
	public String getLxr6sj() {
		return lxr6sj;
	}
	public void setLxr6sj(String lxr6sj) {
		this.lxr6sj = lxr6sj;
	}
	public String getLxr6dz() {
		return lxr6dz;
	}
	public void setLxr6dz(String lxr6dz) {
		this.lxr6dz = lxr6dz;
	}
	public String getBz1() {
		return bz1;
	}
	public void setBz1(String bz1) {
		this.bz1 = bz1;
	}
	public String getBz2() {
		return bz2;
	}
	public void setBz2(String bz2) {
		this.bz2 = bz2;
	}
	public String getBz3() {
		return bz3;
	}
	public void setBz3(String bz3) {
		this.bz3 = bz3;
	}
	public String getBz4() {
		return bz4;
	}
	public void setBz4(String bz4) {
		this.bz4 = bz4;
	}
	public String getBz5() {
		return bz5;
	}
	public void setBz5(String bz5) {
		this.bz5 = bz5;
	}
	public String getBz6() {
		return bz6;
	}
	public void setBz6(String bz6) {
		this.bz6 = bz6;
	}
	public String getSp() {
		return sp;
	}
	public void setSp(String sp) {
		this.sp = sp;
	}
	public String getSh() {
		return sh;
	}
	public void setSh(String sh) {
		this.sh = sh;
	}
	public String getCode() {
		return code;
	}
	public void setCode(String code) {
		this.code = code;
	}
	public void update() {
		this.code = String.format("00%08d", this.getId());
		if (this.wwjig != null && this.wwrq != null){
            SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");  
			this.pch = wwjig + sdf.format(this.wwrq);
		}
	}
	public Date getWwrq() {
		return wwrq;
	}
	public void setWwrq(Date wwrq) {
		this.wwrq = wwrq;
	}
	public String getWwzt() {
		return wwzt;
	}
	public void setWwzt(String wwzt) {
		this.wwzt = wwzt;
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
	public Double getZqk() {
		return zqk;
	}
	public void setZqk(Double zqk) {
		this.zqk = zqk;
	}
	public Double getQkye() {
		return qkye;
	}
	public void setQkye(Double qkye) {
		this.qkye = qkye;
	}
	public String getSqdh() {
		return sqdh;
	}
	public void setSqdh(String sqdh) {
		this.sqdh = sqdh;
	}
	public Date getYqrq() {
		return yqrq;
	}
	public void setYqrq(Date yqrq) {
		this.yqrq = yqrq;
	}
	public String getCssb() {
		return cssb;
	}
	public void setCssb(String cssb) {
		this.cssb = cssb;
	}
	public Double getYqts() {
		return yqts;
	}
	public void setYqts(Double yqts) {
		this.yqts = yqts;
	}
	public Double getWtqx() {
		return wtqx;
	}
	public void setWtqx(Double wtqx) {
		this.wtqx = wtqx;
	}
	public Integer getWaqs() {
		return waqs;
	}
	public void setWaqs(Integer waqs) {
		this.waqs = waqs;
	}
	public Integer getYhqs() {
		return yhqs;
	}
	public void setYhqs(Integer yhqs) {
		this.yhqs = yhqs;
	}
	public Date getZdr() {
		return zdr;
	}
	public void setZdr(Date zdr) {
		this.zdr = zdr;
	}
	public Double getGded() {
		return gded;
	}
	public void setGded(Double gded) {
		this.gded = gded;
	}
	public Double getZdzq() {
		return zdzq;
	}
	public void setZdzq(Double zdzq) {
		this.zdzq = zdzq;
	}
	public Double getZhhke() {
		return zhhke;
	}
	public void setZhhke(Double zhhke) {
		this.zhhke = zhhke;
	}
	public Date getYjtar() {
		return yjtar;
	}
	public void setYjtar(Date yjtar) {
		this.yjtar = yjtar;
	}
	public String getSfzk() {
		return sfzk;
	}
	public void setSfzk(String sfzk) {
		this.sfzk = sfzk;
	}
	public String getFkkr() {
		return fkkr;
	}
	public void setFkkr(String fkkr) {
		this.fkkr = fkkr;
	}
	public Date getDkrq() {
		return dkrq;
	}
	public void setDkrq(Date dkrq) {
		this.dkrq = dkrq;
	}
	public Double getSybj() {
		return sybj;
	}
	public void setSybj(Double sybj) {
		this.sybj = sybj;
	}
	public Integer getYqqs() {
		return yqqs;
	}
	public void setYqqs(Integer yqqs) {
		this.yqqs = yqqs;
	}
	public Integer getZyqcs() {
		return zyqcs;
	}
	public void setZyqcs(Integer zyqcs) {
		this.zyqcs = zyqcs;
	}
	public Double getDkll() {
		return dkll;
	}
	public void setDkll(Double dkll) {
		this.dkll = dkll;
	}
	public Double getMyhk() {
		return myhk;
	}
	public void setMyhk(Double myhk) {
		this.myhk = myhk;
	}
	public Double getYqje() {
		return yqje;
	}
	public void setYqje(Double yqje) {
		this.yqje = yqje;
	}
	public Double getYqbj() {
		return yqbj;
	}
	public void setYqbj(Double yqbj) {
		this.yqbj = yqbj;
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
	public Double getWyj() {
		return wyj;
	}
	public void setWyj(Double wyj) {
		this.wyj = wyj;
	}
	public Double getCxf() {
		return cxf;
	}
	public void setCxf(Double cxf) {
		this.cxf = cxf;
	}
	public Date getDkjzr() {
		return dkjzr;
	}
	public void setDkjzr(Date dkjzr) {
		this.dkjzr = dkjzr;
	}
	public Double getBzj() {
		return bzj;
	}
	public void setBzj(Double bzj) {
		this.bzj = bzj;
	}
	public String getSbdnh() {
		return sbdnh;
	}
	public void setSbdnh(String sbdnh) {
		this.sbdnh = sbdnh;
	}
	public String getSbkh() {
		return sbkh;
	}
	public void setSbkh(String sbkh) {
		this.sbkh = sbkh;
	}
	public Date getSjtar() {
		return sjtar;
	}
	public void setSjtar(Date sjtar) {
		this.sjtar = sjtar;
	}
	public String getCx() {
		return cx;
	}
	public void setCx(String cx) {
		this.cx = cx;
	}
	public String getPzh() {
		return pzh;
	}
	public void setPzh(String pzh) {
		this.pzh = pzh;
	}
	public String getCjh() {
		return cjh;
	}
	public void setCjh(String cjh) {
		this.cjh = cjh;
	}
	public String getJg() {
		return jg;
	}
	public void setJg(String jg) {
		this.jg = jg;
	}
	public String getZdyxx() {
		return zdyxx;
	}
	public void setZdyxx(String zdyxx) {
		this.zdyxx = zdyxx;
	}
	public String getZxcj() {
		return zxcj;
	}
	public void setZxcj(String zxcj) {
		this.zxcj = zxcj;
	}
	public Date getTarq() {
		return tarq;
	}
	public void setTarq(Date tarq) {
		this.tarq = tarq;
	}
	public Double getSyje() {
		return syje;
	}
	public void setSyje(Double syje) {
		this.syje = syje;
	}
}
