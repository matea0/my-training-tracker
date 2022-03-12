import { NgModule } from "@angular/core";
import {TrainingsListComponent} from "./trainings-list/trainings-list.component";
import {AddTrainingComponent} from "./add-training/add-training.component";
import {RouterModule, Routes} from "@angular/router";
import {AuthComponent} from "./auth/auth.component";
import {AuthGuard} from "./auth/auth.guard";

const appRoutes: Routes = [
  {path: '', redirectTo: '/trainings', pathMatch: 'full'},
  {path: 'trainings', component: TrainingsListComponent, canActivate: [AuthGuard]},
  {path: 'add-training', component: AddTrainingComponent, canActivate: [AuthGuard]},
  {path: 'auth', component: AuthComponent}
]

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class  AppRoutingModule {

}
