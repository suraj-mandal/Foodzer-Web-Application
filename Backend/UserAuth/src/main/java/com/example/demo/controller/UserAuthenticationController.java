package com.example.demo.controller;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.example.demo.exception.UserExistsException;
import com.example.demo.exception.UserNotFoundException;
import com.example.demo.model.User;
import com.example.demo.service.UserService;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;

@CrossOrigin(origins = "http://localhost:4200", maxAge = 3600)
@RestController
@RequestMapping("/auth")
public class UserAuthenticationController {
	
	@Autowired
	private final UserService userService;
	public UserAuthenticationController(UserService userService) {
		super();
		this.userService = userService;
	}
	
	@PostMapping("/register")
	public ResponseEntity<?> registerUser(@RequestBody User user) {
		ResponseEntity<?> response = null;
		try {
			   userService.registerUser(user);
			   response = new ResponseEntity<String>(HttpStatus.OK);
		} catch (UserExistsException e) {
			response = new ResponseEntity<String>(HttpStatus.CONFLICT);
			e.printStackTrace();
		} catch (Exception e) {
			response = new ResponseEntity<String>(HttpStatus.INTERNAL_SERVER_ERROR);
			e.printStackTrace();
		}
		return response;
	}
	
	@PostMapping("/login")
	public ResponseEntity<?> login(@RequestBody User user,HttpServletRequest request)
			throws UserNotFoundException {
		HttpHeaders headers = new HttpHeaders();
		User validUser = userService.login(user.getUsername(),user.getPassword());
		
		if (validUser == null) {
//			throw new UserNotFoundException();
			return new ResponseEntity<>(headers, HttpStatus.UNAUTHORIZED);
		}
	//	request.getSession().setAttribute("loggedInUserId", user.getUsername());
		// Build the Json Web Token
		String token =Jwts.builder().setId(validUser.getUsername()).
				setSubject(validUser.getFirstname())
				.setIssuedAt(new Date()).
				signWith(SignatureAlgorithm.HS256,"usersecretkey").
				compact();
		// Add it to a Map and send the map in response body
		Map<String, String> map1 = new
				HashMap<String, String>();

		// add the row -> username & authentication token to the userAuth table
		map1.put("token", token);
		map1.put("username", user.getUsername());
		map1.put("message", "User Successfully logged in");

		return new ResponseEntity<Map<String, String>>(
				map1, HttpStatus.OK);
	}


	// we will implement the service for userIsAutheticated
	// @PostMapping("/auth")
	// auth token // username
	// we will compare this with the userAuth table
	// if userAuth table returns a row -> we will return OK status
	// else it will return 401 unauthorized status





}
