package com.example.demo;

import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import org.springframework.test.context.web.WebAppConfiguration;

import com.example.demo.entity.Customer;


@RunWith(SpringJUnit4ClassRunner.class)
//指定SpringBoot工程的Application启动类
//支持web项目
@WebAppConfiguration
@SpringBootTest(classes = DemoApplication.class, webEnvironment = SpringBootTest.WebEnvironment.MOCK)
public class DemoApplicationTests{
	private static final Logger log = LoggerFactory.getLogger(DemoApplicationTests.class);

	@Autowired
	JdbcTemplate jdbcTemplate;

	@Test
	public void run() throws Exception {
		log.info("creat table ");
		List<Object[]> splitUpNames = Arrays.asList("John Woo", "Jeff Dean", "Josh Bloch", "Josh Long").stream().map(name -> name.split(" ")).collect(Collectors.toList());

		// Use a Java 8 stream to print out each tuple of the list
		splitUpNames.forEach(name -> log.info(String.format("Inserting T_CUSTOMERS record for %s %s", name[0], name[1])));

		// Uses JdbcTemplate's batchUpdate operation to bulk load data
		jdbcTemplate.batchUpdate("INSERT INTO T_CUSTOMERS(first_name, last_name) VALUES (?,?)", splitUpNames);

		log.info("Querying for customer records where first_name = 'Josh':");
		jdbcTemplate.query("SELECT id, first_name, last_name FROM T_CUSTOMERS WHERE first_name = ?", new Object[] { "Josh" }, (rs, rowNum) -> new Customer(rs.getLong("id"), rs.getString("first_name"), rs.getString("last_name"))).forEach(customer -> log.info(customer.toString()));
	}

}
