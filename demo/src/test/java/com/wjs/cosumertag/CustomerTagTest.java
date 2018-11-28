package com.wjs.cosumertag;

import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;

public class CustomerTagTest {

	public static void main(String[] args) {
		ApplicationContext beans=new ClassPathXmlApplicationContext("classpath:application-customtag.xml");
		User user=(User)beans.getBean("testBean");
		System.out.println("username:"+user.getUserName()+":"+"email:"+user.getEmail());

	}

}
