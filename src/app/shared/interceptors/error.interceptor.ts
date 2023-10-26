import { HttpEvent, HttpHandlerFn, HttpRequest } from '@angular/common/http';
import { inject } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable, catchError, of, throwError } from 'rxjs';

export function errorInterceptor(
  req: HttpRequest<unknown>,
  next: HttpHandlerFn
): Observable<HttpEvent<unknown>> {
  const snackbar = inject(MatSnackBar);

  return next(req).pipe(
    catchError((err) => {
      snackbar.open(err?.error?.message ?? 'Unknown error.', 'Done');
      return throwError(() => err);
    })
  );
}
