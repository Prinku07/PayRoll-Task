import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RevserGuard } from './core/my-task/gaurd/reverse.guard';
import { UnAuthorizedGuard } from './core/Auth/auth-gaurd/unauthorized.gaurd';
const routes: Routes = [
  {
    path: 'login',
    loadChildren: () => import('./Views/Auth/auth.module').then(m => m.AuthModule),
    canActivate : [RevserGuard]  
  },
  {
    path : 'task',
    loadChildren : () => import('./Views/my-task/my-task.module').then(m=> m.MyTaskModule),
    canActivate : [UnAuthorizedGuard]
  },
  {
    path : '**',
    redirectTo :  'login',
    pathMatch : 'full'
  }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
