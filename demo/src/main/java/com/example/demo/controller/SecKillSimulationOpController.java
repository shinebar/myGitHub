package com.example.demo.controller;

import java.io.BufferedReader;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.net.URI;

import org.springframework.http.HttpMethod;
import org.springframework.http.client.ClientHttpRequest;
import org.springframework.http.client.SimpleClientHttpRequestFactory;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
public class SecKillSimulationOpController {

    final String takeOrderUrl = "http://127.0.0.1:8089/seckill.html";

    /**
     * 模拟并发下单
     */
    @RequestMapping("/simulationCocurrentTakeOrder")
    @ResponseBody
    public String simulationCocurrentTakeOrder() {
        //httpClient工厂
        final SimpleClientHttpRequestFactory httpRequestFactory = new SimpleClientHttpRequestFactory();
        //开50个线程模拟并发秒杀下单
        for (int i = 0; i < 50; i++) {
            //购买人姓名
            final String consumerName = "consumer" + i;
            new Thread(new Runnable() {
                @Override
                public void run() {
                    ClientHttpRequest request = null;
                    try {
                        URI uri = new URI(takeOrderUrl + "?consumer=consumer" + consumerName + "&goodsId=123456&num=1");
                        request = httpRequestFactory.createRequest(uri, HttpMethod.POST);
                        InputStream body = request.execute().getBody();
                        BufferedReader br = new BufferedReader(new InputStreamReader(body));
                        String line = "";
                        String result = "";
                        while ((line = br.readLine()) != null) {
                            result += line;//获得页面内容或返回内容
                        }
                        System.out.println(consumerName+":"+result);
                    } catch (Exception e) {
                        e.printStackTrace();
                    }
                }
            }).start();
        }
        return "simulationCocurrentTakeOrder";
    }

}