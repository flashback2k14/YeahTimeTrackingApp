import { HttpErrorResponse } from '@angular/common/http';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatTableModule } from '@angular/material/table';

import { HistoryResponse, HistoryTask, HistoryItem } from './models';
import { HttpService } from 'src/app/core/http.service';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import {
  catchError,
  map,
  merge,
  of,
  startWith,
  switchMap,
  throwError,
} from 'rxjs';

@Component({
  selector: 'ytt-history',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatPaginatorModule, MatSortModule],
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss'],
})
export class HistoryComponent implements AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  displayedColumns: string[] = ['modified', 'state', 'duration', 'comment'];
  data: HistoryItem[] = [];
  resultsLength = 0;

  constructor(private _httpService: HttpService) {}

  ngAfterViewInit(): void {
    // If the user changes the sort order, reset back to the first page.
    this.sort.sortChange.subscribe(() => (this.paginator.pageIndex = 0));

    merge(this.sort.sortChange, this.paginator.page)
      .pipe(
        startWith({}),
        switchMap(() => {
          // TODO: API / notion only returns 100 items
          return this._httpService
            .get<HistoryResponse>('/history')
            .pipe(catchError(() => of(null)));
        }),
        map((data: HistoryResponse | null) => {
          // Flip flag to show that loading has finished.
          if (data === null) {
            return [];
          }

          // Only refresh the result length if there is new data. In case of rate
          // limit errors, we do not want to reset the paginator to zero, as that
          // would prevent users from re-triggering requests.
          this.resultsLength = data.historyTasks.length;
          return data.historyTasks;
        })
      )
      .subscribe(
        (data: HistoryTask[]) =>
          (this.data = data.map((task: HistoryTask) =>
            HistoryItem.create(task)
          ))
      );
  }
}