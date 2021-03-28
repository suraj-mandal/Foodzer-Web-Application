package com.example.demo.service;

import com.example.demo.model.Food;
import com.example.demo.model.User;
import com.example.demo.repository.FoodRepository;

import com.example.demo.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

@Service
public class FavouriteService {

    private final UserRepository userRepo;
    private final FoodRepository foodRepo;

    @Autowired
    public FavouriteService(UserRepository userRepo,
                       FoodRepository foodRepository
    ) {
        this.userRepo = userRepo;
        this.foodRepo = foodRepository;
    }
    public Boolean addFavourite(Food food, String userId) {
        // TODO Auto-generated method stub
        Optional<User> userSearch=userRepo.findById(userId);
        User user=null;
        if (!foodRepo.existsById(food.getFdcId()))
            foodRepo.save(food);
        if(userSearch.isPresent()) {
            user=userSearch.get();
            user.addFavorite(food);
            userRepo.save(user);
            return true;
        }
        else return false;
    }

    public Set<Food> getFavourites(String userId) {
        Optional<User> userOptional = userRepo.findById(userId);
        if (userOptional.isPresent()) {
            User user = userOptional.get();
            return user.getFavorites();
        }
        return null;
    }

    public boolean deleteFavourite(String userId, String foodId) {
        Optional<User> userOptional = userRepo.findById(userId);
        if (userOptional.isPresent()) {
            try {
                User user = userOptional.get();
                Set<Food> favouriteFoods = user.getFavorites();
                user.setFavorites(favouriteFoods.stream().filter(food -> !food.getFdcId().equals(foodId)).collect(Collectors.toSet()));
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
