import { Routes } from '@angular/router';
import { canActivateAuthGuard } from './core/auth.guard';

export const APP_ROUTES: Routes = [
  {
    path: 'login',
    loadComponent: () =>
      import('./domains/auth/auth.component').then((c) => c.AuthComponent),
  },
  {
    path: '',
    canActivateChild: [canActivateAuthGuard],
    children: [
      {
        path: 'dashboard',
        loadComponent: () =>
          import('./domains/dashboard/dashboard.component').then(
            (c) => c.DashboardComponent
          ),
      },
      {
        path: 'history',
        loadComponent: () =>
          import('./domains/history/history.component').then(
            (c) => c.HistoryComponent
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
    ],
  },
];
