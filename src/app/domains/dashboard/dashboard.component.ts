import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';

import { ActionDashboardCardComponent } from './components/action-dashboard-card/action-dashboard-card.component';
import { LoadingComponent } from 'src/app/shared/components/loading/loading.component';
import { AUTH_TYPE, HttpService } from 'src/app/core/http.service';
import {
  ActiveTasksResponse,
  dashboardComponentModules,
  StorageKeys,
  TimeTrackingActionExtended,
  toMap,
} from '@shared/modules';

@Component({
  selector: 'ytt-dashboard',
  standalone: true,
  imports: [
    ...dashboardComponentModules,
    ActionDashboardCardComponent,
    LoadingComponent,
  ],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent {
  isLoading: boolean;
  actions: Map<string, TimeTrackingActionExtended>;

  constructor(private _httpservice: HttpService) {
    this.isLoading = true;
    this.actions = new Map<string, TimeTrackingActionExtended>();

    const settingActions = toMap(StorageKeys.TIME_TRACKING_ACTIONS);
    if (settingActions.size <= 0) {
      this.isLoading = false;
      return;
    }

    this._httpservice
      .get<ActiveTasksResponse>('/active-tasks', AUTH_TYPE.API_TOKEN)
      .subscribe({
        next: (response: ActiveTasksResponse) => {
          for (const settingAction of settingActions.values()) {
            this.actions.set(settingAction.id, {
              ...settingAction,
              isStarted:
                response.active_tasks.findIndex(
                  (activeTask: string) => settingAction.type === activeTask
                ) != -1,
            });
          }
        },
        error: (error: HttpErrorResponse) =>
          this._httpservice.showErrorResponse(error),
        complete: () => (this.isLoading = false),
      });
  }
}