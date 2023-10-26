import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'ytt-loading',
  template: `<div class="loading-container">
    <div class="lds-ripple">
      <div></div>
      <div></div>
    </div>
    <ng-content></ng-content>
  </div>`,
  styleUrls: ['./loading.component.scss'],
  standalone: true,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoadingComponent {}
