package com.example.jmx;

import java.util.concurrent.ConcurrentHashMap;

public class Hello implements HelloMBean {
    private String name;
    @Override
    public String getName() {
        return name;
    }
 
    @Override
    public void setName(String name) {
        this.name = name;
    }
 
    @Override
    public void printHello() {
        System.out.println("Hello world, "+ name);
    }
 
    @Override
    public void printHello(String whoName) {
        System.out.println("Hello, "+whoName);
    }
    
    public static void main(String[] args) {
		System.out.println("ddd");
		//查看源码，实现原理
		ConcurrentHashMap map=new ConcurrentHashMap();
		
		System.out.println(System.getProperty("os.arch"));
		System.out.println(System.getProperty("os.name"));
		System.out.println(System.getProperty("java.vendor"));
		System.out.println(System.getProperty("java.version"));
	}
}
