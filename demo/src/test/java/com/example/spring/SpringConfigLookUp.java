package com.example.spring;

import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;

public class SpringConfigLookUp {

	
	public static void main(String args[]){
		ApplicationContext context=new ClassPathXmlApplicationContext("classpath:application-lookup.xml");
		GetLookUpBeanTest bean=(GetLookUpBeanTest)context.getBean("getLookUpBeanTest");
		bean.showMe();
	}
}
