import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  foodItem: string;
  foodParam: {[key: string]: any}[];

  constructor() {
  }

  ngOnInit(): void {
  }

  getFoodItem(foodItem): void {
    this.foodItem = foodItem;
  }

  assignClass(): string[] {
    if (this.foodItem) {
      return ['search-height'];
    } else {
      return ['full-search-height'];
    }
  }

  getFoodQuery(param): void {
    console.log('In the home component');
    this.foodParam = [param];
  }

}
