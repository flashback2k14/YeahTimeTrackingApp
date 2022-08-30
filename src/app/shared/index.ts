import { InjectionToken } from '@angular/core';
import { RouterModule } from '@angular/router';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { MatTabsModule } from '@angular/material/tabs';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';

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