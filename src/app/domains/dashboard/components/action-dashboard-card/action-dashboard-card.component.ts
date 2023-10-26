import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  inject,
  Input,
  OnInit,
  signal,
} from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

import { MatSnackBar } from '@angular/material/snack-bar';

import { HttpService } from 'src/app/core/http.service';
import {
  actionDashboardCardComponentModules,
  TimeTrackingAction,
} from '@shared/modules';
import { catchError, of, Subject, switchMap, tap, throwError } from 'rxjs';

@Component({
  selector: 'ytt-action-dashboard-card',
  templateUrl: './action-dashboard-card.component.html',
  styleUrls: ['./action-dashboard-card.component.scss'],
  standalone: true,
  imports: actionDashboardCardComponentModules,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ActionDashboardCardComponent implements OnInit {
  private readonly destroyRef = inject(DestroyRef);
  private readonly httpservice = inject(HttpService);
  private readonly snackbar = inject(MatSnackBar);

  private readonly triggerClick$ = new Subject<void>();

  protected started = signal(false);

  @Input() action = {} as TimeTrackingAction;
  @Input() set isStarted(value: boolean | null | undefined) {
    this.started.set(value ?? false);
  }

  ngOnInit(): void {
    this.triggerClick$
      .pipe(
        tap(() =>
          this.snackbar.open(
            `${this.started() ? 'Stop action:' : 'Start action:'} ${
              this.action.name
            }`,
            'Ok',
            { duration: 1500 }
          )
        ),
        switchMap(() =>
          this.httpservice.create('/add', { type: this.action.type }).pipe(
            catchError((error) => throwError(() => error)),
            takeUntilDestroyed(this.destroyRef)
          )
        ),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe(() => this.started.update((state) => !state));
  }

  handleClick(): void {
    this.triggerClick$.next();
  }
}
