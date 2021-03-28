package com.example.demo.service;


import com.example.demo.model.Meal;
import com.example.demo.model.MealFood;
import com.example.demo.model.User;
import com.example.demo.repository.MealFoodRepository;
import com.example.demo.repository.MealRepository;
import com.example.demo.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

@Service
public class MealService {

    private MealRepository mealRepo;
    private MealFoodRepository mealFoodRepository;
    private UserRepository userRepo;

    @Autowired
    public MealService(MealRepository mealRepo, MealFoodRepository mealFoodRepository,UserRepository userRepo){
        this.mealRepo=mealRepo;
        this.mealFoodRepository = mealFoodRepository;
        this.userRepo=userRepo;
    }

//        public boolean addMeal(Meal meal){
//           try{
//               List<MealFood> mealFoodList = meal.getMealFoodList();
//               System.out.println(mealFoodList);
//               mealFoodRepository.saveAll(mealFoodList);
//               meal.setMealFoodList(mealFoodList);
//               mealRepo.save(meal);
//           }
//           catch(Exception e){
//               e.printStackTrace();
//               return false;
//            }
//           return true;
//        }

    public boolean addMeal(Meal meal, String username) {
        Optional<User> userSearch=userRepo.findById(username);

        if (!mealRepo.existsById(meal.getMealId())) {
            try{
                List<MealFood> mealFoodList = meal.getMealFoodList();
                System.out.println(mealFoodList);
                mealFoodRepository.saveAll(mealFoodList);
                meal.setMealFoodList(mealFoodList);
                mealRepo.save(meal);
            }
            catch(Exception e){
                e.printStackTrace();
                return false;
            }
            return true;
        }
        if(userSearch.isPresent()) {
            User user=userSearch.get();
            user.addMeal(meal);
            userRepo.save(user);
            return true;
        }
        else return false;
    }

    public Set<Meal> getMeals(String username) {
        Optional<User> userOptional = userRepo.findById(username);
        if (userOptional.isPresent()) {
            User user = userOptional.get();
            return user.getMeals();
        }
        return null;
    }

    public boolean deleteMeal(String username, int mealId) {
        Optional<User> userOptional = userRepo.findById(username);
        if (userOptional.isPresent()) {
            try {
                User user = userOptional.get();
                Set<Meal> meals = user.getMeals();
                user.setMeals(meals.stream().filter(meal -> (meal.getMealId())!=mealId ).collect(Collectors.toSet()));
                userRepo.save(user);
                return true;
            } catch (Exception e) {
                e.printStackTrace();
                return false;
            }
        }
        return false;
    }
}
