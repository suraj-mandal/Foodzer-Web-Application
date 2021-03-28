package com.example.demo.model;

import org.junit.Before;
import org.junit.Test;
import org.meanbean.test.BeanTester;

public class MealTest {
    private Meal meal;

    @Before
    public void setUp() throws Exception {
        meal=new Meal();
        meal.setMealId(1);
        meal.setMealName("meal");
        meal.setMealFoodList(null);
    }

    @Test
    public void Beantest() {
        new BeanTester().testBean(Meal.class);

    }


}
