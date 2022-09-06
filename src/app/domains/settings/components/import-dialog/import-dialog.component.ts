import { Component } from '@angular/core';

import { MatDialogRef } from '@angular/material/dialog';

import {
  StorageKeys,
  importDialogComponentModules,
  ExportFile,
} from '@shared/modules';

@Component({
  selector: 'ytt-import-dialog',
  standalone: true,
  imports: importDialogComponentModules,
  templateUrl: './import-dialog.component.html',
  styleUrls: ['./import-dialog.component.scss'],
})
export class ImportDialogComponent {
  constructor(private _dialogRef: MatDialogRef<ImportDialogComponent>) {}

  handleCancel(): void {
    this._dialogRef.close();
  }

  handleOk(importArea: HTMLTextAreaElement): void {
    const exportFile = JSON.parse(importArea.value) as ExportFile;
    localStorage.setItem(StorageKeys.API_TOKEN, exportFile.apiToken);
    this._dialogRef.close();
  }
}