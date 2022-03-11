import { Component, OnInit, Input } from '@angular/core';
import { Training } from "../training.model";
import {TrainingsService} from "../trainings.service";
import {DataStorageService} from "../../shared/data-storage.service";
import {Data} from "@angular/router";

@Component({
  selector: 'app-training-list-item',
  templateUrl: './training-list-item.component.html',
  styleUrls: ['./training-list-item.component.css']
})
export class TrainingListItemComponent implements OnInit {
  @Input() training: Training;

  constructor(private trainingService: TrainingsService, private dsService: DataStorageService) {
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
    this.dsService.storeTrainings();
  }
}
