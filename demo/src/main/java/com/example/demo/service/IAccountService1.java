package com.example.demo.service;

import com.example.demo.entity.Account;

public interface IAccountService1 {

	Account getAccountByName(String accountName);

	void reload();

}