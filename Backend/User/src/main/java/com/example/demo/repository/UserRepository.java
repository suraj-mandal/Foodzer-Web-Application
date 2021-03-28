package com.example.demo.repository;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.demo.model.User;

@Repository
public interface UserRepository extends JpaRepository<User,String>{

//	Optional<Food> findbyId(List<Food> favorites);

//	Optional<Food> findbyId(String fdcId);

	
//  User findByUsernameAndPassword(String username,String password);
    
}
