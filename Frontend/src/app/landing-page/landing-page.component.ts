import {Component, OnInit} from '@angular/core';
import {RouterService} from '../services/router.service';
import {FoodApiService} from '../services/food-api.service';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css']
})
export class LandingPageComponent implements OnInit {

  foodSearch = '';
  foodData = [];
  displayTable = false;
  loadingBar: boolean;

  constructor(private routerService: RouterService, private foodService: FoodApiService) {
  }

  implementLandingPage(): void {
    this.loadingBar = true;
    setTimeout(() => {
      this.loadingBar = false;
    }, 1500);
  }

  ngOnInit(): void {
    this.implementLandingPage();
  }

  getFoods(): void {
    console.log(this.foodSearch);
    this.foodService.getAllFoods({query: this.foodSearch, pageSize: 5}).subscribe(data => {
      console.log(data.foods);
      this.foodData = data.foods;
    }, error => {
      console.log(error);
    });
  }

  goToAuth(value: string): void {
    if (value === 'login') {
      this.routerService.routeToLogin();
    } else {
      localStorage.setItem('register', 'true');
      this.routerService.routeToLogin();
    }
  }

  showValue(event): void {
    this.foodSearch = event.target.value;
    if (this.foodSearch !== '') {
      this.getFoods();
      this.displayTable = true;
    } else {
      this.displayTable = false;
    }
  }

}
