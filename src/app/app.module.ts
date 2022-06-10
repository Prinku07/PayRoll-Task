import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { ToastrModule } from 'ngx-toastr';

import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
// component
import { AppComponent } from './app.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
//module
import { AuthModule } from './Views/Auth/auth.module';
import { MyTaskModule } from './Views/my-task/my-task.module';
import { AngularMaterialModule } from './share/angular-material/angular-material.module';

//Toaster service
@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
  BrowserModule,
  BrowserAnimationsModule,
  HttpClientModule,
  ReactiveFormsModule,
  AuthModule,
  MyTaskModule,
  ToastrModule.forRoot(),
    AngularMaterialModule,
    AppRoutingModule,
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }