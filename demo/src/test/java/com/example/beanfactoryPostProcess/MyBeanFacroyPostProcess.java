package com.example.beanfactoryPostProcess;

import java.util.HashSet;
import java.util.Set;

import org.springframework.beans.BeansException;
import org.springframework.beans.factory.config.BeanDefinition;
import org.springframework.beans.factory.config.BeanDefinitionVisitor;
import org.springframework.beans.factory.config.BeanFactoryPostProcessor;
import org.springframework.beans.factory.config.ConfigurableListableBeanFactory;
import org.springframework.util.StringValueResolver;

public class MyBeanFacroyPostProcess implements BeanFactoryPostProcessor {

	private Set<String> sets;
	
	public MyBeanFacroyPostProcess() {
		this.sets=new HashSet<String>();
	}

	@Override
	public void postProcessBeanFactory(ConfigurableListableBeanFactory beanFactory) throws BeansException {
			String[] beanNames=beanFactory.getBeanDefinitionNames();
			for(String beanName:beanNames){
				BeanDefinition beanDefinition=beanFactory.getBeanDefinition(beanName);
				StringValueResolver stringValueResolver=new StringValueResolver(){

					@Override
					public String resolveStringValue(String strVal) {
						if(isObscene(strVal)){
							return "****";
						}
						return strVal;
					}
					
				};
				BeanDefinitionVisitor beanDefinitionVisitor=new BeanDefinitionVisitor(stringValueResolver);
				beanDefinitionVisitor.visitBeanDefinition(beanDefinition);
			}
	}
	private boolean isObscene(Object strVal) {
		String potentialObscenity=strVal.toString().toUpperCase();
		return this.sets.contains(potentialObscenity);
	}
	public void setObscenties(Set<String> obsenties){
		this.sets.clear();
		for(String obscentiy:obsenties){
			this.sets.add(obscentiy.toUpperCase());
		}
	}

}
