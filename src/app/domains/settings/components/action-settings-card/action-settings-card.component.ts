import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';

import {
  actionSettingsCardComponentModules,
  TimeTrackingAction,
} from '@shared/modules';

@Component({
  selector: 'ytt-action-settings-card',
  template: `<mat-card appearance="outlined">
    <mat-card-content>
      <h3>Action: {{ action.name }}</h3>
      <mat-divider></mat-divider>
      <p>Type: {{ action.type }}</p>
      <p>Group: {{ action.group }}</p>
    </mat-card-content>

    <mat-card-actions align="end">
      <button mat-icon-button (click)="handleEdit()">
        <mat-icon svgIcon="edit"></mat-icon>
      </button>

      <button mat-icon-button color="warn" (click)="handleDelete()">
        <mat-icon svgIcon="delete"></mat-icon>
      </button>
    </mat-card-actions>
  </mat-card> `,
  styles: [
    `
      h3 {
        margin-bottom: 2px;
      }

      h3,
      p {
        word-break: break-all;
      }
    `,
  ],
  standalone: true,
  imports: actionSettingsCardComponentModules,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ActionSettingsCardComponent {
  @Input() action = {} as TimeTrackingAction;
  @Output() edit = new EventEmitter<TimeTrackingAction>();
  @Output() delete = new EventEmitter<TimeTrackingAction>();

  handleEdit(): void {
    this.edit.emit(this.action);
  }

  handleDelete(): void {
    this.delete.emit(this.action);
  }
}
