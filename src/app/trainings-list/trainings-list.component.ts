import { Component, OnInit } from '@angular/core';
import { Training } from "./training.model";

@Component({
  selector: 'app-trainings-list',
  templateUrl: './trainings-list.component.html',
  styleUrls: ['./trainings-list.component.css']
})
export class TrainingsListComponent implements OnInit {
  trainings: Training[] = [
    new Training('16.11.2021', 60, 'Walking'),
    new Training('16.11.2021', 60, 'Running')
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
