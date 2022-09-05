import { InjectionToken } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatTabsModule } from '@angular/material/tabs';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';

export const API_BASE_URL: InjectionToken<string> = new InjectionToken<string>(
  'API_BASE_URL'
);

export class StorageKeys {
  public static API_TOKEN = 'ytt:api:token';
  public static USER_NAME = 'ytt:user:name';
  public static USER_LOGIN = 'ytt:user:login';
  public static USER_LOGGED_IN = 'ytt:user:logged:in';
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