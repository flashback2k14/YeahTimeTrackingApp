import { Component } from '@angular/core';

import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';

import { ImportDialogComponent } from '../settings/components/import-dialog/import-dialog.component';
import { ExportDialogComponent } from '../settings/components/export-dialog/export-dialog.component';
import { settingComponentModules, StorageKeys } from '@shared/modules';

@Component({
  selector: 'ytt-settings',
  standalone: true,
  imports: settingComponentModules,
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
})
export class SettingsComponent {
  apiToken: string;

  constructor(private _dialog: MatDialog, private _snackbar: MatSnackBar) {
    this.apiToken = localStorage.getItem(StorageKeys.API_TOKEN) ?? '';
  }

  handleSaveApiToken(): void {
    this._snackbar.open('Saving API token...', '', { duration: 1000 });
    localStorage.setItem(StorageKeys.API_TOKEN, this.apiToken);
  }

  handleOpenImport(): void {
    this._dialog
      .open(ImportDialogComponent, { disableClose: true })
      .afterClosed()
      .subscribe(() => {
        this.apiToken = localStorage.getItem(StorageKeys.API_TOKEN) ?? '';
      });
  }

  handleOpenExport(): void {
    this._dialog.open(ExportDialogComponent, { disableClose: true });
  }
}