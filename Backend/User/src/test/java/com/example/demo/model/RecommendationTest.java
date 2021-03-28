package com.example.demo.model;
import org.junit.Before;
import org.junit.Test;
import org.meanbean.test.BeanTester;

public class RecommendationTest {
    private Recommendation recommendation;

    @Before
    public void setUp() throws Exception {
        recommendation =new Recommendation();
        recommendation.setFdcId("987");
        recommendation.setUsers(null);
    }

    @Test
    public void Beantest() {
        new BeanTester().testBean(Recommendation.class);

    }


}


