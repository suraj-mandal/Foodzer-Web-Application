package com.example.demo.repository;

import com.example.demo.model.MealFood;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MealFoodRepository extends JpaRepository<MealFood, Integer> {
}
