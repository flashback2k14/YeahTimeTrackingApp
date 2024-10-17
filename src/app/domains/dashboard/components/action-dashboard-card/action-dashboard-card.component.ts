import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  inject,
  OnInit,
  output,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

import { HttpService } from 'src/app/core/http.service';
import {
  actionDashboardCardComponentModules,
  TimeTrackingActionExtended,
} from '@shared/modules';
import { catchError, exhaustMap, map, Subject, tap, throwError } from 'rxjs';
import { NotificationService } from 'src/app/core/notification.service';
import { input, computed } from '@angular/core';

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

  action = input.required<TimeTrackingActionExtended>();
  actionStateChanged = output<TimeTrackingActionExtended>();

  started = computed(() => this.action().isStarted);
  canEnterComment = computed(() => this.action().withComment);

  ngOnInit(): void {
    this.triggerClick$
      .pipe(
        map(() =>
          this.started()
            ? null
            : this.canEnterComment()
              ? prompt('Please enter your comment:', '')
              : null,
        ),
        tap((comment: string | null) =>
          this.notification.show(
            this.started()
              ? comment
                ? 'notification.start-with-comment'
                : 'notification.action.stop'
              : 'notification.action.start',
            comment
              ? {
                  name: this.action().name,
                  comment,
                }
              : {
                  name: this.action().name,
                },
            'settings.buttons.ok',
          ),
        ),
        exhaustMap((comment: string | null) =>
          this.httpservice
            .create('/add', { type: this.action().type, comment })
            .pipe(
              catchError((error) => throwError(() => error)),
              takeUntilDestroyed(this.destroyRef),
            ),
        ),
        tap(() => this.actionStateChanged.emit(this.action())),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe();
  }

  handleClick = () => this.triggerClick$.next();
}
