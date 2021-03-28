import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { CanActivateGuard } from './can-activate.guard';
import { AuthenticationService } from './services/authentication.service';

describe('CanActivateGuard', () => {
  let guard: CanActivateGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[HttpClientTestingModule,RouterTestingModule],
      providers:[AuthenticationService]
    });
    guard = TestBed.inject(CanActivateGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
