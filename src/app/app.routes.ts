import { Routes } from '@angular/router';
import { canActivateAuthGuard } from './core/auth.guard';

export const APP_ROUTES: Routes = [
  {
    path: 'dashboard',
    canActivate: [canActivateAuthGuard],
    loadComponent: () =>
      import('./domains/dashboard/dashboard.component').then(
        (c) => c.DashboardComponent
      ),
  },
  {
    path: 'history',
    canActivate: [canActivateAuthGuard],
    loadComponent: () =>
      import('./domains/history/history.component').then(
        (c) => c.HistoryComponent
      ),
  },
  {
    path: 'settings',
    canActivate: [canActivateAuthGuard],
    loadComponent: () =>
      import('./domains/settings/settings.component').then(
        (c) => c.SettingsComponent
      ),
  },
  {
    path: 'login',
    loadComponent: () =>
      import('./domains/auth/auth.component').then((c) => c.AuthComponent),
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
