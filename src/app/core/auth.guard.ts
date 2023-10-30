import { inject } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivateFn,
  Router,
  RouterStateSnapshot,
} from '@angular/router';

import { AuthService } from './auth.service';
import { NotificationService } from './notification.service';

export const canActivateAuthGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const notification = inject(NotificationService);

  if (authService.isLoggedIn()) {
    return true;
  }

  notification.showLazy('notification.auth.redirect');

  router.navigate(['login'], { queryParams: { returnUrl: state.url } });
  return false;
};
