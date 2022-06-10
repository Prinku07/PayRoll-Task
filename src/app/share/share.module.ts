import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// custome
import { AngularMaterialModule } from './angular-material/angular-material.module';
import { HeaderComponent } from './header/header.component';
import { UnAuthorizedGuard } from '../core/Auth/auth-gaurd/unauthorized.gaurd';

const routes: Routes = [
    {
      path : 'header',
      component : HeaderComponent,
      canActivate: [UnAuthorizedGuard]
    }
]
@NgModule({
  declarations: [
   HeaderComponent,
],
imports:[
    RouterModule.forChild(routes),
    AngularMaterialModule
],
exports: [
   HeaderComponent,
   RouterModule,
   AngularMaterialModule
  ],
providers : [
    UnAuthorizedGuard
]
})
export class ShareModule { }
