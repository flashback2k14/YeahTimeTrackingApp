import { Injectable } from '@angular/core';
import { AUTH_TYPE, HttpService } from './http.service';

import { StorageKeys } from './../shared';
import { Router } from '@angular/router';

export interface LoginResult {
  success: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private _httpService: HttpService, private _router: Router) {}

  public isLoggedIn(): boolean {
    const valid = localStorage.getItem(StorageKeys.USER_LOGGED_IN) ?? false;
    if (!valid) {
      return false;
    }
    return JSON.parse(valid) as boolean;
  }

  public async login(username: string, password: string): Promise<void> {
    this._httpService
      .get<LoginResult>('/check-user', AUTH_TYPE.USER)
      .subscribe({
        next: (value: LoginResult) => {
          if (value.success) {
            const login = Buffer.from(
              `${username}:${password}`,
              'base64'
            ).toString('utf8');

            localStorage.setItem(StorageKeys.USER_LOGGED_IN, 'true');
            localStorage.setItem(StorageKeys.USER_LOGIN, login);
            localStorage.setItem(StorageKeys.USER_NAME, username);
            this._router.navigate(['/dashboard']);
          } else {
            localStorage.setItem(StorageKeys.USER_LOGGED_IN, 'false');
          }
        },
        error: (error: unknown) => console.error(error),
      });
  }

  public logout(): void {
    localStorage.removeItem(StorageKeys.USER_LOGGED_IN);
    localStorage.removeItem(StorageKeys.USER_LOGIN);
    localStorage.removeItem(StorageKeys.USER_NAME);
  }
}