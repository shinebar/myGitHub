package com.example.demo.service.impl;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.CachePut;
import org.springframework.cache.annotation.Cacheable;

import com.example.demo.entity.Account;
import com.google.common.base.Optional;

public class AccountService3{
	 private final Logger logger = LoggerFactory.getLogger(AccountService3.class);
	 
	    // 使用了一个缓存名叫 accountCache
	    @Cacheable(value="accountCache")
	    public Account getAccountByName(String accountName) {
	 
	        // 方法内部实现不考虑缓存逻辑，直接实现业务
	        logger.info("real querying account... {}", accountName);
	        Optional<Account> accountOptional = getFromDB(accountName);
	        if (!accountOptional.isPresent()) {
	            throw new IllegalStateException(String.format("can not find account by account name : [%s]", accountName));
	        }
	 
	        return accountOptional.get();
	    }
	    @CacheEvict(value="accountCache",key="#account.getName()")
	    public void updateAccount(Account account) {
	        updateDB(account);
	    }
	    private Optional<Account> getFromDB(String accountName) {
	        logger.info("real querying db... {}", accountName);
	        //Todo query data from database
	        return Optional.fromNullable(new Account(accountName));
	    }
	    private Optional<Account> getFromDB(String accountName,String password) {
	        logger.info("real querying db... {}", accountName);
	        //Todo query data from database
	        return Optional.fromNullable(new Account(accountName,password));
	    }

		@CacheEvict(value="accountCache",allEntries=true)
		public void reload() {
			// TODO Auto-generated method stub
			
		}
		//号名称的长度小于等于 4 的情况下，才做缓存，大于 4 的不使用缓存
		@Cacheable(value="accountCache",condition="#accountName.length() <= 4")// 缓存名叫 accountCache 
		public Optional<Account> getAccountByNameByCondition(String accountName) {
		    // 方法内部实现不考虑缓存逻辑，直接实现业务
		    return getFromDB(accountName);
		}
		//要求根据账号名、密码和是否发送日志查询账号信息
		@Cacheable(value="accountCache",key="#accountName.concat(#password)") 
		public Optional<Account> getAccount(String accountName,String password,boolean sendLog) { 
		  // 方法内部实现不考虑缓存逻辑，直接实现业务
		  return getFromDB(accountName,password); 
		}
		 // 更新 accountCache 缓存
		 @CachePut(value="accountCache",key="#account.getName()")
		 public Account updateAccountByPut(Account account) { 
		   return updateDB(account); 
		 } 
		 private Account updateDB(Account account) { 
		   logger.info("real updating db..."+account.getName()); 
		   return account; 
		 }
}
