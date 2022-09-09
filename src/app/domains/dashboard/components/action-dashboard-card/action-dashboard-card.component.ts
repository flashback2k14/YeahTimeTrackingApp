import { Component, Input } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';

import { HttpService } from 'src/app/core/http.service';
import {
  actionDashboardCardComponentModules,
  TimeTrackingAction,
} from '@shared/modules';

@Component({
  selector: 'ytt-action-dashboard-card',
  standalone: true,
  imports: actionDashboardCardComponentModules,
  templateUrl: './action-dashboard-card.component.html',
  styleUrls: ['./action-dashboard-card.component.scss'],
})
export class ActionDashboardCardComponent {
  @Input() action: TimeTrackingAction;
  @Input() isStarted: boolean;

  constructor(private _httpservice: HttpService) {
    this.action = {} as TimeTrackingAction;
    this.isStarted = false;
  }
  
  handleClick(): void {
    this._httpservice
      .create('/add', { type: this.action.type })
      .subscribe({
        next: () => {
          this.isStarted = !this.isStarted;
        },
        error: (error: HttpErrorResponse) => this._httpservice.showErrorResponse(error)
      })
  }
}