package com.example.messageResource;

import java.text.MessageFormat;
import java.util.Date;

import org.junit.Test;

public class MessageSourcesTest {
	@Test
	public void messagePattern(){
		String pattern="{0},hello you at {1},drawable money {2}";
		Object[] params={"john",new Date().toString(),1.E2};
		String message=MessageFormat.format(pattern, params);
		System.out.println(message);
	}

}
