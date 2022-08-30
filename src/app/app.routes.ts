import { Routes } from '@angular/router';
import { AuthGuard } from './core/auth.guard';

export const APP_ROUTES: Routes = [
  {
    path: 'dashboard',
    canActivate: [AuthGuard],
    loadComponent: () =>
      import('./domains/dashboard/dashboard.component').then(
        (c) => c.DashboardComponent
      ),
  },
  {
    path: 'history',
    canActivate: [AuthGuard],
    loadComponent: () =>
      import('./domains/history/history.component').then(
        (c) => c.HistoryComponent
      ),
  },
  {
    path: 'settings',
    canActivate: [AuthGuard],
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
    redirectTo: 'login',
  },
  {
    path: '**',
    redirectTo: 'login',
  },
];