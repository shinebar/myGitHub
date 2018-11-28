package com.example.demo.entity;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;

import org.hibernate.annotations.GenericGenerator;


@Entity
@Table(name = "t_sec_kill_goods")
public class SecKillGoods implements Serializable {
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	@Id
	@GenericGenerator(name = "PKUUID", strategy = "uuid2")
	@GeneratedValue(generator = "PKUUID")
	@Column(length = 36)
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

	
	public SecKillGoods() {
	}
	public SecKillGoods(String id, Integer remainNum) {
		super();
		this.id = id;
		this.remainNum = remainNum;
	}
	public SecKillGoods(String id, String goodsName,Integer remainNum) {
		super();
		this.id = id;
		this.remainNum = remainNum;
		this.goodsName = goodsName;
	}
	public void setRemainNum(Integer remainNum) {
		this.remainNum = remainNum;
	}
	public String getId() {
		return id;
	}
	public void setId(String id) {
		this.id=id;
	}
	public String getGoodsName() {
		return goodsName;
	}

	public void setGoodsName(String goodsName) {
		this.goodsName=goodsName;
	}

	public void setRemainNum(int remainNum) {
		this.remainNum=remainNum;
	}
	public Integer getRemainNum() {
		return remainNum;
	}
	@Override
	public String toString() {
		return "SecKillGoods [id=" + id + ", remainNum=" + remainNum + ", goodsName=" + goodsName + "]";
	}
	
}
