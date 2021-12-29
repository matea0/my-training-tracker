import { Component, OnInit, Input } from '@angular/core';
import { Training } from "../training.model";

@Component({
  selector: 'app-training-list-item',
  templateUrl: './training-list-item.component.html',
  styleUrls: ['./training-list-item.component.css']
})
export class TrainingListItemComponent implements OnInit {
  @Input() training: Training;

  constructor() {
    this.training = {
      type: "Papanje",
      duration: 100,
      date: "22.11.2021."
    }
  }

  ngOnInit(): void {
  }

}
