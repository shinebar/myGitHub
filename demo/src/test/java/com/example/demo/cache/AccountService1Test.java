package com.example.demo.cache;

import static org.junit.Assert.assertNotNull;

import org.junit.Before;
import org.junit.Test;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.context.support.ClassPathXmlApplicationContext;

import com.example.demo.service.IAccountService1;
import com.example.demo.service.impl.AccountService1;

public class AccountService1Test {
	
	private IAccountService1 accountService1;
	 
    private final Logger logger = LoggerFactory.getLogger(AccountService1Test.class);
 
    @Before
    public void setUp() throws Exception {
        ClassPathXmlApplicationContext context = new ClassPathXmlApplicationContext("application-test.xml");
        accountService1 = context.getBean("accountService1", AccountService1.class);
    }
 
    @Test
    public void testInject(){
        assertNotNull(accountService1);
    }
 
    @Test
    public void testGetAccountByName() throws Exception {
        accountService1.getAccountByName("accountName");
        accountService1.getAccountByName("accountName");
 
        accountService1.reload();
        logger.info("after reload ....");
 
        accountService1.getAccountByName("accountName");
        accountService1.getAccountByName("accountName");
    }
}
