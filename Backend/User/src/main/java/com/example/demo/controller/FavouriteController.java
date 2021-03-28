package com.example.demo.controller;

import com.example.demo.model.Food;
import com.example.demo.service.FavouriteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Set;

@CrossOrigin(origins = "http://localhost:4200", maxAge = 3600)
@RestController
@RequestMapping("/nutritionApi")
public class FavouriteController {

    private FavouriteService favouriteService;


    @Autowired
    public FavouriteController(FavouriteService favouriteService) {
        this.favouriteService=favouriteService;
    }


    @PostMapping("/addFavourite")
    public ResponseEntity<?> addFavourite(@RequestBody Food food, @RequestHeader("username") String username, @RequestHeader("Authorization") String secret) {
        HttpHeaders headers = new HttpHeaders();
        if (username == null) {
            return new ResponseEntity<>(headers, HttpStatus.UNAUTHORIZED);
        } else {
            System.out.println(username);
            try {
                System.out.println(food);
                if (favouriteService.addFavourite(food, username))
                    return new ResponseEntity<>(headers, HttpStatus.OK);
            } catch (Exception e) {
                e.printStackTrace();
                return new ResponseEntity<>(headers, HttpStatus.BAD_REQUEST);
            }
        }
        return new ResponseEntity<>(headers, HttpStatus.NOT_ACCEPTABLE);

    }

    @GetMapping("/getFavourites")
    public ResponseEntity<Set<Food>> getFavourites(@RequestHeader("username") String username) {
        HttpHeaders headers = new HttpHeaders();
        if (username == null) {
            return new ResponseEntity<>(headers, HttpStatus.UNAUTHORIZED);
        }
        try {
            Set<Food> favouriteFoods = favouriteService.getFavourites(username);
            if (favouriteFoods == null)
                return new ResponseEntity<>(headers, HttpStatus.NO_CONTENT);
            else {
                return new ResponseEntity<>(favouriteFoods, HttpStatus.OK);
            }
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(headers, HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping("/deleteFavourite/{id}")
    public ResponseEntity<?> deleteFavourite(@RequestHeader("username") String username, @PathVariable("id") String fdcId) {
        HttpHeaders headers = new HttpHeaders();
        if (username == null)
            return new ResponseEntity<>(headers, HttpStatus.UNAUTHORIZED);
        try {
            if (favouriteService.deleteFavourite(username, fdcId)) {
                return new ResponseEntity<>(headers, HttpStatus.OK);
            }
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(headers, HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(headers, HttpStatus.NOT_FOUND);
    }

}
