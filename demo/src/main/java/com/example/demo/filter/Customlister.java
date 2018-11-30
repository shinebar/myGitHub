package com.example.demo.filter;

import javax.servlet.ServletRequestEvent;
import javax.servlet.ServletRequestListener;
import javax.servlet.annotation.WebListener;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@WebListener
public class Customlister implements ServletRequestListener{
	private  Logger logger=   LoggerFactory.getLogger(Customlister.class);
	 @Override
	    public void requestDestroyed(ServletRequestEvent sre) {
	        logger.info("监听器：销毁");
	    }
	 
	    @Override
	    public void requestInitialized(ServletRequestEvent sre) {
	    	logger.info("监听器：初始化");
	    }
}
