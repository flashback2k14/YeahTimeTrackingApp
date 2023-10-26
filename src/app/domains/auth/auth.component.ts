import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal,
} from '@angular/core';

import { AuthService } from 'src/app/core/auth.service';
import { authComponentModules } from '@shared/modules';

@Component({
  selector: 'ytt-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
  standalone: true,
  imports: authComponentModules,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AuthComponent {
  private readonly authService = inject(AuthService);

  protected hidePassword = signal(true);

  toggle(): void {
    this.hidePassword.update((value) => !value);
  }

  handleLogin(username: string, password: string): void {
    this.authService.login(username, password);
  }
}
