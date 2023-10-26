import {
  ChangeDetectionStrategy,
  Component,
  Inject,
  inject,
  signal,
} from '@angular/core';

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
  templateUrl: './action-card-modification.component.html',
  standalone: true,
  imports: actionCardModificationComponentModules,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ActionCardModificationComponent {
  private readonly dialogRef = inject(
    MatDialogRef<ActionCardModificationComponent>
  );

  protected data = inject(MAT_DIALOG_DATA) as ActionCardModificationData;

  protected actionGroups = signal(toArray(StorageKeys.TIME_TRACKING_GROUPS));
  protected ActionCardModificationType = ActionCardModificationType;

  handleCancel(): void {
    this.dialogRef.close();
  }
}
