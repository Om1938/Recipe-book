import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Recipe } from './models/recipe';

@Injectable({
  providedIn: 'root',
})
export class RecipeService {
  URI = `${environment.API_URL}/recipes`;
  constructor(private _http: HttpClient) {}

  getRecipes() {
    return this._http.get<Recipe[]>(`${this.URI}/`);
  }

  addRecipe(recipe: Recipe) {
    let headers = new HttpHeaders();
    const token = localStorage.getItem('token');
    if (token) {
      headers = headers.append('Authorization', `Bearer ${token}`);
    }
    return this._http.post(`${this.URI}/`, recipe, { headers });
  }
}
