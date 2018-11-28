package com.examplee.aop;

public class LogBean {
	private String logStr="日志记录";

	public String getLogStr() {
		return logStr;
	}

	public void setLogStr(String logStr) {
		this.logStr = logStr;
	}
	
	public void test(){
		System.out.println("test");
	}

}
