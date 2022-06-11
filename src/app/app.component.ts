import { Component } from '@angular/core';
import { AuthService } from './core/Auth/services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'payroll-task';
  userr: any;

  constructor(public authservice : AuthService) {
    // this.authservice.currentuser.subscribe(res=>{
    //   console.log(res)
    //   this.userr = res;
    // })
  }
}
