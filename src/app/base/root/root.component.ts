import { Component } from '@angular/core';
import { rootComponentModules } from '@shared/modules';

type Link = {
  href: string;
  title: string;
};

@Component({
  selector: 'ytt-root',
  standalone: true,
  imports: [...rootComponentModules],
  templateUrl: './root.component.html',
  styleUrls: ['./root.component.scss'],
})
export class RootComponent {
  title = 'Yeah! Time tracking';

  links: Link[];

  constructor() {
    this.links = [
      { href: 'dashboard', title: 'Dashboard' },
      { href: 'history', title: 'History' },
      { href: 'settings', title: 'Settings' },
    ];
  }
}