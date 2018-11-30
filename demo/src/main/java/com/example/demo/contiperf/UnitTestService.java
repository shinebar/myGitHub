package com.example.demo.contiperf;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.seckill.ISecKillGoodsDao;
import com.example.demo.seckill.SecKillService;

@Service
public class UnitTestService implements IUnitTestService{

	@Autowired
    ISecKillGoodsDao secKillGoodsDao;
    @Autowired
    SecKillService secKillService;
   
	@Override
	public String process(String msg) {
		//先减去库存
        secKillGoodsDao.reduceStock("123456",1);
        //保存订单
        secKillService.generateOrder("ddds","dd",1);
		return "dma";
	}

}
