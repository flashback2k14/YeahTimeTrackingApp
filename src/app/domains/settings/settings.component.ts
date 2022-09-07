import { Component } from '@angular/core';

import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';

import { ImportDialogComponent } from '../settings/components/import-dialog/import-dialog.component';
import { ExportDialogComponent } from '../settings/components/export-dialog/export-dialog.component';
import {
  ActionCardModificationData,
  ActionCardModificationType,
  settingComponentModules,
  StorageKeys,
  TimeTrackingAction,
} from '@shared/modules';
import { ActionCardModificationComponent } from './components/action-card-modification/action-card-modification.component';

@Component({
  selector: 'ytt-settings',
  standalone: true,
  imports: settingComponentModules,
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
})
export class SettingsComponent {
  apiToken: string;
  ActionCardModificationType = ActionCardModificationType;

  constructor(private _dialog: MatDialog, private _snackbar: MatSnackBar) {
    this.apiToken = localStorage.getItem(StorageKeys.API_TOKEN) ?? '';
  }

  handleSaveApiToken(): void {
    this._snackbar.open('Saving API token...', '', { duration: 1000 });
    localStorage.setItem(StorageKeys.API_TOKEN, this.apiToken);
  }

  handleOpenActionCardModification(type: ActionCardModificationType): void {
    this._dialog
      .open(ActionCardModificationComponent, {
        width: '400px',
        disableClose: true,
        data: {
          type,
          action: { id: -1, name: '', type: '' } as TimeTrackingAction,
        } as ActionCardModificationData,
      })
      .afterClosed()
      .subscribe((data: ActionCardModificationData) => {
        console.log(data);
      });
  }

  handleOpenImport(): void {
    this._dialog
      .open(ImportDialogComponent, {
        width: '400px',
        disableClose: true,
      })
      .afterClosed()
      .subscribe(() => {
        this.apiToken = localStorage.getItem(StorageKeys.API_TOKEN) ?? '';
      });
  }

  handleOpenExport(): void {
    this._dialog.open(ExportDialogComponent, {
      width: '400px',
      disableClose: true,
    });
  }
}