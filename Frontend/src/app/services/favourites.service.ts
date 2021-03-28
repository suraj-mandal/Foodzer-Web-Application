import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {Food} from '../model/Food';
import {AuthenticationService} from './authentication.service';

@Injectable({
  providedIn: 'root'
})
export class FavouritesService {

  constructor(private httpClient: HttpClient, private authService: AuthenticationService) {
  }

  addFavourite(food: Food): Observable<any> {
    console.log(food);
    return this.httpClient.post('http://localhost:8086/nutritionApi/addFavourite', food, {
      headers: new HttpHeaders().append('Authorization', `Bearer ${this.authService.getBearerToken()}`)
        .append('username', `${this.authService.getUsername()}`)
    });
  }

  getFavourites(): Observable<Array<Food>> {
    return this.httpClient.get<Array<Food>>('http://localhost:8086/nutritionApi/getFavourites', {
      headers: new HttpHeaders().append('Authorization', `Bearer ${this.authService.getBearerToken()}`)
        .append('username', `${this.authService.getUsername()}`)
    });
  }

  deleteFavourite(fdcId: string): Observable<any> {
    return this.httpClient.delete(`http://localhost:8086/nutritionApi/deleteFavourite/${fdcId}`, {
      headers: new HttpHeaders().append('Authorization', `Bearer ${this.authService.getBearerToken()}`)
        .append('username', `${this.authService.getUsername()}`)
    });
  }
}
