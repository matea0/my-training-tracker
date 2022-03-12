import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { AddTrainingComponent } from './add-training/add-training.component';
import { HeaderComponent } from './header/header.component';
import { TrainingListItemComponent } from './trainings-list/training-list-item/training-list-item.component';
import { TrainingsListComponent } from './trainings-list/trainings-list.component';
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";

import {AppRoutingModule} from "./app-routing.module";
import {TrainingsService} from "./trainings-list/trainings.service";
import {AuthComponent} from "./auth/auth.component";
import {LoadingSpinnerComponent} from "./shared/loading-spinner/loading-spinner.component";
import {AuthInterceptorService} from "./auth/auth-interceptor.service";

@NgModule({
  declarations: [
    AppComponent,
    AddTrainingComponent,
    HeaderComponent,
    TrainingListItemComponent,
    TrainingsListComponent,
    AuthComponent,
    LoadingSpinnerComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [
    TrainingsService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true
    }],
  bootstrap: [AppComponent]
})
export class AppModule { }
