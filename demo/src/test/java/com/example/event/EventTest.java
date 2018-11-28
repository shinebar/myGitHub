package com.example.event;

import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;

public class EventTest {

	public static void main(String[] args) {
		ApplicationContext atx=new ClassPathXmlApplicationContext("classpath:application-listener.xml");
		TestEvent ev=new TestEvent("strujgd","hello");
		atx.publishEvent(ev);

	}

}
