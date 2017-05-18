package com.bank.debt.protocol.entity;

import java.io.IOException;

import com.bank.debt.protocol.tools.JsonUtil;

import net.sf.json.JSONObject;

public class ManagerSummary  extends ProtocolEntityImpl{

	Double ljje;
	Double yhje;
	Integer ygs;
	
	
	@Override
	public ProtocolEntity fromJson(JSONObject jo) throws IOException {
		return (ProtocolEntity) JsonUtil.toObject(jo, this, null);
	}


	public Double getLjje() {
		return ljje;
	}


	public void setLjje(Double ljje) {
		this.ljje = ljje;
	}





	public Integer getYgs() {
		return ygs;
	}


	public void setYgs(Integer ygs) {
		this.ygs = ygs;
	}


	public Double getYhje() {
		return yhje;
	}


	public void setYhje(Double yhje) {
		this.yhje = yhje;
	}

}
