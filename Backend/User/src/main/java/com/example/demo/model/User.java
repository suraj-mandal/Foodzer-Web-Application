package com.example.demo.model;


import com.fasterxml.jackson.annotation.JsonIgnore;

import java.util.ArrayList;
import java.util.HashSet;

import java.util.List;
import java.util.Set;

import javax.persistence.*;

@Entity
@Table(name="users")
public class User{

	@Id
	@Column(name = "Username")
	private String username;

	@Column(name = "Email")
	private String email;


	@Column(name = "Firstname")
	private String firstname;

	@Column(name = "Lastname")
	private String lastname;

	@Column(name = "Password")
	private String password;

	@JsonIgnore
	@ManyToMany(fetch = FetchType.LAZY,cascade = CascadeType.PERSIST)
	@JoinTable(name = "users_favourites",joinColumns = {@JoinColumn(name = "username",referencedColumnName = "username")},
	             inverseJoinColumns = {@JoinColumn(name = "fdcId",referencedColumnName = "fdcId")})
	private Set<Food> favorites=new HashSet<>();

	@JsonIgnore
	@OneToMany(fetch = FetchType.LAZY,cascade = CascadeType.PERSIST)
	private Set<Meal> meals=new HashSet<>();

	@JsonIgnore
	@ManyToMany(mappedBy = "users",fetch = FetchType.LAZY)
	private List<Recommendation> recommendations=new ArrayList<>();


	public User() {

	}


	public User(String username, String email, String firstname, String lastname, String password) {
		super();
		this.username = username;
		this.email = email;
		this.firstname = firstname;
		this.lastname = lastname;
		this.password = password;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public Set<Food> getFavorites() {
		return favorites;
	}

	public void setFavorites(Set<Food> favorites) {
		this.favorites = favorites;
	}

	public void addFavorite(Food food) {
		this.favorites.add(food);
	}

	public void addMeal(Meal meal){
		this.meals.add(meal);
	}

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public String getFirstname() {
		return firstname;
	}

	public void setFirstname(String firstname) {
		this.firstname = firstname;
	}

	public String getLastname() {
		return lastname;
	}

	public void setLastname(String lastname) {
		this.lastname = lastname;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public Set<Meal> getMeals() {
		return meals;
	}

	public void setMeals(Set<Meal> meals) {
		this.meals = meals;
	}

	public List<Recommendation> getRecommendations() {
		return recommendations;
	}

	public void setRecommendations(List<Recommendation> recommendations) {
		this.recommendations = recommendations;
	}
}
