package com.example.spring;

import com.example.enty.User;

public abstract class GetLookUpBeanTest {
	public void showMe(){
		getBean().showMe();
	}
	public abstract User getBean();

}
