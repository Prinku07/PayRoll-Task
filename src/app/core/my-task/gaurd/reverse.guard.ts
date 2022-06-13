import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class RevserGuard implements CanActivate {


constructor( 
  private router: Router,
  ) { };


  canActivate() {
    const user = (localStorage.getItem('user'));
    if(!user){
        return true;
    }
    this.router.navigate(['task'])
    return false;
  }
  }
