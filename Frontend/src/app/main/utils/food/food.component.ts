import {Component, Input, OnInit} from '@angular/core';
import {FavouritesService} from '../../../services/favourites.service';
import {Food} from '../../../model/Food';
import {RecommendationService} from '../../../services/recommendation.service';

@Component({
  selector: 'app-food',
  templateUrl: './food.component.html',
  styleUrls: ['./food.component.css']
})
export class FoodComponent implements OnInit {

  @Input() foodDetails: any;
  @Input() isFavourite: boolean;
  @Input() isRecommended: boolean;
  @Input() isMeal: boolean;

  constructor(private favouriteService: FavouritesService,
              private recommendationService: RecommendationService) {
  }

  ngOnInit(): void {
  }

  performFavouriteAction(): void {
    if (this.isFavourite) {
      this.favouriteService.deleteFavourite(this.foodDetails.fdcId.toString()).subscribe(data => {
        console.log('Successfully deleted data');
      }, error => {
        console.log(error);
      });
    } else {
      this.favouriteService.addFavourite(new Food(this.foodDetails.fdcId.toString())).subscribe(data => {
        console.log('Added successfully');
      }, error => {
        console.log(error);
      });
    }
    this.isFavourite = !this.isFavourite;
  }

  performRecommendationAction(): void {
    if (this.isRecommended) {
      this.recommendationService.deleteRecommendation(this.foodDetails.fdcId.toString()).subscribe(data => {
        console.log('Removed recommendation');
      }, error => {
        console.log(error);
      });
    } else {
      this.recommendationService.addRecommendation(new Food(this.foodDetails.fdcId.toString())).subscribe(data => {
        console.log('Added recommendation');
      }, error => {
        console.log(error);
      });
    }
    this.isRecommended = !this.isRecommended;
  }

  performMealAction(): void {
    const mealList = JSON.parse(localStorage.getItem('list'));
    if (this.isMeal) {
      mealList.splice(mealList.indexOf(this.foodDetails.fdcId.toString()), 1);
    } else {
      mealList.push(this.foodDetails.fdcId.toString());
    }
    localStorage.setItem('list', JSON.stringify(mealList));
    this.isMeal = !this.isMeal;
  }

}
