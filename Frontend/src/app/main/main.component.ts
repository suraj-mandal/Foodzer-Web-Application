import {Component, OnInit} from '@angular/core';
import {FoodApiService} from '../services/food-api.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  foodSearch: string;
  foodsListCurrentPage: any[];
 // iconStatus:string;

  constructor(private foodApiService: FoodApiService) {
  }

  ngOnInit(): void {
  }


  searchFoodItem(event): void {
    this.foodSearch = event.target.foodSearchQuery.value;
    console.log(this.foodSearch);
    // MODIFY THIS OBJECT FOR VARIED API RESULTS
    const params = {
      query: this.foodSearch,
    };
    // -------------------------
    this.foodApiService.getAllFoods(params).subscribe((data: { foods: any; }) => {
      this.foodsListCurrentPage = data.foods;
      console.log(this.foodsListCurrentPage);
    }, (error: any) => {
      console.log(error);
    });
  }

}
