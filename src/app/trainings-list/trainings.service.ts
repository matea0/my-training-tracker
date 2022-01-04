import {Training} from "./training.model";

export class TrainingsService {
  private trainings: Training[] = [
    new Training('16.11.2021', 60, 'Walking'),
    new Training('16.11.2021', 60, 'Running')
  ];

  getTrainigs() {
    return this.trainings.slice();
  }
}
