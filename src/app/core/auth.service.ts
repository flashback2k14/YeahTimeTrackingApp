import { HttpErrorResponse } from '@angular/common/http';
import { AUTH_TYPE, HttpService } from './http.service';
import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { MatSnackBar } from '@angular/material/snack-bar';

import { StorageKeys } from './../shared';

export interface LoginResult {
  successful: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private _snackbar: MatSnackBar;

  constructor(private _httpService: HttpService, private _router: Router) {
    this._snackbar = inject(MatSnackBar);
  }

  public isLoggedIn(): boolean {
    const valid = localStorage.getItem(StorageKeys.USER_LOGGED_IN) ?? false;
    if (!valid) {
      return false;
    }
    return JSON.parse(valid) as boolean;
  }

  public async login(username: string, password: string): Promise<void> {
    this._snackbar.open(`Logging in with user ${username}...`, '', {
      duration: 1500,
    });

    const login = btoa(`${username}:${password}`);
    localStorage.setItem(StorageKeys.USER_LOGIN, login);

    this._httpService
      .get<LoginResult>('/check-user', AUTH_TYPE.USER)
      .subscribe({
        next: (value: LoginResult) => {
          if (value.successful) {
            localStorage.setItem(StorageKeys.USER_LOGGED_IN, 'true');
            localStorage.setItem(StorageKeys.USER_NAME, username);
            this._router.navigate(['/dashboard']);
          } else {
            localStorage.setItem(StorageKeys.USER_LOGGED_IN, 'false');
          }
        },
        error: (error: HttpErrorResponse) => {
          this._snackbar.open(
            error?.error?.message ?? 'Unknown error.',
            'Done'
          );
        },
      });
  }

  public logout(): void {
    this._snackbar.open(
      `Logging out with user ${localStorage.getItem(StorageKeys.USER_NAME)}...`,
      '',
      {
        duration: 1500,
      }
    );

    localStorage.removeItem(StorageKeys.USER_LOGGED_IN);
    localStorage.removeItem(StorageKeys.USER_LOGIN);
    localStorage.removeItem(StorageKeys.USER_NAME);

    this._router.navigate(['/login']);
  }
}