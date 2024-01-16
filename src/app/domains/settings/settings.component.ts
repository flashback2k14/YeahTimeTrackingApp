import {
  ChangeDetectionStrategy,
  Component,
  computed,
  DestroyRef,
  inject,
  signal,
} from '@angular/core';

import { MatChipInputEvent } from '@angular/material/chips';
import { MatDialog } from '@angular/material/dialog';

import { ActionCardModificationComponent } from './components/action-card-modification/action-card-modification.component';
import { ActionSettingsCardComponent } from './components/action-settings-card/action-settings-card.component';
import { ImportDialogComponent } from '../settings/components/import-dialog/import-dialog.component';
import { ExportDialogComponent } from '../settings/components/export-dialog/export-dialog.component';
import {
  ActionCardModificationData,
  ActionCardModificationType,
  APP_VERSION,
  createNewTimeTrackingAction,
  settingComponentModules,
  StorageKeys,
  TimeTrackingAction,
  toArray,
  toJson,
  toMap,
  toString,
} from '@shared/modules';
import { NotificationService } from 'src/app/core/notification.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { HttpService } from 'src/app/core/http.service';
import { map } from 'rxjs';

@Component({
  selector: 'ytt-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
  standalone: true,
  imports: [...settingComponentModules, ActionSettingsCardComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SettingsComponent {
  private readonly destroyRef = inject(DestroyRef);
  private readonly httpService = inject(HttpService);
  private readonly dialog = inject(MatDialog);
  private readonly notification = inject(NotificationService);

  protected readonly appVersion = inject(APP_VERSION);

  protected apiToken = signal(toString(StorageKeys.API_TOKEN));
  protected actionGroups = signal(toArray(StorageKeys.TIME_TRACKING_GROUPS));
  protected actions = signal(toMap(StorageKeys.TIME_TRACKING_ACTIONS));
  protected username = signal(toString(StorageKeys.USER_NAME));
  protected actionSize = computed(() => this.actions().size);

  protected apiVersion$ = this.httpService
    .get<{ version: string }>('/version')
    .pipe(map((result) => result.version));

  protected ActionCardModificationType = ActionCardModificationType;

  /**
   * API TOKEN
   */

  handleSaveApiToken(): void {
    this.notification.show('notification.save.token');
    localStorage.setItem(StorageKeys.API_TOKEN, this.apiToken());
  }

  /**
   * ACTION GROUPS
   */

  addActionGroupFromInput(event: MatChipInputEvent) {
    if (event.value) {
      this.actionGroups.update((groups) => {
        groups.push(event.value);
        return [...groups];
      });
      event.chipInput!.clear();
    }
  }

  removeActionGroup(actionGroup: string): void {
    this.actionGroups.update((groups) =>
      groups.filter((group: string) => group !== actionGroup),
    );
  }

  handleSaveActionGroups(): void {
    this.notification.show('notification.save.groups');
    localStorage.setItem(
      StorageKeys.TIME_TRACKING_GROUPS,
      JSON.stringify(this.actionGroups()),
    );
  }

  /**
   * TIME TRACKING ACTIONS
   */

  handleOpenActionCardModification(
    type: ActionCardModificationType,
    action: TimeTrackingAction = createNewTimeTrackingAction(),
  ): void {
    this.dialog
      .open(ActionCardModificationComponent, {
        width: '400px',
        disableClose: true,
        data: {
          type,
          action: { ...action },
        } as ActionCardModificationData,
      })
      .afterClosed()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((data: ActionCardModificationData) => {
        switch (data.type) {
          case ActionCardModificationType.CREATE:
          case ActionCardModificationType.UPDATE:
            this.actions.update((actions) => {
              actions.set(data.action.id, data.action);
              return new Map(actions);
            });
            break;

          case ActionCardModificationType.DELETE:
            this.actions.update((actions) => {
              actions.delete(data.action.id);
              return new Map(actions);
            });
            break;

          case ActionCardModificationType.CANCEL:
          default:
            break;
        }

        localStorage.setItem(
          StorageKeys.TIME_TRACKING_ACTIONS,
          toJson(this.actions()),
        );
      });
  }

  /**
   * ACTIONS
   */

  handleOpenImport(): void {
    this.dialog
      .open(ImportDialogComponent, {
        width: '400px',
        disableClose: true,
      })
      .afterClosed()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(() => {
        this.apiToken.set(toString(StorageKeys.API_TOKEN) ?? '');
        this.actionGroups.set(toArray(StorageKeys.TIME_TRACKING_GROUPS));
        this.actions.set(toMap(StorageKeys.TIME_TRACKING_ACTIONS));
      });
  }

  handleOpenExport(): void {
    this.dialog.open(ExportDialogComponent, {
      width: '400px',
      disableClose: true,
    });
  }
}
