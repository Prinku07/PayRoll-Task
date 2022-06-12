import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
// components
import { LoginComponent } from './login/login.component';
import { RevserGuard } from '../../core/my-task/gaurd/reverse.guard';
import { CoreModule } from 'src/app/core/core.module';
import { ShareModule } from 'src/app/share/share.module';
import { LoaderService } from 'src/app/core/share/loader.service';
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
    RevserGuard,
    LoaderService
  ]
})
export class AuthModule { }