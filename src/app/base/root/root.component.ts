import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'ytt-root',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './root.component.html',
  styleUrls: ['./root.component.scss'],
})
export class RootComponent {
  title = 'YeahTimeTrackingApp';
}