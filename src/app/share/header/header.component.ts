import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../core/Auth/services/auth.service';
import { LoaderService } from '../../core/share/loader.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(public loaderservice : LoaderService,
    private authservice : AuthService,
    private router : Router) { }

  ngOnInit(): void {
  }

  logout(){
    this.authservice.logout()
    this.router.navigate(['login']);
  }
}
