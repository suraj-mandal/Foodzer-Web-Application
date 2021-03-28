import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {MustMatch} from '../helpers/mustmatchvalidator';
import {RegisterService} from '../services/register.service';


@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {


  @Input() loginStatus;
  @Output() clickEvent = new EventEmitter();

  registerForm: FormGroup;
  submitted = false;

  constructor(private formBuilder: FormBuilder, private router: Router, private registerService: RegisterService) {
  }

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      firstname: new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(24)]),
      lastname: new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(24)]),
      email: new FormControl('', [Validators.required]),
      username: new FormControl('', [Validators.required, Validators.minLength(7)]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)]),
      confirmPassword: new FormControl('', [Validators.required])
    }, {
      validator: MustMatch('password', 'confirmPassword')
    });
  }

  // convenience getter for easy access to form fields
  get f(): any {
    // console.log(this.registerForm.controls);
    return this.registerForm.controls;
  }

  onSubmit(): void {
    this.submitted = true;
    console.log('Here');
    if (this.registerForm.invalid) {
      console.log('Issue');
      return;
    }
    console.log(this.registerForm.value);
    this.registerService.register(this.registerForm.value).subscribe(
      data => {
        console.log(data);
      },
      error => {
        console.log(error);
      }
    );
    this.loginStatus = true;
    this.clickEvent.emit(this.loginStatus);

  }


}
