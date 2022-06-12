import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) {}

  logout() {
    localStorage.removeItem('user');
    localStorage.removeItem("token");
  }

  isLoggedIn() {
    return !!localStorage.getItem('user');
  }

  getToken() {
    return localStorage.getItem('token')
  }

  // Authentication/Authorization
  login(username: string, password: string) {
    return this.http.post('api/account/authenticate', { username, password });
  }
}
