package com.example.methodparam;

import org.apache.commons.lang3.StringUtils;
import org.junit.Test;

import com.example.demo.entity.User;

public class MethodParamTest {
	
	@Test
	public void main(){
		User user=new User();
		String i="S";
		if(StringUtils.equalsIgnoreCase("S", i)){
			paramM(user);
			System.out.println("dd:"+user.getName()+":dd");
		}else{
			paramM(user);
			System.out.println("dd:"+user.getName()+":dd");
		}
		System.out.println("dd:"+user.getName()+":dd");
	}
	
	private void paramM(User user){
			user.setId(1L);
			user.setName("ddss");
	}

}
