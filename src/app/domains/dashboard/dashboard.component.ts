import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

import { ActionDashboardCardComponent } from './components/action-dashboard-card/action-dashboard-card.component';
import { ActiveTasksResponse, StorageKeys, TimeTrackingActionExtended, toMap } from '@shared/modules';
import { AUTH_TYPE, HttpService } from 'src/app/core/http.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'ytt-dashboard',
  standalone: true,
  imports: [CommonModule, ActionDashboardCardComponent],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent {
  isLoading: boolean;
  actions: Map<string, TimeTrackingActionExtended>;

  constructor(private _httpservice: HttpService) {
    this.isLoading = true;
    this.actions = new Map<string, TimeTrackingActionExtended>();
    
    this._httpservice
      .get<ActiveTasksResponse>('/active-tasks', AUTH_TYPE.API_TOKEN)
      .subscribe({
        next: (response: ActiveTasksResponse) => {
          const settingActions = toMap(StorageKeys.TIME_TRACKING_ACTIONS);
          for (const settingAction of settingActions.values()) {  
            this.actions.set(settingAction.id, { 
                ...settingAction, 
                isStarted: response.active_tasks.findIndex((activeTask: string) => 
                  settingAction.type === activeTask) != -1
              }
            );
          }
        },
        error: (error: HttpErrorResponse) => this._httpservice.showErrorResponse(error),
        complete: () => this.isLoading = false
      })
  }
}