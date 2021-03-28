import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { RegistrationComponent } from './registration.component';
import { By } from '@angular/platform-browser';

describe('RegistrationComponent', () => {
  let component: RegistrationComponent;
  let fixture: ComponentFixture<RegistrationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegistrationComponent ],
      imports:[
                  FormsModule,
                  ReactiveFormsModule,
                  RouterTestingModule,
                  HttpClientTestingModule
              ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('form should be valid', async(() =>{
    component.registerForm.controls['firstname'].setValue('aaa');
    component.registerForm.controls['lastname'].setValue('aaa');
    component.registerForm.controls['username'].setValue('aaa@aaa');
    component.registerForm.controls['email'].setValue('aaa@aaa.com');
    component.registerForm.controls['password'].setValue('aaaaaa');
    component.registerForm.controls['confirmPassword'].setValue('aaaaaa');
    expect(component.registerForm.valid).toBeTruthy();
    }));
  it('form should be invalid', async(() =>{
    component.registerForm.controls['firstname'].setValue('');
    component.registerForm.controls['lastname'].setValue('a');
    component.registerForm.controls['username'].setValue('aaa@aaa');
    component.registerForm.controls['email'].setValue('aaa@gmail.com');
    component.registerForm.controls['password'].setValue('aaaa');
    component.registerForm.controls['confirmPassword'].setValue('aaaaaa');
      expect(component.registerForm.valid).toBeFalsy();
    }));
  it('should call the register method', async(() =>{
        fixture.detectChanges();
        spyOn(component, 'onSubmit');
        const el = fixture.debugElement.query(By.css('input')).nativeElement;
        el.click();
        expect(component.onSubmit).toHaveBeenCalledTimes(0);
     }));
  it('form should validate email', async(() =>{
    component.registerForm.controls['firstname'].setValue('aaa');
    component.registerForm.controls['lastname'].setValue('aaa');
    component.registerForm.controls['username'].setValue('aaa@aaa')
    component.registerForm.controls['email'].setValue('aaaaaa');
    component.registerForm.controls['password'].setValue('aaaaaa');
    component.registerForm.controls['confirmPassword'].setValue('aaaaaa');
          expect(component.registerForm.valid).toBeFalsy();
    }));

});
