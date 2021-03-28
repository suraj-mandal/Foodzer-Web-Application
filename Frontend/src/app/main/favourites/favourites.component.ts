import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {FavouritesService} from '../../services/favourites.service';
import {FoodApiService} from '../../services/food-api.service';
import {Element} from '@angular/compiler';
import {RecommendationService} from '../../services/recommendation.service';
import {Food} from '../../model/Food';

@Component({
  selector: 'app-favourites',
  templateUrl: './favourites.component.html',
  styleUrls: ['./favourites.component.css']
})
export class FavouritesComponent implements OnInit {


  fdcIdList: string[];
  foodList: any[];
  foodListLoading = false;
  curFoodDisplayStatus = false;
  currentFood: any;
  brandDisplay = false;
  brandsDisplayObject = {};
  recommendedFdcIdList = [];
  isCurRecommendedFood: boolean;
  isMealFood: boolean;
  noFavouriteFoods: boolean;
  mealFdcIds = [];

  constructor(private favouriteService: FavouritesService,
              private foodApiService: FoodApiService,
              private recommenationService: RecommendationService) {
  }

  getFavourites(): void {
    this.favouriteService.getFavourites().subscribe(data => {
      this.fdcIdList = data.map(curFood => curFood.fdcId);
      if (this.fdcIdList.length > 0) {
        this.noFavouriteFoods = false;
        this.fetchFoods();
      } else {
        this.noFavouriteFoods = true;
      }
    }, error => {
      console.log(error);
    });
  }

  getRecommendations(): void {
    this.recommenationService.getRecommendationByUser().subscribe(data => {
      this.recommendedFdcIdList = data;
      console.log(this.recommendedFdcIdList);
    }, error => {
      console.log(error);
    });
  }

  convertToBrandsDisplay(): any {
    const currBrandObject = {};
    for (const foodItem of this.foodList) {
      if (foodItem.brandOwner) {
        if (Object.keys(currBrandObject).includes(foodItem.brandOwner.toLowerCase())) {
          currBrandObject[foodItem.brandOwner.toLowerCase()].push(foodItem);
        } else {
          currBrandObject[foodItem.brandOwner.toLowerCase()] = [foodItem];
        }
      }
    }
    return currBrandObject;
  }


  ngOnInit(): void {
    this.noFavouriteFoods = true;
    this.getFavourites();
    this.getRecommendations();
    this.mealFdcIds = JSON.parse(localStorage.getItem('list'));
  }

  fetchFoods(): void {
    this.foodListLoading = true;
    this.foodApiService.getFoodsByFdcIds(this.fdcIdList).subscribe(data => {
      this.foodList = data;
      console.log(this.foodList);
      this.brandsDisplayObject = this.convertToBrandsDisplay();
      this.foodListLoading = false;
    }, error => {
      console.log(error);
    });
  }

  displayCurrentFood(food: any): void {
    this.currentFood = food;
    this.curFoodDisplayStatus = true;
    console.log(food.fdcId);
    this.isCurRecommendedFood = this.recommendedFdcIdList.includes(food.fdcId.toString());
    this.isMealFood = this.mealFdcIds.includes(food.fdcId.toString());
  }

  isThisRecommended(fdcId: string): boolean {
    return this.recommendedFdcIdList.includes(fdcId);
  }

  returnToFavouriteFoodDisplay(): void {
    this.getFavourites();
    this.getRecommendations();
    this.curFoodDisplayStatus = false;
    this.mealFdcIds = JSON.parse(localStorage.getItem('list'));
  }

  deleteFoodItem(deleteFood: any): void {
    this.favouriteService.deleteFavourite(deleteFood.fdcId).subscribe(data => {
      this.foodList.splice(this.foodList.indexOf(deleteFood), 1);
      console.log('success');
    }, error => {
      console.log(error);
    });
  }

  toggleCollapse(element: HTMLDivElement, toggleButton: HTMLButtonElement): void {
    if (element.classList.contains('d-none')) {
      element.classList.remove('d-none');
      toggleButton.innerHTML = ` <svg style="height: 20px; width: 20px;" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>`;
    } else {
      element.classList.add('d-none');
      toggleButton.innerHTML = `<svg style="height: 20px; width: 20px;" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 10l7-7m0 0l7 7m-7-7v18" />
</svg>`;
    }
  }

  performRecommendedAction(food: any): void {
    if (this.isThisRecommended(food.fdcId.toString())) {
      this.recommenationService.deleteRecommendation(food.fdcId.toString()).subscribe(data => {
        console.log('Deleted recommendation');
        this.getRecommendations();
      }, error => {
        console.log(error);
      });
    } else {
      this.recommenationService.addRecommendation(new Food(food.fdcId.toString())).subscribe(data => {
        console.log('Added recommendation');
        this.getRecommendations();
      }, error => {
        console.log(error);
      });
    }
    this.getFavourites();
  }

}
