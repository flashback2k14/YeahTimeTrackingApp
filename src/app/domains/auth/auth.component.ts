import { Component } from '@angular/core';

import { AuthService } from 'src/app/core/auth.service';
import { authComponentModules } from '@shared/modules';

@Component({
  selector: 'ytt-auth',
  standalone: true,
  imports: authComponentModules,
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
})
export class AuthComponent {
  hidePassword: boolean;

  constructor(private _authService: AuthService) {
    this.hidePassword = true;
  }

  handleLogin(username: string, password: string): void {
    this._authService.login(username, password);
  }
}