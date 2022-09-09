import { Component, EventEmitter, Input, Output } from '@angular/core';

import {
  actionCardComponentModules,
  TimeTrackingAction,
} from '@shared/modules';

@Component({
  selector: 'ytt-action-card',
  standalone: true,
  imports: actionCardComponentModules,
  templateUrl: './action-card.component.html',
  styleUrls: ['./action-card.component.scss'],
})
export class ActionCardComponent {
  @Input() action: TimeTrackingAction;
  @Output() edit: EventEmitter<TimeTrackingAction>;
  @Output() delete: EventEmitter<TimeTrackingAction>;

  constructor() {
    this.action = {} as TimeTrackingAction;
    this.edit = new EventEmitter<TimeTrackingAction>();
    this.delete = new EventEmitter<TimeTrackingAction>();
  }

  handleEdit(): void {
    this.edit.emit(this.action);
  }

  handleDelete(): void {
    this.delete.emit(this.action);
  }
}