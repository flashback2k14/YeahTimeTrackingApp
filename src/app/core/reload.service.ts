import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

/**
 * 'settings' key temporary not needed
 */
export type ReloadRequest = 'dashboard' | 'history' | 'settings';

@Injectable()
export class ReloadService {
  private reloadRequest = new Subject<ReloadRequest>();
  public reloadRequest$ = this.reloadRequest.asObservable();

  public trigger(request: ReloadRequest) {
    this.reloadRequest.next(request);
  }
}
