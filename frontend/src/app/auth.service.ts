import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Recipe } from './models/recipe';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  URI = `${environment.API_URL}/user`;

  constructor(private _http: HttpClient) {}

  login(username: string, password: string) {
    return this._http.post(`${this.URI}/login`, { username, password });
  }
}
