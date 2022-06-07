import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
// costom module
import { CoreModule } from '../core/core.module';
import { AngularMaterialModule } from '../angular-material/angular-material.module';
// components
import { LoginComponent } from './login/login.component';
import { MyTaskComponent } from './my-task/my-task.component';
import { AddTaskComponent } from './my-task/add-task/add-task.component';


const routes: Routes = [
  {
    path: '',
    component: LoginComponent

  },
  {
    path: 'mytask',
    component: MyTaskComponent
  },
  {
    path: 'addtask',
    component: AddTaskComponent
  }
];

@NgModule({
  declarations: [
    LoginComponent,
    MyTaskComponent,
    AddTaskComponent
  ],
  imports: [

    ReactiveFormsModule,
    AngularMaterialModule,
    HttpClientModule,
    CoreModule,
    RouterModule.forChild(routes)
  ],
  entryComponents:[
    AddTaskComponent
  ]
})
export class PagesModule { }