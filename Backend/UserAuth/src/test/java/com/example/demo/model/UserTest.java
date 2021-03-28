package com.example.demo.model;

import org.junit.Before;
import org.junit.Test;
import org.meanbean.test.BeanTester;


public class UserTest {

    private User user;

    @Before
    public void setUp() throws Exception {

        user = new User();
        user.setUsername("admin");
        user.setEmail("admin.admin@gmail.com");
        user.setFirstname("admin");
        user.setPassword("admin12");

    }

    @Test
    public void test() {
        new BeanTester().testBean(User.class);
    }

}

