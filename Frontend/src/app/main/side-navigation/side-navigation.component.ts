import {Component, OnInit} from '@angular/core';
import {Router, RoutesRecognized} from '@angular/router';
import {filter} from 'rxjs/operators';

@Component({
  selector: 'app-side-navigation',
  templateUrl: './side-navigation.component.html',
  styleUrls: ['./side-navigation.component.css']
})
export class SideNavigationComponent implements OnInit {

  prevUrl = '/';
  currentUrl = '/';
  userDetailsShow: boolean;
  username = localStorage.getItem('user');

  urlRoutes = {
    '/': true,
    '/meal': false,
    '/favorites': false,
    '/brands': false,
    '/recommended': false
  };

  constructor(private router: Router) {
    // console.log(this.router);
    this.router.events
      .pipe(filter((evt: any) => evt instanceof RoutesRecognized))
      .subscribe((events: RoutesRecognized) => {
        // console.log(events.url);
        this.prevUrl = this.currentUrl;
        this.currentUrl = events.url;
        console.log(this.currentUrl, this.prevUrl);
        this.urlRoutes[this.prevUrl] = false;
        this.urlRoutes[this.currentUrl] = true;
      });
  }

  ngOnInit(): void {
  }

  getLocationDetails(): void {
    // this.router.events
    //   .pipe(filter((evt: any) => evt instanceof RoutesRecognized))
    //   .subscribe((events: RoutesRecognized) => {
    //     console.log(events.url);
    //     // console.log('previous url', events[0].urlAfterRedirects);
    //   });
  }

  displayUserName(): void {
    this.userDetailsShow = true;
  }

  hideUserName(): void {
    this.userDetailsShow = false;
  }

  removeToken(): void {
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
    localStorage.removeItem('list');
  }

}
