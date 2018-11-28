package com.example.demo.entity;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;


@Entity
@Table(name = "T_SEC_KILL_GOODS")
public class SecKillGoods implements Serializable {
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue
	private String id;

	/**
	 * 剩余库存
	 */
	@Column(nullable=false)
	private Integer remainNum;

	/**
	 * 秒杀商品名称
	 */
	@Column(nullable=false)
	private String goodsName;


	public void setRemainNum(Integer remainNum) {
		this.remainNum = remainNum;
	}
	public String getId() {
		return id;
	}
	public void setId(String string) {
		
	}
	public String getGoodsName() {
		return goodsName;
	}

	public void setGoodsName(String string) {
		
	}

	public void setRemainNum(int i) {
		
	}
	public Integer getRemainNum() {
		return remainNum;
	}
}
