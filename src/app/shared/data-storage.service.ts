import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {map} from "rxjs";

import {TrainingsService} from "../trainings-list/trainings.service";
import {Training} from "../trainings-list/training.model";

@Injectable({providedIn: 'root'})
export class DataStorageService {
  constructor(
    private http: HttpClient,
    private trainingService: TrainingsService
  ) {}

  storeTrainings() {
  const trainings = this.trainingService.getTrainigs();
  this.http
    .put('https://my-training-tracker-default-rtdb.europe-west1.firebasedatabase.app/trainings.json',
      trainings
    )
    .subscribe(response => {
      console.log(response);
    });
  }

  fetchTrainings() {
      this.http
        .get<Training[]>(
          'https://my-training-tracker-default-rtdb.europe-west1.firebasedatabase.app/trainings.json',
        ).pipe(
          map(training => {//array operator
            return training.map(training => {
              return {...training,
              date: training.date ? training.date : ""};
        });
      })).subscribe(trainings => {
        this.trainingService.setTrainings(trainings);
      });
  }
}
