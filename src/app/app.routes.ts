import { Routes } from '@angular/router';

export const APP_ROUTES: Routes = [
  {
    path: 'dashboard',
    loadComponent: () =>
      import('./domains/dashboard/dashboard.component').then(
        (c) => c.DashboardComponent
      ),
  },
  {
    path: 'settings',
    loadComponent: () =>
      import('./domains/settings/settings.component').then(
        (c) => c.SettingsComponent
      ),
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'dashboard',
  },
  {
    path: '**',
    redirectTo: 'dashboard',
  },
];