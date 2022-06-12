import { Component } from '@angular/core';
import { AuthService } from './core/Auth/services/auth.service';
import { LoaderService } from './core/share/loader.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'payroll-task';

  constructor(public authservice : AuthService,
    public loaderservice : LoaderService) {
  }
}
