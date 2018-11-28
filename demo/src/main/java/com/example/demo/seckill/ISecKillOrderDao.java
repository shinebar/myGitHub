package com.example.demo.seckill;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.transaction.annotation.Transactional;

import com.example.demo.entity.SecKillOrder;

public interface ISecKillOrderDao extends JpaRepository<SecKillOrder, Long> {

	    @Query("insert into SecKillOrder values(?,?,?)")
	    @Modifying(clearAutomatically = true)
	    @Transactional
	    int insertOrder(String id,String goodsName,Integer remainNum);
}
