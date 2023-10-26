import { ChangeDetectionStrategy, Component, inject } from '@angular/core';

import { MatDialogRef } from '@angular/material/dialog';

import {
  StorageKeys,
  exportDialogComponentModules,
  ExportFile,
  toString,
} from '@shared/modules';

@Component({
  selector: 'ytt-export-dialog',
  template: `<ng-container>
    <h1 mat-dialog-title>Setting exporter</h1>
    <div mat-dialog-content>
      <p>Are you sure to export your settings?</p>
    </div>

    <div mat-dialog-actions align="end">
      <button mat-button (click)="handleCancel()">Cancel</button>
      <button mat-button cdkFocusInitial (click)="handleOk()">Ok</button>
    </div>
  </ng-container>`,
  standalone: true,
  imports: exportDialogComponentModules,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ExportDialogComponent {
  private readonly dialogRef = inject(MatDialogRef<ExportDialogComponent>);

  handleCancel(): void {
    this.dialogRef.close();
  }

  handleOk(): void {
    const content = {
      apiToken: toString(StorageKeys.API_TOKEN),
      groups: toString(StorageKeys.TIME_TRACKING_GROUPS),
      actions: toString(StorageKeys.TIME_TRACKING_ACTIONS),
    } as ExportFile;

    this._createExportFile(content);

    this.dialogRef.close();
  }

  private _createExportFile(content: ExportFile): void {
    const element = document.createElement('a');
    element.setAttribute(
      'href',
      `data:text/json;charset=utf-8, ${encodeURIComponent(
        JSON.stringify(content)
      )}`
    );
    element.setAttribute('download', 'ytt-settings.json');

    element.style.display = 'none';
    document.body.appendChild(element);

    element.click();

    document.body.removeChild(element);
  }
}
