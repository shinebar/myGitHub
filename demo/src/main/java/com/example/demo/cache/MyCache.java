package com.example.demo.cache;

import java.util.HashMap;
import java.util.Map;
import java.util.concurrent.Callable;

import org.springframework.cache.Cache;
import org.springframework.cache.support.SimpleValueWrapper;

import com.example.demo.entity.Account;

public class MyCache implements Cache{
	private String name; 
	   private Map<String,Account> store = new HashMap<String,Account>();; 
	 
	   public MyCache() { 
	   } 
	 
	   public MyCache(String name) { 
	     this.name = name; 
	   } 
	 
	   @Override
	   public String getName() { 
	     return name; 
	   } 
	 
	   public void setName(String name) { 
	     this.name = name; 
	   } 
	 
	   @Override
	   public Object getNativeCache() { 
	     return store; 
	   } 
	 
	   @Override
	   public ValueWrapper get(Object key) { 
	     ValueWrapper result = null; 
	     Account thevalue = store.get(key); 
	     if(thevalue!=null) { 
	       thevalue.setPassword("from mycache:"+name); 
	       result = new SimpleValueWrapper(thevalue); 
	     } 
	     return result; 
	   } 
	 
	   @Override
	   public void put(Object key, Object value) { 
	     Account thevalue = (Account)value; 
	     store.put((String)key, thevalue); 
	   } 
	 
	   @Override
	   public void evict(Object key) { 
	   } 
	 
	   @Override
	   public void clear() { 
	   }

	@Override
	public <T> T get(Object key, Class<T> type) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public <T> T get(Object key, Callable<T> valueLoader) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public ValueWrapper putIfAbsent(Object key, Object value) {
		// TODO Auto-generated method stub
		return null;
	} 
}
