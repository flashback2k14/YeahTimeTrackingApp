import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TimeTrackingAction } from '@shared/modules';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'ytt-action-card',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule, MatIconModule],
  templateUrl: './action-card.component.html',
  styleUrls: ['./action-card.component.scss'],
})
export class ActionCardComponent {
  @Input() action: TimeTrackingAction;

  constructor() {
    this.action = {} as TimeTrackingAction;
  }

  handleEdit(): void {}

  handleDelete(): void {}
}