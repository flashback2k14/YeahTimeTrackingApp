import { DestroyRef, Injectable, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HashMap, TranslocoService } from '@ngneat/transloco';

@Injectable()
export class NotificationService {
  private readonly destroyDef = inject(DestroyRef);
  private readonly snackbar = inject(MatSnackBar);
  private readonly translator = inject(TranslocoService);

  public show(
    messageKey: string,
    params?: HashMap,
    buttonKey?: string | undefined
  ) {
    this.snackbar.open(
      this.translator.translate(messageKey, { ...params }),
      buttonKey ? this.translator.translate(buttonKey) : '',
      {
        duration: 1500,
      }
    );
  }

  showLazy(messageKey: string) {
    this.translator
      .selectTranslate(messageKey)
      .pipe(takeUntilDestroyed(this.destroyDef))
      .subscribe((value) => this.snackbar.open(value, '', { duration: 2000 }));
  }

  public showError(err: any) {
    this.snackbar.open(
      err?.error?.message ??
        this.translator.translate('notification.error.default-http'),
      this.translator.translate('settings.buttons.done'),
      { duration: 3000 }
    );
  }
}
