import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PagesModule } from './Pages/pages.module';

const routes: Routes = [
  {
    path: 'Pages',
    loadChildren: () => import('./Pages/pages.module').then(m => m.PagesModule)
  },

];

@NgModule({
  imports: [
    PagesModule,
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
