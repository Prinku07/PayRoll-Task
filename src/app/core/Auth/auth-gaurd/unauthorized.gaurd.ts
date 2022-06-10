import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UnAuthorizedGuard implements CanActivate {

    constructor(
        private router: Router,
        ) {};

canActivate(): boolean  {

    const user = localStorage.getItem('user');
    if(user){
      return true;
    }
    alert("you are not logged in")
    this.router.navigate(['/Login'])
    return false
  }
    
}
