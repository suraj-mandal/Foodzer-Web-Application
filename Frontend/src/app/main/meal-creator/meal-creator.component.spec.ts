import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { FavouritesService } from 'src/app/services/favourites.service';
import { FoodApiService } from 'src/app/services/food-api.service';
import { RecommendationService } from 'src/app/services/recommendation.service';

import { MealCreatorComponent } from './meal-creator.component';

describe('MealCreatorComponent', () => {
  let component: MealCreatorComponent;
  let fixture: ComponentFixture<MealCreatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MealCreatorComponent ],
      imports:[HttpClientTestingModule],
       providers:[
         AuthenticationService
      ],
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MealCreatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
});
