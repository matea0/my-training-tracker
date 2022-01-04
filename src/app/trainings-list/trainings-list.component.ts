import { Component, OnInit } from '@angular/core';
import { Training } from "./training.model";
import {TrainingsService} from "./trainings.service";

@Component({
  selector: 'app-trainings-list',
  templateUrl: './trainings-list.component.html',
  styleUrls: ['./trainings-list.component.css'],
  providers: [TrainingsService]
})
export class TrainingsListComponent implements OnInit {
  trainings: Training[];

  constructor(private trainingService: TrainingsService) {
    this.trainings = [];
  }

  ngOnInit(): void {
    this.trainings = this.trainingService.getTrainigs();
  }

}
