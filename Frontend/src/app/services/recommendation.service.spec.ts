import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { AuthenticationService } from './authentication.service';

import { RecommendationService } from './recommendation.service';

describe('RecommendationService', () => {
  let service: RecommendationService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[HttpClientTestingModule],
      providers:[AuthenticationService]
    });
    service = TestBed.inject(RecommendationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
