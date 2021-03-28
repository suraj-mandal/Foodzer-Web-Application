package com.example.demo.model;


import com.fasterxml.jackson.annotation.JsonIgnore;


import javax.persistence.*;
import java.util.*;

@Entity
@Table(name = "meal")
public class Meal {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int mealId;

    private String mealName;

    @JsonIgnore
    @OneToMany(fetch = FetchType.LAZY,cascade = CascadeType.PERSIST)
    private List<MealFood> mealFoodList = new ArrayList<>();


    public Meal(int mealId,String mealName, List<MealFood> mealFoodList) {
        this.mealId = mealId;
        this.mealName=mealName;
        this.mealFoodList = mealFoodList;
    }

    public Meal() {
    }

    public int getMealId() {
        return mealId;
    }

    public void setMealId(int mealId) {
        this.mealId = mealId;
    }

    public String getMealName() {
        return mealName;
    }

    public void setMealName(String mealName) {
        this.mealName = mealName;
    }

    public List<MealFood> getMealFoodList() {
        return mealFoodList;
    }

    public void setMealFoodList(List<MealFood> mealFoodList) {
        this.mealFoodList = mealFoodList;
    }

    @Override
    public String toString() {
        return "Meal{" +
                "mealId=" + mealId +
                ", mealName='" + mealName + '\'' +
                ", mealFoodList=" + mealFoodList +
                '}';
    }
}
