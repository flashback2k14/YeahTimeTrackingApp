import { Component, DestroyRef, OnInit, inject, signal } from '@angular/core';

import { ActionDashboardCardComponent } from './components/action-dashboard-card/action-dashboard-card.component';
import { AUTH_TYPE, HttpService } from 'src/app/core/http.service';
import { LoadingComponent } from '@shared/components';
import { GroupByPipe } from './pipes/group-by.pipe';
import {
  ActiveTasksResponse,
  dashboardComponentModules,
  StorageKeys,
  TimeTrackingActionExtended,
  toMap,
} from '@shared/modules';
import { tap } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'ytt-dashboard',
  standalone: true,
  imports: [
    ...dashboardComponentModules,
    ActionDashboardCardComponent,
    LoadingComponent,
    GroupByPipe,
  ],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  private readonly destroyRef = inject(DestroyRef);
  private readonly httpservice = inject(HttpService);

  protected isLoading = signal(true);
  protected actions = signal<Map<string, TimeTrackingActionExtended>>(
    new Map<string, TimeTrackingActionExtended>(),
  );

  ngOnInit() {
    const settingActions = toMap(StorageKeys.TIME_TRACKING_ACTIONS);
    if (settingActions.size <= 0) {
      this.isLoading.set(false);
      return;
    }

    this.httpservice
      .get<ActiveTasksResponse>('/active-tasks', AUTH_TYPE.API_TOKEN)
      .pipe(
        tap(() => this.isLoading.set(false)),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe((response: ActiveTasksResponse) => {
        for (const settingAction of settingActions.values()) {
          this.actions.update((actions) => {
            actions.set(settingAction.id, {
              ...settingAction,
              isStarted:
                response.active_tasks.findIndex(
                  (activeTask: string) => settingAction.type === activeTask,
                ) != -1,
            });
            return new Map(actions);
          });
        }
      });
  }

  handleStateChanged(action: TimeTrackingActionExtended) {
    this.actions.update((actions) => {
      const a = actions.get(action.id);
      if (a) {
        a.isStarted = !action.isStarted;
      }
      return new Map(actions);
    });
  }
}
