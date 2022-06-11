import { NgModule } from '@angular/core';
import { RouterModule} from '@angular/router';

// custome
import { AngularMaterialModule } from './angular-material/angular-material.module';
import { HeaderComponent } from './header/header.component';
import { UnAuthorizedGuard } from '../core/Auth/auth-gaurd/unauthorized.gaurd';
@NgModule({
  declarations: [
   HeaderComponent,
],
imports:[
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
