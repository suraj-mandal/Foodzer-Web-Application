package com.example.demo.service;

import com.example.demo.exception.UserNotFoundException;
import com.example.demo.model.Recommendation;
import com.example.demo.model.User;
import com.example.demo.repository.RecommendationRepository;
import com.example.demo.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class RecommendationService {

    private final UserRepository userRepo;
    private final RecommendationRepository recommendationRepo;


    @Autowired
    public RecommendationService(UserRepository userRepo,
                                 RecommendationRepository recommendationRepo
    ) {
        this.userRepo = userRepo;
        this.recommendationRepo=recommendationRepo;
    }

    public boolean addToRecommend(String fdcId, String username) {
        Optional<Recommendation> recommendedSearch=recommendationRepo.findById(fdcId);
        Optional<User> userOptional=userRepo.findById(username);
        if(!recommendationRepo.existsById(fdcId)) {
            Recommendation recommendation = new Recommendation();
            recommendation.setFdcId(fdcId);
            recommendation.addUsers(userOptional.get());
            recommendationRepo.save(recommendation);
            return  true;
        }
        if(recommendedSearch.isPresent()){
            Recommendation recommendedItem=recommendedSearch.get();
            recommendedItem.addUsers(userOptional.get());
            recommendationRepo.save(recommendedItem);
            return true;
        }
        else return false;
    }

    public boolean deleteRecommendation(String username, String fdcId) {
        Optional<User> userOptional=userRepo.findById(username);
        Optional<Recommendation> recommendationOptional=recommendationRepo.findById(fdcId);
        if(recommendationOptional.isPresent()) {
            try {
                User user=userOptional.get();
                Recommendation recommendation=recommendationOptional.get();
                List<User> users=recommendation.getUsers();
                recommendation.setUsers(users.stream().filter(user1 -> !user1.getUsername().equals(username)).collect(Collectors.toList()));
                recommendationRepo.save(recommendation);
            }catch (Exception e){
                e.printStackTrace();
                return false;
            }
        }
        return  true;
    }

    public List<Map<String, Integer>> getRecommendations() {
        List<Recommendation> recommendations=recommendationRepo.findAll();

        return recommendations.stream()
                .filter(recommendation -> recommendation.getLength() > 0)
                .map(recommendation -> Collections.singletonMap(recommendation.getFdcId(), recommendation.getLength()))
                .collect(Collectors.toList());
//		return recommendations.stream().map(recommendation ->
//				Collections.singletonMap(recommendation.getFdcId(), recommendation.getLength())).collect(Collectors.toList());
//		recommendations.forEach(recommendation -> {
//		String fdcId=recommendation.getFdcId();
//	    Map<String,Integer> map=new HashMap<>();
//	    map.put(fdcId,recommendation.getLength());
//		});
    }

    public List<String> getRecommendationByUser(String userId) throws UserNotFoundException {
        Optional<User> optionalUser = userRepo.findById(userId);
        if (optionalUser.isPresent()) {
            User user = optionalUser.get();
            return user.getRecommendations().stream()
                    .map(Recommendation::getFdcId).collect(Collectors.toList());
        } else {
            throw new UserNotFoundException();
        }
    }
}
