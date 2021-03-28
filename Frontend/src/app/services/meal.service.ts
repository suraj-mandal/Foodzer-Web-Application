import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthenticationService } from './authentication.service';

@Injectable({
  providedIn: 'root'
})
export class MealService {

  constructor(private httpClient:HttpClient,private authService:AuthenticationService) { }


  addToMeal(mealName:string):Observable<any>{
    return this.httpClient.post('http://localhost:8086/nutritionApi/addMeal',{},{
      headers: new HttpHeaders().append('Authorization', `Bearer ${this.authService.getBearerToken()}`)
        .append('username', `${this.authService.getUsername()}`),
        params:new HttpParams().append('foodIds',localStorage.getItem('list')).append('mealName',mealName)}
    )
  }

  deleteMeal(Id:number): Observable<any> {
    return this.httpClient.delete(`http://localhost:8086/nutritionApi/deleteMeal/${Id}`, {
      headers: new HttpHeaders().append('Authorization', `Bearer ${this.authService.getBearerToken()}`)
        .append('username', `${this.authService.getUsername()}`)
    });
  }

  getMeals(): Observable<any> {
    return this.httpClient.get<any>('http://localhost:8085/nutritionApi/getMeals', {
      headers: new HttpHeaders().set('username', `${this.authService.getUsername()}`)
    });
  }

  getMealById(Id:number):Observable<any>{
    return this.httpClient.get<any>(`http://localhost:8085/nutritionApi/getMealFoods/${Id}`,{
      headers: new HttpHeaders().set('username', `${this.authService.getUsername()}`)
    })
  }


}
