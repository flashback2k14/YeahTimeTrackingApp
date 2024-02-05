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
import { tap, filter } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ReloadRequest, ReloadService } from 'src/app/core/reload.service';

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
  private readonly reloadService = inject(ReloadService);

  protected isLoading = signal(true);
  protected actions = signal<Map<string, TimeTrackingActionExtended>>(
    new Map<string, TimeTrackingActionExtended>(),
  );

  ngOnInit() {
    this.reloadService.reloadRequest$
      .pipe(
        filter((request: ReloadRequest) => request === 'dashboard'),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe(() => this.load());

    this.load();
  }

  handleStateChanged(action: TimeTrackingActionExtended) {
    this.actions.update((actions) => {
      const foundAction = actions.get(action.id);
      if (foundAction) {
        foundAction.isStarted = !action.isStarted;
      }
      return new Map(actions);
    });
  }

  private load(): void {
    this.isLoading.set(true);

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
}
