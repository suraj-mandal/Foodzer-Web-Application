import { HttpClientTestingModule } from '@angular/common/http/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthenticationService } from '../services/authentication.service';

import { LoginComponent } from './login.component';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoginComponent ],
      imports:[
        FormsModule,
        ReactiveFormsModule,
        RouterTestingModule,
        HttpClientTestingModule
      ],
      providers:[
        AuthenticationService
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('form should be valid', async(() =>{
    component.loginForm.controls['username'].setValue('aaaaaa@1');
    component.loginForm.controls['password'].setValue('aaaaaa');
    expect(component.loginForm.valid).toBeTruthy();
    }));
  it('form should be invalid', async(() =>{
      component.loginForm.controls['username'].setValue('');
      component.loginForm.controls['password'].setValue('mmm');
      expect(component.loginForm.valid).toBeFalsy();
    }));
  it('should call the onLogin method', async(() =>{
      fixture.detectChanges();
      spyOn(component, 'onLogin');
      const el = fixture.debugElement.query(By.css('input')).nativeElement;
      el.click();
      expect(component.onLogin).toHaveBeenCalledTimes(0);
    }));
  

});
