import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  OnInit,
  ViewChild,
  computed,
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
  private readonly triggerPaging$ = new Subject<PageEvent>();

  private data = signal([] as HistoryItem[]);
  private pageStart = signal(0);
  private pageEnd = signal(0);
  private nextCursor = signal<string | undefined>(undefined);

  protected displayedColumns = signal([
    'index',
    'modified',
    'type',
    'state',
    'duration',
    'comment',
  ]);
  protected isLoading = signal(false);

  // MatPaginator Inputs
  protected pageSize = 25;
  protected resultsLength = signal(0);
  protected pageSizeOptions: number[] = [5, 10, 25, 100];

  protected pagedData = computed(() => {
    const start = this.pageStart();
    const end = this.pageEnd();
    return this.data().slice(start, end);
  });

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  ngOnInit(): void {
    this.triggerLoad$
      .pipe(
        startWith(undefined),
        tap(() => this.isLoading.set(true)),
        switchMap(() =>
          this.httpService.get<HistoryResponse>(this.getUrl()).pipe(
            catchError((error) => throwError(() => error)),
            takeUntilDestroyed(this.destroyRef)
          )
        ),
        tap((data: HistoryResponse) => this.nextCursor.set(data.nextCursor)),
        tap((data: HistoryResponse) =>
          this.data.update((list) => {
            list.push(
              ...data.historyTasks.map((task: HistoryTask, index: number) =>
                HistoryItem.create(task, index)
              )
            );
            return list;
          })
        ),
        tap(() => this.resultsLength.set(this.data().length)),
        tap(() => this.resetPaging()),
        tap(() => this.isLoading.set(false)),
        catchError((err) => {
          this.isLoading.set(false);
          return throwError(() => err);
        }),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe();

    this.triggerPaging$
      .pipe(
        tap((event: PageEvent) => {
          const start = event.pageIndex * event.pageSize;
          const end = start + event.pageSize;

          this.pageStart.set(start);
          this.pageEnd.set(end);
        }),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe();
  }

  ngAfterViewInit(): void {
    this.sort?.sortChange
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(() => {
        this.resetPaging();
      });
  }

  handleLoadMore(): void {
    this.triggerLoad$.next();
  }

  handlePaging(event: PageEvent): void {
    this.triggerPaging$.next(event);
  }

  private resetPaging(): void {
    this.paginator.pageIndex = 0;

    this.pageStart.set(0);
    this.pageEnd.set(this.paginator.pageSize);
  }

  private getUrl(): string {
    const cursor = this.nextCursor();
    if (cursor) {
      return '/history-paged?cursor=' + cursor;
    }

    return '/history-paged';
  }
}
