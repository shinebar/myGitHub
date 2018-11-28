package com.example.demo.service.impl;

import javax.annotation.Resource;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import com.example.demo.cache.CacheContext;
import com.example.demo.entity.Account;
import com.example.demo.service.IAccountService1;
import com.google.common.base.Optional;

@Service
public class AccountService1 implements IAccountService1 {
	private final Logger logger = LoggerFactory.getLogger(AccountService1.class);
	 
	@Resource
    private CacheContext<Account> accountCacheContext;
 
    /* (non-Javadoc)
	 * @see com.example.demo.service.IAccountService1#getAccountByName(java.lang.String)
	 */
    @Override
	public Account getAccountByName(String accountName) {
        Account result = accountCacheContext.get(accountName);
        if (result != null) {
            logger.info("get from cache... {}", accountName);
            return result;
        }
 
        Optional<Account> accountOptional = getFromDB(accountName);
        if (!accountOptional.isPresent()) {
            throw new IllegalStateException(String.format("can not find account by account name : [%s]", accountName));
        }
 
        Account account = accountOptional.get();
        accountCacheContext.addOrUpdateCache(accountName, account);
        return account;
    }
 
    /* (non-Javadoc)
	 * @see com.example.demo.service.IAccountService1#reload()
	 */
    @Override
	public void reload() {
        accountCacheContext.evictCache();
    }
 
    private Optional<Account> getFromDB(String accountName) {
        logger.info("real querying db... {}", accountName);
        //Todo query data from database
        return Optional.fromNullable(new Account(accountName));
    }
}
