import { Component } from '@angular/core';

import { MatDialogRef } from '@angular/material/dialog';

import {
  StorageKeys,
  exportDialogComponentModules,
  ExportFile,
  toMap,
} from '@shared/modules';

@Component({
  selector: 'ytt-export-dialog',
  standalone: true,
  imports: exportDialogComponentModules,
  templateUrl: './export-dialog.component.html',
  styleUrls: ['./export-dialog.component.scss'],
})
export class ExportDialogComponent {
  constructor(private _dialogRef: MatDialogRef<ExportDialogComponent>) {}

  handleCancel(): void {
    this._dialogRef.close();
  }

  handleOk(): void {
    const content = {
      apiToken: localStorage.getItem(StorageKeys.API_TOKEN) ?? '',
      actions: localStorage.getItem(StorageKeys.TIME_TRACKING_ACTIONS) ?? '',
    } as ExportFile;

    this._createExportFile(content);

    this._dialogRef.close();
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