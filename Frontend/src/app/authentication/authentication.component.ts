import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.css']
})
export class AuthenticationComponent implements OnInit {

  loginStatus = true;

  urlLinks: Array<string> = [
    '../../assets/food_header_background_0.jpg',
    '../../assets/food_header_background_1.jpg',
    '../../assets/food_header_background_2.jpg',
    '../../assets/food_header_background_3.jpg',
    '../../assets/food_header_background_4.jpg'
  ];

  randomImageUrl: string;

  save(data): void {
    this.loginStatus = data;
    // console.log(this.loginStatus);
  }

  constructor() {
  }

  ngOnInit(): void {
    this.randomImageUrl = this.randomBackgroundImageUrl();
    if (localStorage.getItem('register')) {
      this.loginStatus = false;
      localStorage.removeItem('register');
    }
  }


  toggleLoginStatus(): void {
    this.loginStatus = !this.loginStatus;
    this.randomImageUrl = this.randomBackgroundImageUrl();
  }

  randomBackgroundImageUrl(): string {
    return this.urlLinks[Math.floor(Math.random() * this.urlLinks.length)];
  }
}
