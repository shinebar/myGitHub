package com.example.beanfactoryPostProcess;

import org.springframework.beans.factory.config.BeanFactoryPostProcessor;
import org.springframework.beans.factory.config.ConfigurableListableBeanFactory;
import org.springframework.beans.factory.xml.XmlBeanFactory;
import org.springframework.core.io.ClassPathResource;

public class PostProcessTest {

	public static void main(String[] args) {
		ConfigurableListableBeanFactory bf=new XmlBeanFactory(new ClassPathResource("classpath:application-beanfactoryPostProcess.xml"));
		BeanFactoryPostProcessor bfp=(BeanFactoryPostProcessor) bf.getBean("bfp");
		//ApplicationContext context=new ClassPathXmlApplicationContext("classpath:application-beanfactoryPostProcess.xml");

	}

}
