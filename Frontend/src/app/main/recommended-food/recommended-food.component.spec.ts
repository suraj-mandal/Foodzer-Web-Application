import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { RecommendedFoodComponent } from './recommended-food.component';
import { RecommendationService } from 'src/app/services/recommendation.service';
import { FoodApiService } from 'src/app/services/food-api.service';
import { FavouritesService } from 'src/app/services/favourites.service';
import { AuthenticationService } from 'src/app/services/authentication.service';

describe('RecommendedFoodComponent', () => {
  let component: RecommendedFoodComponent;
  let fixture: ComponentFixture<RecommendedFoodComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RecommendedFoodComponent ],
      imports:[HttpClientTestingModule],
      providers:[
       RecommendationService,
       FoodApiService,
       FavouritesService,
       AuthenticationService
      ]
      
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RecommendedFoodComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
