package com.example.demo.seckill;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Service;

import com.example.demo.entity.User;

@Service
public interface IUserDao extends JpaRepository<User, Long> {
	
	    User findByName(String name);

	    User findByNameAndAge(String name, Integer age);

	    @Query("from User u where u.name=:name")
	    User findUser(@Param("name") String name);

}
