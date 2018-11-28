package com.example.demo;

import org.junit.Assert;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.jdbc.DataSourceAutoConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import com.example.demo.entity.User;
import com.example.demo.seckill.IUserDao;

@RunWith(SpringJUnit4ClassRunner.class)
@SpringBootApplication(exclude = {DataSourceAutoConfiguration.class})
public class UserReposityTest {

	@Qualifier
	private IUserDao iUserDao;

	@Test
	public void test() throws Exception {

		// 创建10条记录
		iUserDao.save(new User("AAA", 10));
		iUserDao.save(new User("BBB", 20));
		iUserDao.save(new User("CCC", 30));
		iUserDao.save(new User("DDD", 40));
		iUserDao.save(new User("EEE", 50));
		iUserDao.save(new User("FFF", 60));
		iUserDao.save(new User("GGG", 70));
		iUserDao.save(new User("HHH", 80));
		iUserDao.save(new User("III", 90));
		iUserDao.save(new User("JJJ", 100));

		// 测试findAll, 查询所有记录
		Assert.assertEquals(10, iUserDao.findAll().size());

		// 测试findByName, 查询姓名为FFF的User
		Assert.assertEquals(60, iUserDao.findByName("FFF").getAge().longValue());

		// 测试findUser, 查询姓名为FFF的User
		Assert.assertEquals(60, iUserDao.findUser("FFF").getAge().longValue());

		// 测试findByNameAndAge, 查询姓名为FFF并且年龄为60的User
		Assert.assertEquals("FFF", iUserDao.findByNameAndAge("FFF", 60).getName());

		// 测试删除姓名为AAA的User
		iUserDao.delete(iUserDao.findByName("AAA"));

		// 测试findAll, 查询所有记录, 验证上面的删除是否成功
		Assert.assertEquals(9, iUserDao.findAll().size());

	}


}
