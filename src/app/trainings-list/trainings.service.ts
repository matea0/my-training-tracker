import {Training} from "./training.model";
import {EventEmitter, Injectable} from "@angular/core";

@Injectable(
  {
    providedIn: 'root',
  }
)
export class TrainingsService {
  trainingsChanged = new EventEmitter<Training[]>();
  index: number = 0;

  private trainings: Training[] = [
    new Training('2021-11-16', 60, 'Walking'),
    new Training('2021-12-23', 60, 'Running')
  ];

  getTrainigs() {
    return this.trainings.slice();
  }

  getIndex(aTraining: Training) {
    return this.trainings.findIndex(i => i === aTraining);
  }

  addTraining(training: Training) {
    this.trainings.push(training);
    console.log(this.trainings);
    this.trainingsChanged.emit(this.trainings.slice());
  }

  deleteTraining(aTraining: Training) {
    this.index = this.getIndex(aTraining);
    this.trainings.splice(this.index, 1);
    this.trainingsChanged.emit(this.trainings.slice());
  }
}
