import {Component, OnInit, Output, EventEmitter} from '@angular/core';
import {FoodApiService} from '../../../services/food-api.service';

@Component({
  selector: 'app-food-search',
  templateUrl: './food-search.component.html',
  styleUrls: ['./food-search.component.css']
})
export class FoodSearchComponent implements OnInit {

  // defining the properties here
  @Output() foodSearchEmitter = new EventEmitter<{[key: string]: any}>();

  brandedStatus = false;
  searchStatus = false;
  brandName = '';

  brands: string[];
  filteredBrands: string[] = [];
  loadingStatus: boolean;

  foodQuery: { [key: string]: any } = {
    query: '',
    dataType: [],
    brandOwner: '',
    pageNumber: 1
  };

  constructor(private foodApiService: FoodApiService) {
  }

  fetchBrands(queryParameter): void {
    this.foodApiService.getAllFoods(queryParameter).subscribe(data => {
      this.brands = Array.from(new Set(data.foods.map(food => food.brandOwner)));
      // console.log(this.brands);
      this.loadingStatus = false;
    }, error => {
      console.log(error);
    });
  }

  ngOnInit(): void {
  }

  emitFoodQueryParams(): void {
    // console.log(foodSearchQuery);
    this.foodSearchEmitter.emit(this.foodQuery);
  }

  selectBrandStatus(): void {
    if (this.foodQuery.query !== '') {
      // implement the brand search based on the foodQuery and populate the brand names
      // console.log(this.foodQuery);
      this.loadingStatus = true;
      const query = {
        query: this.foodQuery.query,
        dataType: 'Branded',
        pageSize: 2500
      };
      this.fetchBrands(query);
    }
  }

  addFoodType(event): void {
    const currentFoodType = event.target.value;
    this.filteredBrands = [];
    this.brandName = '';
    const index = this.foodQuery.dataType.indexOf(currentFoodType);
    if (index !== -1) {
      if (currentFoodType === 'Branded') {
        this.brandedStatus = false;
        this.foodQuery.brandOwner = '';
      }
      this.foodQuery.dataType.splice(index, 1);
    } else {
      if (currentFoodType === 'Branded') {
        this.brandedStatus = true;
        this.selectBrandStatus();
      }
      this.foodQuery.dataType.push(currentFoodType);
    }
    this.emitFoodQueryParams();
  }

  extractFoodName(event): void {
    this.foodQuery.brandOwner = '';
    this.foodQuery.query = event.target.foodName.value;
    this.filteredBrands = [];
    this.brandName = '';
    this.searchStatus = false;
    if (this.foodQuery.dataType.includes('Branded')) {
      // console.log(this.foodQuery);
      this.selectBrandStatus();
    }
    this.emitFoodQueryParams();
  }

  filterBrandNames(event): void {
    this.brandName = event.target.value.toLowerCase();
    this.filteredBrands =
      this.brands.filter(brand => brand.toLowerCase().startsWith(this.brandName));
  }

  searchAddBrand(selectedBrandName: string): void {
    this.foodQuery.brandOwner = selectedBrandName;
    // console.log(this.foodQuery);
    this.filteredBrands = [];
    this.brandName = '';
    this.emitFoodQueryParams();
  }

  featureSearch(): void {
    this.searchStatus = true;
    this.filteredBrands = [];
    this.brandName = '';
  }

  // reset functions
  resetFoodQuery(): void {
    this.foodQuery = {
      query: '',
      dataType: [],
      brandOwner: ''
    };
  }
}
