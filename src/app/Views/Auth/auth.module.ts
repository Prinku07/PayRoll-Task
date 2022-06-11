import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
// components
import { LoginComponent } from './login/login.component';
import { RevserGuard } from '../../core/Auth/auth-gaurd/reverse.guard';
import { CoreModule } from 'src/app/core/core.module';
import { ShareModule } from 'src/app/share/share.module';
const routes: Routes = [
  {
    path: '',
    component: LoginComponent, 
  },
];

@NgModule({
  declarations: [
    LoginComponent,
  ],
  imports: [
    CoreModule,
    ShareModule,
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ],
  providers: [
    RevserGuard
  ]
})
export class AuthModule { }