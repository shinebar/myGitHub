package com.example.demo.entity;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;

import org.hibernate.annotations.GenericGenerator;

@Entity
@Table(name = "t_sec_kill_order")
public class SecKillOrder implements Serializable {
	
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	public SecKillOrder() {}

	public SecKillOrder(String consumer, String goodsId, Integer num) {
		this.consumer=consumer;
		this.goodsId=goodsId;
		this.num=num;
	}

	@Id
	@GenericGenerator(name = "PKUUID", strategy = "uuid2")
	@GeneratedValue(generator = "PKUUID")
	@Column(length = 36)
	private String id;
	// 用户名称
	@Column(nullable=false)
	private String consumer;
	
	// 秒杀产品编号
	@Column(nullable=false)
	private String goodsId;

	// 购买数量
	@Column(nullable=false)
	private Integer num;

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public String getConsumer() {
		return consumer;
	}

	public void setConsumer(String consumer) {
		this.consumer = consumer;
	}

	public String getGoodsId() {
		return goodsId;
	}

	public void setGoodsId(String goodsId) {
		this.goodsId = goodsId;
	}

	public Integer getNum() {
		return num;
	}

	public void setNum(Integer num) {
		this.num = num;
	}

	@Override
	public String toString() {
		return "SecKillOrder [id=" + id + ", consumer=" + consumer + ", goodsId=" + goodsId + ", num=" + num + "]";
	}
	
}
