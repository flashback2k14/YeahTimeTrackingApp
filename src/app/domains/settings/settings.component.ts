import { Component } from '@angular/core';

import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';

import { ImportDialogComponent } from '../settings/components/import-dialog/import-dialog.component';
import { ExportDialogComponent } from '../settings/components/export-dialog/export-dialog.component';
import {
  ActionCardModificationData,
  ActionCardModificationType,
  createNewTimeTrackingAction,
  createUuidV4,
  settingComponentModules,
  StorageKeys,
  TimeTrackingAction,
  toJson,
  toMap,
} from '@shared/modules';
import { ActionCardModificationComponent } from './components/action-card-modification/action-card-modification.component';
import { ActionCardComponent } from './components/action-card/action-card.component';

@Component({
  selector: 'ytt-settings',
  standalone: true,
  imports: [...settingComponentModules, ActionCardComponent],
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
})
export class SettingsComponent {
  ActionCardModificationType = ActionCardModificationType;
  apiToken: string;
  actions: Map<string, TimeTrackingAction>;

  constructor(private _dialog: MatDialog, private _snackbar: MatSnackBar) {
    this.apiToken = localStorage.getItem(StorageKeys.API_TOKEN) ?? '';
    this.actions = toMap(StorageKeys.TIME_TRACKING_ACTIONS);
  }

  handleSaveApiToken(): void {
    this._snackbar.open('Saving API token...', '', { duration: 1000 });
    localStorage.setItem(StorageKeys.API_TOKEN, this.apiToken);
  }

  handleOpenActionCardModification(
    type: ActionCardModificationType,
    action: TimeTrackingAction = createNewTimeTrackingAction()
  ): void {
    this._dialog
      .open(ActionCardModificationComponent, {
        width: '400px',
        disableClose: true,
        data: {
          type,
          action: { ...action },
        } as ActionCardModificationData,
      })
      .afterClosed()
      .subscribe((data: ActionCardModificationData) => {
        switch (data.type) {
          case ActionCardModificationType.CREATE:
          case ActionCardModificationType.UPDATE:
            this.actions.set(data.action.id, data.action);
            break;

          case ActionCardModificationType.DELETE:
            this.actions.delete(data.action.id);
            break;

          default:
            break;
        }

        localStorage.setItem(
          StorageKeys.TIME_TRACKING_ACTIONS,
          toJson(this.actions)
        );
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
        this.actions = toMap(StorageKeys.TIME_TRACKING_ACTIONS);
      });
  }

  handleOpenExport(): void {
    this._dialog.open(ExportDialogComponent, {
      width: '400px',
      disableClose: true,
    });
  }
}