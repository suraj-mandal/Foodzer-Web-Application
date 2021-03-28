import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {AuthenticationService} from './authentication.service';
import {Food} from '../model/Food';

@Injectable({
  providedIn: 'root'
})
export class RecommendationService {

  constructor(private httpClient: HttpClient, private authService: AuthenticationService) {
  }

  getRecommendations(): Observable<any> {
    return this.httpClient.get(`http://localhost:8086/nutritionApi/getRecommendations`, {
      headers: new HttpHeaders().append('username', this.authService.getUsername())
        .append('Authorization', this.authService.getBearerToken())
    });
  }

  addRecommendation(food: Food): Observable<any> {
    return this.httpClient
      .post(`http://localhost:8086/nutritionApi/addtoRecommendation`, food, {
        headers: new HttpHeaders().append('username', this.authService.getUsername())
          .append('Authorization', this.authService.getBearerToken())
      });
  }

  deleteRecommendation(fdcId: string): Observable<any> {
    return this.httpClient
      .delete(`http://localhost:8086/nutritionApi/deleteRecommendation/${fdcId}`, {
        headers: new HttpHeaders().append('username', this.authService.getUsername())
          .append('Authorization', this.authService.getBearerToken())
      });
  }

  getRecommendationByUser(): Observable<any> {
    return this.httpClient
      .get('http://localhost:8086/nutritionApi/getRecommendationsByUser', {
        headers: new HttpHeaders().append('username', this.authService.getUsername())
          .append('Authorization', this.authService.getBearerToken())
      });
  }
}
