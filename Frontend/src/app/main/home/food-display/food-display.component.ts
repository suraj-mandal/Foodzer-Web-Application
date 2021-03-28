import {Component, Input, OnChanges, SimpleChanges} from '@angular/core';
import {FoodApiService} from '../../../services/food-api.service';
import {FavouritesService} from '../../../services/favourites.service';
import {Food} from '../../../model/Food';
import {RecommendationService} from '../../../services/recommendation.service';

@Component({
  selector: 'app-food-display',
  templateUrl: './food-display.component.html',
  styleUrls: ['./food-display.component.css']
})
export class FoodDisplayComponent implements OnChanges {

  @Input() foodParam: { [key: string]: any };
  currentFoodItem = '';

  params: { [key: string]: any } = {};

  food: string;
  foods = [];
  brands: any;
  start = false;
  foodShowStatus = false;
  foodShowLoadingStatus: boolean;
  foodDetails: any = {};
  currentFavourite: boolean;
  currentRecommended: boolean;
  currentMeal: boolean;
  favouritePillDisplay = false;
  removeFavouritePillDisplay = false;
  mealPillDisplay = false;
  removeMealPillDisplay = false;
  // useful for meal create and favourite add
  foodIds = {};
  descOrderParams = {
    'brandOwner.keyword': false,
    'lowerCaseDescription.keyword': false,
    'dataType.keyword': false,
    publishedDate: false
  };

  favouriteFdcIds = [];
  recommendedFdcIds = [];

  foodsLoadingStatus = true;

  mealFdcIds = [];

  totalPages: number;
  currentPage = 1;

  constructor(private foodApiService: FoodApiService,
              private favouriteService: FavouritesService,
              private recommendationService: RecommendationService) {

  }

  fetchFavourites(): void {
    this.favouriteService.getFavourites().subscribe(data => {
      // console.log(data);
      this.favouriteFdcIds = data.map(curFood => curFood.fdcId);
    }, error => {
      console.log(error);
    });
  }

  fetchRecommendations(): void {
    this.recommendationService.getRecommendationByUser().subscribe(data => {
      console.log(`Recommended food: ${data}`);
      this.recommendedFdcIds = data;
    }, error => {
      console.log(error);
    });
  }

