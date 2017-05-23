package com.bank.debt.model.entity;

import javax.persistence.Column;
import javax.persistence.GenerationType;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import com.speed.frame.model.entity.AbstractReadWriteEntity;
import java.io.Serializable;
import javax.persistence.Entity;
import javax.persistence.Table;


@Entity
@Table(name = "areas")
public class AreaEntity extends AbstractReadWriteEntity implements Serializable {
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	@Column(name = "id")
	public int getId() {
		return super.getId();
	}


	String PID;
	String area;
	public String getPID() {
		return PID;
	}
	public void setPID(String pID) {
		PID = pID;
	}
	public String getArea() {
		return area;
	}
	public void setArea(String area) {
		this.area = area;
	}
	
	

}
