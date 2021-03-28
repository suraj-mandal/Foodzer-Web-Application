import {Component, OnInit} from '@angular/core';
import {RecommendationService} from '../../services/recommendation.service';
import {FoodApiService} from '../../services/food-api.service';
import {FavouritesService} from '../../services/favourites.service';
import {Food} from '../../model/Food';

@Component({
  selector: 'app-recommended-food',
  templateUrl: './recommended-food.component.html',
  styleUrls: ['./recommended-food.component.css']
})
export class RecommendedFoodComponent implements OnInit {

  allRecommendedFoods = [];
  allRecommendedFdcIds = {};
  favouriteFdcIds = [];
  userRecommendations = [];
  mealFdcIds = [];
  recommendedFoodLoading: boolean;
  curFoodDisplayStatus = false;
  currentFood = {};
  currentFoodFavourite: boolean;
  currentFoodRecommended: boolean;
  currentFoodMeal: boolean;

  constructor(private recommendationService: RecommendationService,
              private foodService: FoodApiService,
              private favouriteService: FavouritesService) {
  }

  fetchFavourites(): void {
    this.favouriteService.getFavourites().subscribe(data => {
      console.log(data);
      this.favouriteFdcIds = data.map(favouriteData => favouriteData.fdcId);
      console.log(`Favourites: ${this.favouriteFdcIds}`);
    }, error => {
      console.log(error);
    });
  }

  fetchUserRecommendations(): void {
    this.recommendationService.getRecommendationByUser().subscribe(data => {
      console.log(`Recommendations: ${data}`);
      this.userRecommendations = data;
    }, error => {
      console.log(error);
    });
  }

  fetchAllRecommendedFoods(): void {
    this.recommendedFoodLoading = true;
    this.recommendationService.getRecommendations().subscribe(data => {
      this.allRecommendedFdcIds = Object.assign({},
        ...data.map(x => ({[Object.keys(x)[0]]: Object.values(x)[0]})));
      // console.log(this.allRecommendedFdcIds);
      this.foodService
        .getFoodsByFdcIds(Object.keys(this.allRecommendedFdcIds)).subscribe(foodData => {
        console.log(foodData);
        this.allRecommendedFoods = foodData.map(curFood => ({
          ...curFood,
          persons: this.allRecommendedFdcIds[curFood.fdcId.toString()]
        }));
        console.log(this.allRecommendedFoods);
        this.recommendedFoodLoading = false;
      }, error => {
        console.log(error);
      });
      console.log(this.allRecommendedFdcIds);
    }, error => {
      console.log(error);
    });
  }

  fetchMealIds(): void {
    this.mealFdcIds = JSON.parse(localStorage.getItem('list'));
  }

  isFavourite(fdcId: string): boolean {
    return this.favouriteFdcIds.includes(fdcId);
  }

  isRecommended(fdcId: string): boolean {
    return this.userRecommendations.includes(fdcId);
  }

  isMeal(fdcId: string): boolean {
    return this.mealFdcIds.includes(fdcId);
  }

  ngOnInit(): void {
    this.fetchFavourites();
    this.fetchUserRecommendations();
    this.fetchMealIds();
    this.fetchAllRecommendedFoods();
  }

  returnToRecommendedFoodDisplay(): void {
    this.curFoodDisplayStatus = false;
    this.fetchUserRecommendations();
    this.fetchFavourites();
    this.fetchMealIds();
    this.fetchAllRecommendedFoods();
  }

  displayFoodDetails(food: any): void {
    this.currentFood = food;
    this.currentFoodFavourite = this.isFavourite(food.fdcId.toString());
    this.currentFoodRecommended = this.isRecommended(food.fdcId.toString());
    this.currentFoodMeal = this.isMeal(food.fdcId.toString());
    this.curFoodDisplayStatus = true;
  }

  addFavourite(fdcId: string): void {
    this.favouriteService.addFavourite(new Food(fdcId)).subscribe(data => {
      this.favouriteFdcIds.push(fdcId);
    }, error => {
      console.log(error);
    });
  }

  removeFavourite(fdcId): void {
    this.favouriteService.deleteFavourite(fdcId).subscribe(data => {
      this.favouriteFdcIds.splice(this.favouriteFdcIds.indexOf(fdcId), 1);
    }, error => {
      console.log(error);
    });
  }

}
