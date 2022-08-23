import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTabsModule } from '@angular/material/tabs';
import { CommonModule } from '@angular/common';

type Link = {
  href: string;
  title: string;
};

@Component({
  selector: 'ytt-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatToolbarModule,
    MatTabsModule,
    MatIconModule,
    MatButtonModule,
  ],
  templateUrl: './root.component.html',
  styleUrls: ['./root.component.scss'],
})
export class RootComponent {
  title = 'Yeah! Time tracking';

  links: Link[];

  constructor() {
    this.links = [
      { href: 'dashboard', title: 'Dashboard' },
      { href: 'settings', title: 'Settings' },
    ];
  }
}