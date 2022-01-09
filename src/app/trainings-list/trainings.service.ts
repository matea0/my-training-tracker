import {Training} from "./training.model";
import {EventEmitter, Injectable} from "@angular/core";

@Injectable(
  {
    providedIn: 'root',
  }
)
export class TrainingsService {
  trainingsChanged = new EventEmitter<Training[]>();
  private trainings: Training[] = [
    new Training('2021-11-16', 60, 'Walking'),
    new Training('2021-12-23', 60, 'Running')
  ];

  getTrainigs() {
    return this.trainings.slice();
  }

  addTraining(training: Training) {
    this.trainings.push(training);
    this.trainingsChanged.emit(this.trainings.slice());
  }
}
