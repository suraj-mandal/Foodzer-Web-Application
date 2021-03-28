import {Component, OnInit} from '@angular/core';
import {FoodApiService} from '../../services/food-api.service';
import {FavouritesService} from '../../services/favourites.service';
import {RecommendationService} from '../../services/recommendation.service';

@Component({
  selector: 'app-meal-creator',
  templateUrl: './meal-creator.component.html',
  styleUrls: ['./meal-creator.component.css']
})
export class MealCreatorComponent implements OnInit {

  mealIds = [];
  noMeals: boolean;
  mealsLoading: boolean;
  mealFoodNames = [];
  mealFoods = [];
  foodDisplayStatus: boolean;
  currentRecommended: boolean;
  currentFavourite: boolean;
  foodDetails = {};
  foodShowLoadingStatus: boolean;
  favouriteFdcIds = [];
  recommendedFdcIds = [];
  foodShowStatus: boolean;
  nutritions = [];
  totalNutritionalCost = {};
  totalNutrientsDisplay = false;

  constructor(private foodService: FoodApiService,
              private favouriteService: FavouritesService,
              private recommendationService: RecommendationService) {
  }

  getFoodItems(): void {
    this.foodService.getFoodsByFdcIds(this.mealIds).subscribe(data => {
      // console.log(data);
      this.mealFoods = data;
      console.log(this.mealFoods);
      this.mealFoodNames = this.mealFoods.map(mealFood => ({
        id: mealFood.fdcId,
        name: mealFood.description.toLowerCase(),
        brand: mealFood.brandOwner
      }));
      this.nutritions = [];
      this.mealFoods.forEach(mealFood => {
        this.nutritions.push(...mealFood.foodNutrients);
      });
      console.log(this.nutritions);

      console.log(this.nutritions);
      this.mealsLoading = false;
    }, error => {
      console.log(error);
    });
  }

  implementOnInitStuff(): void {
    this.mealIds = JSON.parse(localStorage.getItem('list'));
    console.log('Meals');
    console.log(this.mealIds);
    if (this.mealIds.length > 0) {
      this.noMeals = false;
      this.mealsLoading = true;
      this.getFoodItems();
    } else {
      this.noMeals = true;
    }
  }

  ngOnInit(): void {
    this.implementOnInitStuff();
    // console.log(localStorage.getItem('list'));
  }

  returnToFoodListDisplay(): void {
    this.foodShowStatus = false;
    this.fetchFavourites();
    this.fetchRecommendations();
    this.implementOnInitStuff();
  }

  fetchRecommendations(): void {
    this.recommendationService.getRecommendationByUser().subscribe(data => {
      console.log(`Recommended food: ${data}`);
      this.recommendedFdcIds = data;
    }, error => {
      console.log(error);
    });
  }

  fetchFavourites(): void {
    this.favouriteService.getFavourites().subscribe(data => {
      // console.log(data);
      this.favouriteFdcIds = data.map(curFood => curFood.fdcId);
    }, error => {
      console.log(error);
    });
  }

  displayFood(fdcId: string): void {
    this.foodShowStatus = true;
    this.foodShowLoadingStatus = true;

    this.currentFavourite = this.favouriteFdcIds.includes(fdcId.toString());
    console.log(this.currentFavourite);

    this.currentRecommended = this.recommendedFdcIds.includes(fdcId.toString());
    console.log(`Recommended: ${this.currentRecommended}`);


    this.foodService.getFood(fdcId).subscribe(data => {
      console.log(data);
      this.foodDetails = data;
      this.foodShowLoadingStatus = false;
    }, error => {
      console.log(error);
    });
  }

  calculateTotalNutritionalCost(): void {
    console.log(this.nutritions);
    this.totalNutritionalCost = {};
    this.nutritions.forEach(nutrition => {
      if (nutrition.amount > 0) {
        if (Object.keys(this.totalNutritionalCost).includes(nutrition.nutrient.name)) {
          this.totalNutritionalCost[nutrition.nutrient.name].value += nutrition.amount;
        } else {
          this.totalNutritionalCost[nutrition.nutrient.name] = {
            value: nutrition.amount,
            unit: nutrition.nutrient.unitName
          };
        }
      }
    });
    console.log(this.totalNutritionalCost);
    this.totalNutrientsDisplay = true;
  }

  deleteMealFood(fdcId: string): void {
    console.log('deleting...');
    console.log(fdcId);
    this.mealIds.splice(this.mealIds.indexOf(fdcId), 1);
    console.log(this.mealIds);
    localStorage.setItem('list', JSON.stringify(this.mealIds));
    this.implementOnInitStuff();
  }

}

