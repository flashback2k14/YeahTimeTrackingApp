import { RouterModule } from '@angular/router';
import {
  DatePipe,
  KeyValuePipe,
  NgClass,
  NgFor,
  NgForOf,
  NgIf,
} from '@angular/common';
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
import { MatChipsModule } from '@angular/material/chips';
import { MatTableModule } from '@angular/material/table';
import { MatListModule } from '@angular/material/list';
import { MatTabsModule } from '@angular/material/tabs';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatSortModule } from '@angular/material/sort';
import { MatSelectModule } from '@angular/material/select';
import { TranslocoDirective, TranslocoPipe } from '@ngneat/transloco';

export const rootComponentModules = [
  NgIf,
  NgForOf,
  RouterModule,
  MatToolbarModule,
  MatSidenavModule,
  MatListModule,
  MatTabsModule,
  MatIconModule,
  MatButtonModule,
  TranslocoPipe,
];

export const authComponentModules = [
  MatCardModule,
  MatButtonModule,
  MatDividerModule,
  MatFormFieldModule,
  MatInputModule,
  MatIconModule,
  TranslocoDirective,
];

export const settingComponentModules = [
  NgIf,
  NgForOf,
  KeyValuePipe,
  FormsModule,
  MatFormFieldModule,
  MatInputModule,
  MatButtonModule,
  MatIconModule,
  MatSnackBarModule,
  MatDialogModule,
  MatChipsModule,
  TranslocoDirective,
];

export const exportDialogComponentModules = [
  MatDialogModule,
  MatButtonModule,
  TranslocoDirective,
];

export const importDialogComponentModules = [
  MatDialogModule,
  MatButtonModule,
  MatFormFieldModule,
  MatInputModule,
  TranslocoDirective,
];

export const actionCardModificationComponentModules = [
  NgIf,
  NgForOf,
  FormsModule,
  MatDialogModule,
  MatButtonModule,
  MatFormFieldModule,
  MatInputModule,
  MatSelectModule,
  TranslocoDirective,
];

export const actionSettingsCardComponentModules = [
  MatCardModule,
  MatButtonModule,
  MatIconModule,
  MatDividerModule,
  TranslocoDirective,
];

export const actionDashboardCardComponentModules = [
  MatCardModule,
  MatButtonModule,
  MatIconModule,
  TranslocoDirective,
];

export const dashboardComponentModules = [
  NgFor,
  NgIf,
  KeyValuePipe,
  MatIconModule,
  MatDividerModule,
  TranslocoDirective,
];

export const historyComponentModules = [
  NgClass,
  NgIf,
  DatePipe,
  MatTableModule,
  MatPaginatorModule,
  MatSortModule,
  MatButtonModule,
  MatIconModule,
  MatChipsModule,
  TranslocoDirective,
];
