package com.example.demo.seckill;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.demo.entity.SecKillOrder;

public interface ISecKillOrderDao extends JpaRepository<SecKillOrder, Long> {

	    /*@Query("insert into SecKillOrder values (?1,?2)")
	    @Modifying(clearAutomatically = true)
	    @Transactional
	    int insertOrder(String goodsName,Integer remainNum);*/
}
