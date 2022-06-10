import { NgModule } from '@angular/core';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
//Diecrtives
import { NumberOnlyDirective } from './Auth/directives/number-only.directive';
//services
import{MytaskService} from './my-task/mytask.service'
import {AuthService} from './Auth/services/auth.service'
import{LoaderService} from './share/loader.service'
//interceptor
import {Interceptor} from './Auth/services/interceptor.service';
@NgModule({
  declarations: [
    NumberOnlyDirective
  ],
  exports: [
    NumberOnlyDirective
  ],
  providers:[
    MytaskService,
    AuthService,
    LoaderService,
    {provide : HTTP_INTERCEPTORS, useClass : Interceptor, multi : true}
  ]

})
export class CoreModule { }
