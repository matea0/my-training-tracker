import { Component, OnInit, Input } from '@angular/core';
import { Training } from "../training.model";
import {TrainingsService} from "../trainings.service";

@Component({
  selector: 'app-training-list-item',
  templateUrl: './training-list-item.component.html',
  styleUrls: ['./training-list-item.component.css']
})
export class TrainingListItemComponent implements OnInit {
  @Input() training: Training;

  constructor(private trainingService: TrainingsService) {
    this.training = {
      date: "",
      duration: 0,
      type: ""
    }
  }

  ngOnInit(): void {
  }

  onDelete() {
    this.trainingService.deleteTraining(this.training);
  }
}
