import { Component, EventEmitter, Input, Output } from '@angular/core';

import {
  actionSettingsCardComponentModules,
  TimeTrackingAction,
} from '@shared/modules';

@Component({
  selector: 'ytt-action-settings-card',
  standalone: true,
  imports: actionSettingsCardComponentModules,
  templateUrl: './action-settings-card.component.html',
  styleUrls: ['./action-settings-card.component.scss'],
})
export class ActionSettingsCardComponent {
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