  getFoodsPerQuery(query: any): void {
    this.foodApiService.getAllFoods(query).subscribe(data => {
      this.totalPages = Math.ceil(data.totalHits / 10);
      this.currentPage = query.pageNumber;
      console.log(this.totalPages);
      this.foods = data.foods;
      this.foodIds = this.foods.reduce((curObj, curFood) => Object.assign(curObj, {[curFood.fdcId.toString()]: [false, false]}), {});
      console.log(this.foodIds);
      this.foodsLoadingStatus = false;
    }, error => {
      console.log(error);
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log('In the food display component');
    this.foodsLoadingStatus = true;
    this.currentPage = 1;
    if (changes.foodParam.currentValue) {
      this.start = true;
      this.params = changes.foodParam.currentValue[0];
      this.food = this.params.query;

      // getting the food list from the foodcentral api
      this.getFoodsPerQuery({...this.params, pageSize: 10, pageNumber: this.currentPage});
    }

    this.fetchFavourites();
    this.fetchRecommendations();
    this.fetchMealFoods();

  }

  increasePages(): void {
    if (this.currentPage < this.totalPages) {
      this.getFoodsPerQuery({...this.params, pageSize: 10, pageNumber: this.currentPage + 1});
      // this.currentPage++;
    }
  }

  decreasePages(): void {
    if (this.currentPage > 1) {
      this.getFoodsPerQuery({...this.params, pageSize: 10, pageNumber: this.currentPage - 1});
      // this.currentPage--;
    }
  }

  fetchMealFoods(): void {
    this.mealFdcIds = JSON.parse(localStorage.getItem('list'));
  }

  // IMPLEMENTING SORT FUNCTIONS
  sort(value: string): void {
    this.foodsLoadingStatus = true;
    let sortOrderParamValue;
    if (this.descOrderParams[value] === false) {
      sortOrderParamValue = 'desc';
    } else {
      sortOrderParamValue = 'asc';
    }
    this.descOrderParams[value] = !this.descOrderParams[value];
    this.getFoodsPerQuery({
      ...this.params, pageSize: 10, sortBy: value,
      sortOrder: sortOrderParamValue, pageNumber: this.currentPage
    });
    // this.foodApiService.getAllFoods({...this.params, pageSize: 10, sortBy: value, sortOrder: sortOrderParamValue})
    //   .subscribe(data => {
    //     this.foods = data.foods;
    //     this.foodIds = this.foods.reduce((curObj, curFood) => Object.assign(curObj, {[curFood.fdcId.toString()]: [false, false]}), {});
    //     console.log(this.foodIds);
    //     this.foodsLoadingStatus = false;
    //   }, error => {
    //     console.log(error);
    //   });
  }


  setFillColorFavourite(fdcId): string {
    return this.favouriteFdcIds.includes(fdcId) ? 'active-fill' : 'inactive-fill';
  }

  setFillColorAdd(fdcId): string {
    return this.mealFdcIds.includes(fdcId) ? 'active-fill' : 'inactive-fill';
  }

  // WHILE CLICKING ON THE ACTION BUTTONS
  favouriteAction(fdcId): void {
    // this.foodIds[fdcId][0] = !this.foodIds[fdcId][0];
    console.log(fdcId);
    const index = this.favouriteFdcIds.indexOf(fdcId);
    if (index === -1) {
      this.favouriteService.addFavourite(new Food(fdcId)).subscribe(data => {
        console.log(data);
        this.displayAddFavouritePill();
        console.log('success');
        this.favouriteFdcIds.push(fdcId);
      }, error => {
        console.log(error);
      });
    } else {
      this.favouriteService.deleteFavourite(fdcId).subscribe(data => {
        console.log(data);
        this.displayRemoveFavouritePill();
        console.log('Successfully deleted the data');
        this.favouriteFdcIds.splice(index, 1);
      }, error => {
        console.log(error);
      });
    }
    this.foodIds[fdcId][0] = !this.foodIds[fdcId][0];
  }

  mealAction(fdcId): void {
    //  this.foodIds[fcdId][1] = !this.foodIds[fcdId][1];
    console.log(fdcId);
    const index = this.mealFdcIds.indexOf(fdcId);
    if (index === -1) {
      this.mealFdcIds.push(fdcId);
      console.log(this.mealFdcIds);
      this.displayAddMealPill();
    } else {
      this.mealFdcIds.splice(index, 1);
      console.log(this.mealFdcIds);
      this.displayRemoveMealPill();
    }
    localStorage.setItem('list', JSON.stringify(this.mealFdcIds));
    // this.foodIds[fdcId][0] = !this.foodIds[fdcId][0];
  }

//  foodDisplay
  displayFood(fdcId: string): void {
    this.foodShowStatus = true;
    this.foodShowLoadingStatus = true;

    this.currentFavourite = this.favouriteFdcIds.includes(fdcId.toString());
    console.log(this.currentFavourite);

    this.currentRecommended = this.recommendedFdcIds.includes(fdcId.toString());
    console.log(`Recommended: ${this.currentRecommended}`);

    this.currentMeal = this.mealFdcIds.includes(fdcId.toString());
    console.log(`Meal: ${this.currentMeal}`);

    this.foodApiService.getFood(fdcId).subscribe(data => {
      console.log(data);
      this.foodDetails = data;
      this.foodShowLoadingStatus = false;
    }, error => {
      console.log(error);
    });
  }

  // WHEN A PARTICULAR ROW IS CLICKED
  returnToFoodListDisplay(): void {
    this.foodShowStatus = false;
    this.fetchFavourites();
    this.fetchRecommendations();
    this.mealFdcIds = JSON.parse(localStorage.getItem('list'));
  }

  displayAddFavouritePill(): void {
    setTimeout(() => {
      this.favouritePillDisplay = false;
    }, 2000);
    this.favouritePillDisplay = true;
  }

  displayRemoveFavouritePill(): void {
    setTimeout(() => {
      this.removeFavouritePillDisplay = false;
    }, 2000);
    this.removeFavouritePillDisplay = true;
  }

  displayAddMealPill(): void {
    setTimeout(() => {
      this.mealPillDisplay = false;
    }, 2000);
    this.mealPillDisplay = true;
  }

  displayRemoveMealPill(): void {
    setTimeout(() => {
      this.removeMealPillDisplay = false;
    }, 2000);
    this.removeMealPillDisplay = true;
  }

}
