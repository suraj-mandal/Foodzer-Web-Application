import {Injectable} from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Observable} from 'rxjs';
import {AuthenticationService} from './services/authentication.service';
import {RouterService} from './services/router.service';

@Injectable({
  providedIn: 'root'
})
export class CanActivateGuard implements CanActivate {

  constructor(private authService: AuthenticationService, private routerService: RouterService) {
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    // return true;
    if (this.authService.isUserAuthenticated()) {
      return true;
    } else {
      console.log('Going to main page');
      this.routerService.routeToLandingPage();
      return false;
    }

  }

}
