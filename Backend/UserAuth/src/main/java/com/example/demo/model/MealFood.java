package com.example.demo.model;



import javax.persistence.*;


@Entity
@Table(name = "mealfood")
public class MealFood {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int mealFoodId;

    private String fdcId;

    public MealFood(String fdcId) {
        this.fdcId = fdcId;
    }

    public MealFood() {

    }

    public int getMealFoodId() {
        return mealFoodId;
    }

    public void setMealFoodId(int mealFoodId) {
        this.mealFoodId = mealFoodId;
    }

    public String getFdcId() {
        return fdcId;
    }

    public void setFdcId(String fdcId) {
        this.fdcId = fdcId;
    }

    @Override
    public String toString() {
        return "MealFood{" +
                "fdcId='" + fdcId + '\'' +
                '}';
    }
}
