import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  computed,
  inject,
  signal,
  viewChild,
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

  private readonly usernameInput =
    viewChild<ElementRef<HTMLInputElement>>('username');
  private readonly passwortInput =
    viewChild<ElementRef<HTMLInputElement>>('password');

  private readonly hidePassword = signal(true);

  protected readonly inputType = computed(() =>
    this.hidePassword() ? 'password' : 'text',
  );
  protected readonly passwordVisibilityIcon = computed(() =>
    this.hidePassword() ? 'visibility_off' : 'visibility',
  );

  toggle = () => this.hidePassword.update((value) => !value);

  handleLogin = () =>
    this.authService.login(
      this.usernameInput()?.nativeElement.value ?? '',
      this.passwortInput()?.nativeElement.value ?? '',
    );
}
