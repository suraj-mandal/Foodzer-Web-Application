import {Injectable} from '@angular/core';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class RouterService {

  constructor(private router: Router) {
  }

  routeToLogin(): void {
    this.router.navigate(['auth']);
  }

  routeToMain(): void {
    this.router.navigate(['']);
    // implementing routing to main component
  }

  routeToLandingPage(): void {
    this.router.navigate(['intro']);
  }


}
