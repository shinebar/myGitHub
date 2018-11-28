package com.example.applicationWare;

import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

import org.springframework.beans.BeansException;
import org.springframework.context.ApplicationContext;
import org.springframework.context.ApplicationContextAware;

public class MyApplicationContext implements ApplicationContextAware{

	public static Map<String,Object> objectMap=new ConcurrentHashMap<>();
	private  volatile static ApplicationContext appContext;
	@SuppressWarnings("static-access")
	@Override
	public void setApplicationContext(ApplicationContext applicationContext) throws BeansException {
		this.appContext=applicationContext;
	}
	
	public Object getBean(String name){
		Object beanObj=appContext.getBean(name);
		return beanObj;
	}
	
	public void getBeanIfType(Class clazz){
		this.objectMap=(Map<String,Object>)appContext.getBeansOfType(clazz);
	}

	public static Map<String, Object> getObjectMap() {
		return objectMap;
	}
		

}
