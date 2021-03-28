import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {AbstractControl, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {AuthenticationService} from '../services/authentication.service';

import {RouterService} from '../services/router.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  loginsubmitted = false;
  loginStatus = false;
  errorStatus = false;


  constructor(private formBuilder: FormBuilder, private router: RouterService, private authService: AuthenticationService) {
  }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      username: new FormControl('', [Validators.required, Validators.minLength(7)]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)])
    });

  }

  get l(): { [key: string]: AbstractControl } {
    return this.loginForm.controls;
  }

  onLogin(): void {

    this.loginsubmitted = true;
    if (this.loginForm.invalid) {
      return;
    }
    console.log(this.loginForm.value);
    this.authService.authenticateUser(this.loginForm.value).subscribe(
      data => {
        this.router.routeToMain();
        this.authService.setBearerToken(data['token']);
        this.authService.setUsername(data['username']);
        localStorage.setItem('list', JSON.stringify([]));
      },
      error => {
        console.log(error);
        this.errorStatus = true;
      }
    );
    this.router.routeToMain();
  }


}
