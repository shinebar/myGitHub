package com.example.spring;

import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;

import com.example.demo.MetaBeanTest;

public class SpringConfigMeta {

	
	public static void main(String args[]){
		ApplicationContext context=new ClassPathXmlApplicationContext("classpath:application-meta.xml");
		MetaBeanTest bean=(MetaBeanTest)context.getBean("metaBeanTest");
	    bean.main();
	}
}
