package com.example.demo;

import java.lang.reflect.Method;

import org.springframework.beans.factory.support.MethodReplacer;

public class ReplacerMehodBean implements MethodReplacer {

	@Override
	public Object reimplement(Object obj, Method method, Object[] args) throws Throwable {
		System.out.println("我替换了changeMe,原有方法实现方式!!!--");
		return null;
	}

}
