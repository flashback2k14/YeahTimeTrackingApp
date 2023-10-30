import { AUTH_TYPE, HttpService } from './http.service';
import { inject, Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { StorageKeys } from './../shared';
import { NotificationService } from './notification.service';

export interface LoginResult {
  successful: boolean;
}

@Injectable()
export class AuthService {
  private readonly httpService = inject(HttpService);
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);

  private readonly notification = inject(NotificationService);

  public isLoggedIn(): boolean {
    const valid = localStorage.getItem(StorageKeys.USER_LOGGED_IN) ?? false;
    if (!valid) {
      return false;
    }
    return JSON.parse(valid) as boolean;
  }

  public async login(username: string, password: string): Promise<void> {
    this.notification.show('notification.auth.login', { username });

    const login = btoa(`${username}:${password}`);
    localStorage.setItem(StorageKeys.USER_LOGIN, login);

    this.httpService
      .get<LoginResult>('/check-user', AUTH_TYPE.USER)
      .subscribe((value: LoginResult) => {
        if (value.successful) {
          localStorage.setItem(StorageKeys.USER_LOGGED_IN, 'true');
          localStorage.setItem(StorageKeys.USER_NAME, username);

          const returnUrl =
            this.route.snapshot?.queryParams['returnUrl'] ?? '/dashboard';
          this.router.navigateByUrl(returnUrl);
        } else {
          localStorage.setItem(StorageKeys.USER_LOGGED_IN, 'false');
        }
      });
  }

  public logout(): void {
    this.notification.show('notification.auth.logout', {
      username: localStorage.getItem(StorageKeys.USER_NAME),
    });

    localStorage.removeItem(StorageKeys.USER_LOGGED_IN);
    localStorage.removeItem(StorageKeys.USER_LOGIN);
    localStorage.removeItem(StorageKeys.USER_NAME);

    this.router.navigate(['/login']);
  }
}
