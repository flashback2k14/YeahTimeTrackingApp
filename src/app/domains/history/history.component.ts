import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';

import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

import { HistoryResponse, HistoryTask, HistoryItem } from './models';
import { RelativeTimePipe } from './pipes/relative-time.pipe';
import { HttpService } from 'src/app/core/http.service';

import { historyComponentModules } from '@shared/modules';
import { LoadingComponent } from '@shared/components';

// https://material.angular.io/components/table/examples
// https://www.youtube.com/watch?v=2oTyoD3qCog
// https://stackblitz.com/edit/angular-material-table-row-grouping?file=src%2Fapp%2Fapp.component.ts

@Component({
  selector: 'ytt-history',
  standalone: true,
  imports: [...historyComponentModules, RelativeTimePipe, LoadingComponent],
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss'],
})
export class HistoryComponent implements AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  displayedColumns: string[] = [
    'index',
    'modified',
    'type'
    'state',
    'duration',
    'comment',
  ];
  data: HistoryItem[] = [];
  pagedData: HistoryItem[] = [];

  // MatPaginator Inputs
  pageSize = 25;
  resultsLength = 0;
  pageSizeOptions: number[] = [5, 10, 25, 100];

  isLoading: boolean = false;

  constructor(private _httpService: HttpService) {
    this._load();
  }

  ngAfterViewInit(): void {
    this.sort.sortChange.subscribe(() => {
      this._resetPaging();
    });
  }

  handleReload(): void {
    this._load();
  }

  handlePaging(event: PageEvent): void {
    const start = event.pageIndex * event.pageSize;
    const end = start + event.pageSize;
    this.pagedData = this.data.slice(start, end);
  }

  private _load(): void {
    this.isLoading = true;
    this._httpService.get<HistoryResponse>('/history').subscribe({
      next: (data: HistoryResponse) => {
        this.resultsLength = data.historyTasks.length;

        this.data = data.historyTasks.map((task: HistoryTask, index: number) =>
          HistoryItem.create(task, index)
        );

        this._resetPaging();
      },
      error: (error: HttpErrorResponse) =>
        this._httpService.showErrorResponse(error),
      complete: () => (this.isLoading = false),
    });
  }

  private _resetPaging(): void {
    this.paginator.pageIndex = 0;
    this.pagedData = this.data.slice(0, this.paginator.pageSize);
  }
}