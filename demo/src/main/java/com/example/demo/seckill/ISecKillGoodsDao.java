package com.example.demo.seckill;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.transaction.annotation.Transactional;

import com.example.demo.entity.SecKillGoods;

public interface ISecKillGoodsDao extends JpaRepository<SecKillGoods,String>{
	 
    @Query("update SecKillGoods g set g.remainNum = g.remainNum - ?2 where g.id = ?1 and g.remainNum>0")
    @Modifying(clearAutomatically = true)
    @Transactional
    int reduceStock(String id,Integer remainNum);
 
}
