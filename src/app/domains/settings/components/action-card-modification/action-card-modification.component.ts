import { Component, Inject } from '@angular/core';

import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

import {
  ActionCardModificationType,
  actionCardModificationComponentModules,
  ActionCardModificationData,
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

  constructor(
    @Inject(MAT_DIALOG_DATA) protected data: ActionCardModificationData,
    private _dialogRef: MatDialogRef<ActionCardModificationComponent>
  ) {}

  handleCancel(): void {
    this._dialogRef.close();
  }
}