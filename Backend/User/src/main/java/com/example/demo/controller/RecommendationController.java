package com.example.demo.controller;

import com.example.demo.model.Food;
import com.example.demo.service.RecommendationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;


@CrossOrigin(origins = "http://localhost:4200", maxAge = 3600)
@RestController
@RequestMapping("/nutritionApi")
public class RecommendationController {

    private RecommendationService recommendationService;


    @Autowired
    public RecommendationController(RecommendationService recommendationService) {
       this.recommendationService=recommendationService;
    }


    @PostMapping("/addtoRecommendation")
    public ResponseEntity<?> addToRecommendation(@RequestBody Food food, @RequestHeader("username") String username, @RequestHeader("Authorization") String secret) {
        HttpHeaders headers = new HttpHeaders();
        if (username == null) {
            return new ResponseEntity<>(headers, HttpStatus.UNAUTHORIZED);
        } else {
            System.out.println(username);
            try {
                System.out.println(food);
                String fdcId= food.getFdcId();
                if (recommendationService.addToRecommend(fdcId, username))
                    return new ResponseEntity<>(headers, HttpStatus.OK);
            } catch (Exception e) {
                e.printStackTrace();
                return new ResponseEntity<>(headers, HttpStatus.BAD_REQUEST);
            }
        }
        return new ResponseEntity<>(headers, HttpStatus.NOT_ACCEPTABLE);

    }

    @DeleteMapping("/deleteRecommendation/{id}")
    public ResponseEntity<?> deleteRecommendation(@RequestHeader("username") String username, @PathVariable("id") String fdcId) {
        HttpHeaders headers = new HttpHeaders();
        if (username == null)
            return new ResponseEntity<>(headers, HttpStatus.UNAUTHORIZED);
        try {
            if (recommendationService.deleteRecommendation(username, fdcId)) {
                return new ResponseEntity<>(headers, HttpStatus.OK);
            }
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(headers, HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(headers, HttpStatus.NOT_FOUND);
    }

    @GetMapping("/getRecommendations")
    public ResponseEntity<?> getRecommendation(@RequestHeader("username") String username){
        HttpHeaders headers=new HttpHeaders();
        if(username==null)
            return new ResponseEntity<>(headers,HttpStatus.UNAUTHORIZED);
        try{
            List<Map<String, Integer>> result = recommendationService.getRecommendations();
            return new ResponseEntity<>(result, HttpStatus.OK);
        }catch (Exception e){
            e.printStackTrace();
            return new ResponseEntity<>(headers, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/getRecommendationsByUser")
    public ResponseEntity<?> getRecommendationByUser(@RequestHeader("username") String username) {
        HttpHeaders headers = new HttpHeaders();
        if (username == null) {
            return new ResponseEntity<>(headers, HttpStatus.UNAUTHORIZED);
        }
        try {
            List<String> result = recommendationService.getRecommendationByUser(username);
            return new ResponseEntity<>(result, HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(headers, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
