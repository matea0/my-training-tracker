import {Component, OnInit} from '@angular/core';

import { Training } from "./training.model";
import {TrainingsService} from "./trainings.service";
import { DataStorageService } from "../shared/data-storage.service";

@Component({
  selector: 'app-trainings-list',
  templateUrl: './trainings-list.component.html',
  styleUrls: ['./trainings-list.component.css']
})
export class TrainingsListComponent implements OnInit{
  trainings: Training[];

  constructor(private trainingService: TrainingsService,
              private dataStorageService: DataStorageService) {
    this.trainings = [];
    this.dataStorageService.fetchTrainings();
  }

  ngOnInit(): void {
    this.trainings = this.trainingService.getTrainigs();
    this.trainingService.trainingsChanged
      .subscribe(
        (trainings: Training[]) => {
        this.trainings = trainings;
      }
    );
  }


}
