import { NgModule } from "@angular/core";
import {TrainingsListComponent} from "./trainings-list/trainings-list.component";
import {AddTrainingComponent} from "./add-training/add-training.component";
import {RouterModule, Routes} from "@angular/router";

const appRoutes: Routes = [
  {path: '', redirectTo: '/trainings', pathMatch: 'full'},
  {path: 'trainings', component: TrainingsListComponent},
  {path: 'add-training', component: AddTrainingComponent}
]

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class  AppRoutingModule {

}
