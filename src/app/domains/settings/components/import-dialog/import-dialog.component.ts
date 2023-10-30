import { ChangeDetectionStrategy, Component, inject } from '@angular/core';

import { MatDialogRef } from '@angular/material/dialog';

import {
  StorageKeys,
  importDialogComponentModules,
  ExportFile,
} from '@shared/modules';

@Component({
  selector: 'ytt-import-dialog',
  template: `<ng-container *transloco="let t">
    <h1 mat-dialog-title>{{ t('settings.importer.title') }}</h1>
    <div mat-dialog-content>
      <p>{{ t('settings.importer.desc') }}</p>
      <mat-form-field appearance="fill">
        <mat-label>{{ t('settings.importer.label') }}</mat-label>
        <textarea #importArea matInput rows="5"></textarea>
      </mat-form-field>
    </div>
    <div mat-dialog-actions align="end">
      <button mat-button (click)="handleCancel()">
        {{ t('settings.buttons.cancel') }}
      </button>
      <button mat-button cdkFocusInitial (click)="handleOk(importArea)">
        {{ t('settings.buttons.ok') }}
      </button>
    </div>
  </ng-container>`,
  standalone: true,
  imports: importDialogComponentModules,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ImportDialogComponent {
  private readonly dialogRef = inject(MatDialogRef<ImportDialogComponent>);

  handleCancel(): void {
    this.dialogRef.close();
  }

  handleOk(importArea: HTMLTextAreaElement): void {
    const exportFile = JSON.parse(importArea.value) as ExportFile;
    localStorage.setItem(StorageKeys.API_TOKEN, exportFile.apiToken);
    localStorage.setItem(StorageKeys.TIME_TRACKING_GROUPS, exportFile.groups);
    localStorage.setItem(StorageKeys.TIME_TRACKING_ACTIONS, exportFile.actions);
    this.dialogRef.close();
  }
}
