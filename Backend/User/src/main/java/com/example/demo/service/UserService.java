package com.example.demo.service;

import java.util.*;
import com.example.demo.repository.FoodRepository;
import com.example.demo.repository.MealRepository;
import com.example.demo.repository.RecommendationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCrypt;
import org.springframework.stereotype.Service;

import com.example.demo.exception.UserExistsException;
import com.example.demo.model.User;
import com.example.demo.repository.UserRepository;


@Service
public class UserService {
	
	
	private final UserRepository userRepo;

	@Autowired
	public UserService(UserRepository userRepo,
					   FoodRepository foodRepository, MealRepository mealRepo,
					   RecommendationRepository recommendationRepo, MealService mealService
	) {
		this.userRepo = userRepo;
	}

	public boolean registerUser(User user) throws UserExistsException {
		Optional<User> optUser = userRepo.findById(user.getUsername());
		if (optUser.isPresent()) {
			throw new UserExistsException();
		}
		String hashpw =BCrypt.hashpw(user.getPassword(),BCrypt.gensalt());
		System.out.println(hashpw);
		user.setPassword(hashpw);
		userRepo.save(user);
		return true;
	}
	public User login(String username, String password) {
		Optional<User> userSearch =userRepo.findById(username);
		User user = null;
		if(userSearch.isPresent()) {
			user = userSearch.get();
			boolean matched = BCrypt.checkpw(password, user.getPassword());
			if(!matched) {
				user = null;
			}
		}
		return user;
	}

	public boolean isAuthenticated(String username, String authentication) {
		// if row exists username and auth token -> true -> userAuth table
		// else false
		return false;
	}
}
