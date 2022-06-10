import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public currentuserSubject: BehaviorSubject<any>;
  public currentuser: Observable<any>

  constructor(private http: HttpClient) {
    this.currentuserSubject = new BehaviorSubject((localStorage.getItem('user')));
    this.currentuser = this.currentuserSubject.asObservable();
  }


  logout() {
    localStorage.removeItem('user');
    localStorage.removeItem("token");
    this.currentuserSubject.next(null);
  }

  getToken() {
    return localStorage.getItem('token')
  }

  // Authentication/Authorization
  login(username: string, password: string) {
    return this.http.post('api/account/authenticate', { username, password });
  }
}
