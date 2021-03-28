import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { AuthenticationService } from './authentication.service';

import { MealService } from './meal.service';

describe('MealService', () => {
  let service: MealService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers:[AuthenticationService],
      imports:[HttpClientTestingModule]
    });
    service = TestBed.inject(MealService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
