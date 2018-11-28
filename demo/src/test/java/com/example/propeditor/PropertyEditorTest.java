package com.example.propeditor;

import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;

public class PropertyEditorTest {

	public static void main(String[] args) {
		ApplicationContext context=new ClassPathXmlApplicationContext("classpath:application-propertyeditor.xml");
		UserManager um=(UserManager)context.getBean("userManager");
		System.out.println(um.getDateValue());

	}

}
