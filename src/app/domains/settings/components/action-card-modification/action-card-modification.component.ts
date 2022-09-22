import { Component, Inject } from '@angular/core';

import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

import {
  ActionCardModificationType,
  actionCardModificationComponentModules,
  ActionCardModificationData,
  toArray,
  StorageKeys,
} from '@shared/modules';

@Component({
  selector: 'ytt-action-card-modification',
  standalone: true,
  imports: actionCardModificationComponentModules,
  templateUrl: './action-card-modification.component.html',
  styleUrls: ['./action-card-modification.component.scss'],
})
export class ActionCardModificationComponent {
  ActionCardModificationType = ActionCardModificationType;
  actionGroups: string[];

  constructor(
    @Inject(MAT_DIALOG_DATA) protected data: ActionCardModificationData,
    private _dialogRef: MatDialogRef<ActionCardModificationComponent>
  ) {
    this.actionGroups = toArray(StorageKeys.TIME_TRACKING_GROUPS);
  }

  handleCancel(): void {
    this._dialogRef.close();
  }
}