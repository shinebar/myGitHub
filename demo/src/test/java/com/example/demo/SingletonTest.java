package com.example.demo;

public class SingletonTest {
	public static void main(String args[]){
		for(Singleton singleton:Singleton.values()){
			singleton.methodOne();
		}
	}

}
