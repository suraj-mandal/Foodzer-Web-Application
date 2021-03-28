package com.example.demo.controller;

import com.example.demo.model.Meal;
import com.example.demo.model.MealFood;
import com.example.demo.repository.MealRepository;
import com.example.demo.service.MealService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;


@CrossOrigin(origins = "http://localhost:4200", maxAge = 3600)
@RestController
@RequestMapping("/nutritionApi")
public class MealController {

    private final MealService mealService;
    private final MealRepository mealRepository;

    @Autowired
    public MealController(MealService mealService, MealRepository mealRepository) {
        this.mealService=mealService;
        this.mealRepository = mealRepository;
    }

    @GetMapping("/addMeal")
    public ResponseEntity<?> addMeal(@RequestParam("mealName") String mealName,
                                     @RequestParam("foodIds") List<String> foodIds,
                                     @RequestHeader("username") String username, @RequestHeader("Authorization") String secret) {
        HttpHeaders headers = new HttpHeaders();
        if (username == null) {
            return new ResponseEntity<>(headers, HttpStatus.UNAUTHORIZED);
        } else {
            System.out.println(username);
            try{

                Meal meal = new Meal();
                meal.setMealName(mealName);
                meal.setMealFoodList(foodIds.stream().map(MealFood::new).collect(Collectors.toList()));

                if (mealService.addMeal(meal, username))
                    return new ResponseEntity<>(headers, HttpStatus.OK);
            } catch (Exception e) {
                e.printStackTrace();
                return new ResponseEntity<>(headers, HttpStatus.BAD_REQUEST);
            }
        }
        return new ResponseEntity<>(headers, HttpStatus.NOT_ACCEPTABLE);

    }
    @GetMapping("/getMeals")
    public ResponseEntity<Set<Meal>> getMeals(@RequestHeader("username") String username) {
        HttpHeaders headers = new HttpHeaders();
        if (username == null) {
            return new ResponseEntity<>(headers, HttpStatus.UNAUTHORIZED);
        }
        try {
            Set<Meal> meals = mealService.getMeals(username);
            if (meals == null)
                return new ResponseEntity<>(headers, HttpStatus.NO_CONTENT);
            else {
                return new ResponseEntity<>(meals, HttpStatus.OK);
            }
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(headers, HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping({"/getMealFoods/{mealId}"})
    public ResponseEntity<List<MealFood>> getMealFoods(@PathVariable("mealId") int mealId,
                                                       @RequestHeader("username") String username) {
        HttpHeaders headers = new HttpHeaders();
        if (username == null)
            return new ResponseEntity<>(headers, HttpStatus.UNAUTHORIZED);
        try {
            Optional<Meal> currentMealOptional = mealRepository.findById(mealId);
            if (currentMealOptional.isPresent()) {
                Meal currentMeal = currentMealOptional.get();
                List<MealFood> mealFoods = currentMeal.getMealFoodList();
                return new ResponseEntity<>(mealFoods, HttpStatus.OK);
            } else {
                return new ResponseEntity<>(headers, HttpStatus.NO_CONTENT);
            }
        } catch (Exception e) {
            return new ResponseEntity<>(headers, HttpStatus.NO_CONTENT);
        }
    }

    @DeleteMapping("/deleteMeal/{mealId}")
    public ResponseEntity<?> deleteMeal(@RequestHeader("username") String username, @PathVariable("mealId") int mealId) {
        HttpHeaders headers = new HttpHeaders();
        if (username == null)
            return new ResponseEntity<>(headers, HttpStatus.UNAUTHORIZED);
        try {
            if (mealService.deleteMeal(username, mealId)) {
                return new ResponseEntity<>(headers, HttpStatus.OK);
            }
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(headers, HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(headers, HttpStatus.NOT_FOUND);
    }
}
