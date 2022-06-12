import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { ToastrModule } from 'ngx-toastr';

import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// component
import { AppComponent } from './app.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
//module
import { AuthModule } from './Views/Auth/auth.module';
import { MyTaskModule } from './Views/my-task/my-task.module';
import { ShareModule } from './share/share.module';
import { CoreModule } from './core/core.module';
import { LoaderService } from './core/share/loader.service';
import { NgHttpLoaderModule } from 'ng-http-loader';

//Toaster service
@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
  BrowserModule,
  BrowserAnimationsModule,
  AuthModule,
  MyTaskModule,
  ShareModule,
  CoreModule,
  ToastrModule.forRoot(),
  NgHttpLoaderModule.forRoot(),
  AppRoutingModule,
  ],
  providers: [
    LoaderService
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }