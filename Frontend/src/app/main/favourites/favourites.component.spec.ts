import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { FavouritesService } from 'src/app/services/favourites.service';
import { FoodApiService } from 'src/app/services/food-api.service';
import { RecommendationService } from 'src/app/services/recommendation.service';

import { FavouritesComponent } from './favourites.component';

describe('FavouritesComponent', () => {
  let component: FavouritesComponent;
  let fixture: ComponentFixture<FavouritesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FavouritesComponent ],
      imports:[HttpClientTestingModule],
      providers:[
        FavouritesService,
        FoodApiService,
        RecommendationService,
        AuthenticationService
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FavouritesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
