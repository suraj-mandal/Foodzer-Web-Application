package com.example.demo.model;

import org.junit.Before;
import org.junit.Test;
import org.meanbean.test.BeanTester;

public class MealFoodTest {
    private MealFood mealFood;

    @Before
    public void setUp() throws Exception {
        mealFood=new MealFood();
        mealFood.setMealFoodId(1);
        mealFood.setFdcId("123");
    }

    @Test
    public void Beantest() {
        new BeanTester().testBean(MealFood.class);

    }


}

