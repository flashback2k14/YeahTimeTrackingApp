import { Component } from '@angular/core';

import { MatChipInputEvent } from '@angular/material/chips';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';

import { ActionCardModificationComponent } from './components/action-card-modification/action-card-modification.component';
import { ActionSettingsCardComponent } from './components/action-settings-card/action-settings-card.component';
import { ImportDialogComponent } from '../settings/components/import-dialog/import-dialog.component';
import { ExportDialogComponent } from '../settings/components/export-dialog/export-dialog.component';
import {
  ActionCardModificationData,
  ActionCardModificationType,
  createNewTimeTrackingAction,
  settingComponentModules,
  StorageKeys,
  TimeTrackingAction,
  toArray,
  toJson,
  toMap,
  toString,
} from '@shared/modules';

@Component({
  selector: 'ytt-settings',
  standalone: true,
  imports: [...settingComponentModules, ActionSettingsCardComponent],
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
})
export class SettingsComponent {
  ActionCardModificationType = ActionCardModificationType;
  apiToken: string;
  actionGroups: string[];
  actions: Map<string, TimeTrackingAction>;

  constructor(private _dialog: MatDialog, private _snackbar: MatSnackBar) {
    this.apiToken = toString(StorageKeys.API_TOKEN);
    this.actionGroups = toArray(StorageKeys.TIME_TRACKING_GROUPS);
    this.actions = toMap(StorageKeys.TIME_TRACKING_ACTIONS);
  }

  /**
   * API TOKEN
   */

  handleSaveApiToken(): void {
    this._snackbar.open('Saving API token...', '', { duration: 1000 });
    localStorage.setItem(StorageKeys.API_TOKEN, this.apiToken);
  }

  /**
   * ACTION GROUPS
   */

  addActionGroupFromInput(event: MatChipInputEvent) {
    if (event.value) {
      this.actionGroups.push(event.value);
      event.chipInput!.clear();
    }
  }

  removeActionGroup(actionGroup: string): void {
    this.actionGroups = this.actionGroups.filter(
      (group: string) => group !== actionGroup
    );
  }

  handleSaveActionGroups(): void {
    this._snackbar.open('Saving action groups...', '', { duration: 1000 });
    localStorage.setItem(
      StorageKeys.TIME_TRACKING_GROUPS,
      JSON.stringify(this.actionGroups)
    );
  }

  /**
   * TIME TRACKING ACTIONS
   */

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

  /**
   * ACTIONS
   */

  handleOpenImport(): void {
    this._dialog
      .open(ImportDialogComponent, {
        width: '400px',
        disableClose: true,
      })
      .afterClosed()
      .subscribe(() => {
        this.apiToken = toString(StorageKeys.API_TOKEN) ?? '';
        this.actionGroups = toArray(StorageKeys.TIME_TRACKING_GROUPS);
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