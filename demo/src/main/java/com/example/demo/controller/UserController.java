package com.example.demo.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.example.demo.entity.User;
import com.example.demo.seckill.IUserDao;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiImplicitParam;
import io.swagger.annotations.ApiOperation;


@Controller
@RequestMapping("/user")
@Api(tags="用户API")
public class UserController {
	
	@Autowired
	IUserDao userDao;
	
	@RequestMapping("/{id}")
	@ResponseBody
	@ApiOperation(value="用户查询(ID)")    
    @ApiImplicitParam(name="id",value="查询ID",required=true)
	public User view(@PathVariable("id") Long id) {
		User user = userDao.findById(id);
		return user;
	}
	
	public String vein(){
		return "helow";
	}
}
