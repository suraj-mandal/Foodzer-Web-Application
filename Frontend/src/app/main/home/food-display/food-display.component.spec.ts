import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AuthenticationService } from 'src/app/services/authentication.service';

import { FoodDisplayComponent } from './food-display.component';

describe('FoodDisplayComponent', () => {
  let component: FoodDisplayComponent;
  let fixture: ComponentFixture<FoodDisplayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FoodDisplayComponent ],
      imports:[ HttpClientTestingModule],
      providers:[
        AuthenticationService
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FoodDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
