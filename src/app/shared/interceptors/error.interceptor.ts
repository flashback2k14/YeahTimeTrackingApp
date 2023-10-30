import { HttpEvent, HttpHandlerFn, HttpRequest } from '@angular/common/http';
import { inject } from '@angular/core';

import { Observable, catchError, throwError } from 'rxjs';

import { NotificationService } from 'src/app/core/notification.service';

export function errorInterceptor(
  req: HttpRequest<unknown>,
  next: HttpHandlerFn
): Observable<HttpEvent<unknown>> {
  const notification = inject(NotificationService);

  return next(req).pipe(
    catchError((err) => {
      notification.showError(err);
      return throwError(() => err);
    })
  );
}
