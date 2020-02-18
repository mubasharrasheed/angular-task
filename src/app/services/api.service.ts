import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  baseUrl = environment.base_url;
  accessToken;

  constructor(private http: HttpClient) { }

  login(email: string, password: string) {

    return this.http.post<any>(this.baseUrl + 'api/jwt/api-token-auth/', { email, password })
      .pipe(map(user => {
        console.log(user.token);
        // login successful if there's a jwt token in the response
        if (user && user.token) {
          // store user details and jwt token in local storage to keep user logged in between page refreshes
          localStorage.setItem('token', user.token);
          localStorage.setItem('currentUser', JSON.stringify(user));
        }
        return user;
      }));
  }
}
