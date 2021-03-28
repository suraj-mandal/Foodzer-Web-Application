import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { FavouritesService } from 'src/app/services/favourites.service';
import { RecommendationService } from 'src/app/services/recommendation.service';

import { FoodComponent } from './food.component';

describe('FoodComponent', () => {
  let component: FoodComponent;
  let fixture: ComponentFixture<FoodComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FoodComponent ],
      imports:[HttpClientTestingModule],
      providers:[
        FavouritesService,
        RecommendationService,
        AuthenticationService
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FoodComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
});
