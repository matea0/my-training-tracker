import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { AddTrainingComponent } from './add-training/add-training.component';
import { HeaderComponent } from './header/header.component';
import { TrainingListItemComponent } from './trainings-list/training-list-item/training-list-item.component';
import { TrainingsListComponent } from './trainings-list/trainings-list.component';
import { CommonModule } from "@angular/common";
import {FormsModule} from "@angular/forms";
import {AppRoutingModule} from "./app-routing.module";

@NgModule({
  declarations: [
    AppComponent,
    AddTrainingComponent,
    HeaderComponent,
    TrainingListItemComponent,
    TrainingsListComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    FormsModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
