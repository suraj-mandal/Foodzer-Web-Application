import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';


@Injectable()
export class AuthenticationService {

  constructor(private http: HttpClient) {
  }

  authenticateUser(data): Observable<any> {
    return this.http.post(`http://localhost:8090/auth/login/`, data);
  }

  setBearerToken(token): void {
    localStorage.setItem('authToken', token);
  }

  setUsername(data): void {
    localStorage.setItem('user', data);
  }

  getUsername(): string {
    return localStorage.getItem('user');
  }

  getBearerToken(): string {
    return localStorage.getItem('authToken');
  }

  isUserAuthenticated(): boolean {
    //  return this.http.post(`http://localhost:8085/auth/authentication/`,{},{
    //     headers:new HttpHeaders().set('Authorization',`${token}`)
    //   }).map(response=>response['isAuthenticated']).toPromise();
    // if(localStorage.getItem('authToken')){
    //   return true;
    // }else{
    //   return false;
    // }
    return !!localStorage.getItem('authToken');
  }

}
