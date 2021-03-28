import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  api = 'http://localhost:8090/auth/';

  constructor(private httpClient: HttpClient) {
  }

  register(user: any): any {
    console.log('user', user); // class level mapping
    return this.httpClient.post(this.api + 'register', user); // method level mapping
  }


}
