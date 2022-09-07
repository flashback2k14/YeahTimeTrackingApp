import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'ytt-action-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './action-card.component.html',
  styleUrls: ['./action-card.component.scss']
})
export class ActionCardComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
