import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
// components
import { MyTaskComponent } from '../my-task/my-task/my-task.component';
import { AddTaskComponent } from '../my-task/add-task/add-task.component';
import { AddMembersComponent } from '../my-task/add-members/add-members.component';
import { UnAuthorizedGuard } from 'src/app/core/Auth/auth-gaurd/unauthorized.gaurd';
import { ShareModule } from 'src/app/share/share.module';
import { CoreModule } from 'src/app/core/core.module';

const routes: Routes = [
  {
    path: '',
    component: MyTaskComponent,
  }
];

@NgModule({
  declarations: [ 
    MyTaskComponent,
    AddTaskComponent,
    AddMembersComponent,
  ],
  imports: [
    RouterModule.forChild(routes),
    ShareModule,
    CoreModule,
  ],
  exports:[
    RouterModule
  ],
  entryComponents:[
    AddTaskComponent,
    AddMembersComponent,
  ],
  providers: [
    UnAuthorizedGuard,
  ]
})
export class MyTaskModule { }