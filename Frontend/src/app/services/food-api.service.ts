import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FoodApiService {

  API_KEY = 'F2uzW083RvHSDuwa3iVM0faQHrJAKY97iDwOkFiJ';

  constructor(private httpClient: HttpClient) {
  }

  getAllFoods(params: any): Observable<any> {

    return this.httpClient.get(
      `https://api.nal.usda.gov/fdc/v1/foods/search`,
      {
        params: new HttpParams().appendAll({api_key: this.API_KEY, ...params})
      }
    );
  }

  getFood(fdcId): Observable<any> {
    return this.httpClient.get(
      `https://api.nal.usda.gov/fdc/v1/food/${fdcId}`,
      {
        params: new HttpParams().appendAll({api_key: this.API_KEY})
      }
    );
  }

  getFoodsByFdcIds(fdcIdList: string[]): Observable<any> {
    return this.httpClient.get(
      'https://api.nal.usda.gov/fdc/v1/foods',
      {
        params: new HttpParams().appendAll({api_key: this.API_KEY, fdcIds: fdcIdList})
      }
    );
  }

}
