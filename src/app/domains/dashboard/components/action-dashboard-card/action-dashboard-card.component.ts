import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  inject,
  Input,
  OnInit,
  signal,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

import { HttpService } from 'src/app/core/http.service';
import {
  actionDashboardCardComponentModules,
  TimeTrackingAction,
} from '@shared/modules';
import { catchError, Subject, switchMap, tap, throwError } from 'rxjs';
import { NotificationService } from 'src/app/core/notification.service';

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
  private readonly notification = inject(NotificationService);

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
          this.notification.show(
            this.started()
              ? 'notification.action.stop'
              : 'notification.action.start',
            {
              name: this.action.name,
            },
            'settings.buttons.ok'
          )
        ),
        switchMap(() =>
          this.httpservice.create('/add', { type: this.action.type }).pipe(
            catchError((error) => throwError(() => error)),
            takeUntilDestroyed(this.destroyRef)
          )
        ),
        tap(() => this.started.update((state) => !state)),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe();
  }

  handleClick(): void {
    this.triggerClick$.next();
  }
}
