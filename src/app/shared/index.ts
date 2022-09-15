import { InjectionToken } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatDividerModule } from '@angular/material/divider';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatTabsModule } from '@angular/material/tabs';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatChipsModule } from '@angular/material/chips';

export const API_BASE_URL: InjectionToken<string> = new InjectionToken<string>(
  'API_BASE_URL'
);

export class StorageKeys {
  public static API_TOKEN = 'ytt:api:token';
  public static USER_NAME = 'ytt:user:name';
  public static USER_LOGIN = 'ytt:user:login';
  public static USER_LOGGED_IN = 'ytt:user:logged:in';
  public static TIME_TRACKING_ACTIONS = 'ytt:actions';
}

export enum ActionCardModificationType {
  CREATE,
  UPDATE,
  DELETE,
}

export interface ActionCardModificationData {
  type: ActionCardModificationType;
  action: TimeTrackingAction;
}

export interface TimeTrackingAction {
  id: string;
  name: string;
  type: string;
}

export interface TimeTrackingActionExtended {
  id: string;
  name: string;
  type: string;
  isStarted: boolean;
}

export interface ActiveTasksResponse {
  active_tasks: string[];
}

export interface ExportFile {
  apiToken: string;
  actions: string;
}

export const rootComponentModules = [
  CommonModule,
  RouterModule,
  MatToolbarModule,
  MatSidenavModule,
  MatListModule,
  MatTabsModule,
  MatIconModule,
  MatButtonModule,
];

export const authComponentModules = [
  CommonModule,
  MatCardModule,
  MatButtonModule,
  MatDividerModule,
  MatFormFieldModule,
  MatInputModule,
  MatIconModule,
];

export const settingComponentModules = [
  CommonModule,
  FormsModule,
  MatFormFieldModule,
  MatInputModule,
  MatButtonModule,
  MatIconModule,
  MatSnackBarModule,
  MatDialogModule,
];

export const exportDialogComponentModules = [
  CommonModule,
  MatDialogModule,
  MatButtonModule,
];

export const importDialogComponentModules = [
  CommonModule,
  MatDialogModule,
  MatButtonModule,
  MatFormFieldModule,
  MatInputModule,
];

export const actionCardModificationComponentModules = [
  CommonModule,
  FormsModule,
  MatDialogModule,
  MatButtonModule,
  MatFormFieldModule,
  MatInputModule,
];

export const actionSettingsCardComponentModules = [
  CommonModule,
  MatCardModule,
  MatButtonModule,
  MatIconModule,
  MatDividerModule,
];

export const actionDashboardCardComponentModules = [
  CommonModule,
  MatCardModule,
  MatButtonModule,
  MatIconModule,
];

export const dashboardComponentModules = [CommonModule, MatIconModule];

export const historyComponentModules = [
  CommonModule,
  MatTableModule,
  MatPaginatorModule,
  MatSortModule,
  MatButtonModule,
  MatIconModule,
  MatChipsModule,
];

export const createUuidV4 = () => {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (char) => {
    const random = (Math.random() * 16) | 0;
    const value = char === 'x' ? random : (random % 4) + 8;
    return value.toString(16);
  });
};

export const createNewTimeTrackingAction = (): TimeTrackingAction => {
  return {
    id: createUuidV4(),
    name: '',
    type: '',
  } as TimeTrackingAction;
};

export const toMap = (
  storageKeyValue: string
): Map<string, TimeTrackingAction> => {
  const item = localStorage.getItem(storageKeyValue);
  if (!item) {
    return new Map<string, TimeTrackingAction>();
  }

  const obj = JSON.parse(item);

  return new Map<string, TimeTrackingAction>(Object.entries(obj));
};

export const toJson = (value: Map<string, TimeTrackingAction>): string => {
  return JSON.stringify(Object.fromEntries(value));
};