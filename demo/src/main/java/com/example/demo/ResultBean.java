package com.example.demo;

import java.io.Serializable;

//@Data
public class ResultBean<T> implements Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	//成功
	public static final int SUCCESS=0;
	//失败
	public static final int FAIL=1;
	//无权限
	public static final int NO_PERMISSION=2;
	//成功
	private String msg="success";
	//成功编码
	private int code=SUCCESS;
	//返回数据
	private T data;
	
	public ResultBean(){
		super();
	}
	
	public ResultBean(T data){
		this.data=data;
	}
	public ResultBean(Throwable e ){
		super();
		this.msg=e.toString();
		this.code=FAIL;
	}

	public String getMsg() {
		return msg;
	}

	public void setMsg(String msg) {
		this.msg = msg;
	}

	public int getCode() {
		return code;
	}

	public void setCode(int code) {
		this.code = code;
	}

	public T getData() {
		return data;
	}

	public void setData(T data) {
		this.data = data;
	}

	@Override
	public String toString() {
		return "ResultBean [msg=" + msg + ", code=" + code + ", data=" + data + "]";
	}
	

}
