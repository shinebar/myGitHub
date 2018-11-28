package com.example.enumCode;

public class EnumTest {
	
	public static void main(String[] args){
		Week week[]=Week.values();
		for(Week w:Week.values()){
			System.out.println(w.getChineseName());
		}
		for(CodeType ct:CodeType.values()){
			System.out.println(ct.getCode());
		}
		CodeType codeType=CodeType.AGENTHANDOVERNO;
		String code=codeType.getCode();
		System.out.println(code);
		
	}
	
	

}
