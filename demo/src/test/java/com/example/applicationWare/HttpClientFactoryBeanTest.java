package com.example.applicationWare;

import javax.annotation.Resource;

import org.apache.http.client.HttpClient;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration(locations="classpath:application-test.xml")
public class HttpClientFactoryBeanTest {

	@Resource
	HttpClient httpClient;
	@Test
	public void main(){
		System.out.println(httpClient.getClass());
	}
}
