package com.example.applicationWare;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Iterator;
import java.util.Map;
import java.util.Map.Entry;
import java.util.Set;

import org.springframework.context.support.ClassPathXmlApplicationContext;

public class MyApplicationAwareTest {

	public static void main(String[] args) throws ParseException {
//		ClassPathXmlApplicationContext apx=new ClassPathXmlApplicationContext("classpath:application-beanfactory.xml");
//		apx.start();
//		MyApplicationContext aware=new MyApplicationContext();
//		aware.getBeanIfType(IBusiness.class);
//		Map<String,Object> map=aware.getObjectMap();
//		Set<Entry<String,Object>> set=map.entrySet();
//		Iterator<Entry<String, Object>> it=set.iterator();
//		while(it.hasNext()){
//			Entry<String,Object> entry=it.next();
//			System.out.println(entry.getKey());
//			System.out.println(entry.getValue());
//		}
		
		SimpleDateFormat formate=new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		String nowdate=formate.format(new Date());
		String dateStr="2017-08-10 15:39:56";
		String dateStr2="2017-08-10 15:39:56";
		Date datepar=formate.parse(dateStr);
		Date datepar2=formate.parse(dateStr);
		System.out.println(dateStr);
		System.out.println("now "+nowdate);
		System.out.println(datepar.compareTo(new Date())==-1);
		System.out.println(datepar.compareTo(datepar2));
	}

}
