package com.example.demo.model;

import org.junit.Before;
import org.junit.Test;
import org.meanbean.test.BeanTester;

public class FoodTest {
    private Food food;

    @Before
	public void setUp() throws Exception {
        food =new Food();
        food.setFdcId("234");
        food.setUsers(null);
    }

    @Test
	public void Beantest() {
		new BeanTester().testBean(Food.class);

	}


}
