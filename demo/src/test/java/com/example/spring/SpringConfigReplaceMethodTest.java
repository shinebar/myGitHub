package com.example.spring;

import org.springframework.beans.factory.support.GenericBeanDefinition;
import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;

import com.example.demo.ReplaceMethodBean;

public class SpringConfigReplaceMethodTest {

	
	public static void main(String args[]){
		ApplicationContext context=new ClassPathXmlApplicationContext("classpath:application-replaceMehod.xml");
		ReplaceMethodBean bean=(ReplaceMethodBean)context.getBean("replaceMethodBean");
		GenericBeanDefinition gbd=new GenericBeanDefinition();
		String parentName=gbd.getParentName();
		System.out.println(parentName);
	    bean.changeMe();
	}

}
