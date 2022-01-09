import {Component, OnInit} from '@angular/core';
import {NgForm} from '@angular/forms';

import {Training} from "../trainings-list/training.model";
import {TrainingsService} from "../trainings-list/trainings.service";


@Component({
  selector: 'app-add-training',
  templateUrl: './add-training.component.html',
  styleUrls: ['./add-training.component.css']
})
export class AddTrainingComponent implements OnInit {

  constructor(private trainingService: TrainingsService) { }

  ngOnInit(): void {
  }

  onAddTraining(form: NgForm) {
    const value = form.value;
    const newTraining = new Training(value.date, value.duration, value.type);
    this.trainingService.addTraining(newTraining);
  }
}
