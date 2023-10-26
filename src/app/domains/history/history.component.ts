import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  OnInit,
  ViewChild,
  inject,
  signal,
} from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';

import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

import { HistoryResponse, HistoryTask, HistoryItem } from './models';
import { RelativeTimePipe } from './pipes/relative-time.pipe';
import { HttpService } from 'src/app/core/http.service';

import { historyComponentModules } from '@shared/modules';
import { LoadingComponent } from '@shared/components';
import {
  Subject,
  catchError,
  startWith,
  switchMap,
  tap,
  throwError,
} from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

// https://material.angular.io/components/table/examples
// https://www.youtube.com/watch?v=2oTyoD3qCog
// https://stackblitz.com/edit/angular-material-table-row-grouping?file=src%2Fapp%2Fapp.component.ts

@Component({
  selector: 'ytt-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss'],
  standalone: true,
  imports: [...historyComponentModules, RelativeTimePipe, LoadingComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HistoryComponent implements AfterViewInit, OnInit {
  private readonly destroyRef = inject(DestroyRef);
  private readonly httpService = inject(HttpService);

  private readonly triggerLoad$ = new Subject<void>();

  protected displayedColumns = signal([
    'index',
    'modified',
    'type',
    'state',
    'duration',
    'comment',
  ]);
  protected data = signal([] as HistoryItem[]);
  protected pagedData = signal([] as HistoryItem[]);
  protected isLoading = signal(false);

  // MatPaginator Inputs
  protected pageSize = 25;
  protected resultsLength = 0;
  protected pageSizeOptions: number[] = [5, 10, 25, 100];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  ngOnInit(): void {
    this.triggerLoad$
      .pipe(
        startWith(''),
        tap(() => this.isLoading.set(true)),
        switchMap(() =>
          this.httpService.get<HistoryResponse>('/history').pipe(
            catchError((error) => throwError(() => error)),
            takeUntilDestroyed(this.destroyRef)
          )
        ),
        tap(() => this.isLoading.set(false)),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe({
        next: (data: HistoryResponse) => {
          this.resultsLength = data.historyTasks.length;

          this.data.set(
            data.historyTasks.map((task: HistoryTask, index: number) =>
              HistoryItem.create(task, index)
            )
          );

          this._resetPaging();
        },
        error: (error: HttpErrorResponse) =>
          this.httpService.showErrorResponse(error),
      });
  }

  ngAfterViewInit(): void {
    this.sort.sortChange.subscribe(() => {
      this._resetPaging();
    });
  }

  handleReload(): void {
    this.triggerLoad$.next();
  }

  handlePaging(event: PageEvent): void {
    const start = event.pageIndex * event.pageSize;
    const end = start + event.pageSize;
    this.pagedData.set(this.data().slice(start, end));
  }

  private _resetPaging(): void {
    this.paginator.pageIndex = 0;
    this.pagedData.set(this.data().slice(0, this.paginator.pageSize));
  }
}
