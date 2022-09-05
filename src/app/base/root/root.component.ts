import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { rootComponentModules } from '@shared/modules';
import { AuthService } from 'src/app/core/auth.service';

type Link = {
  href: string;
  title: string;
};

@Component({
  selector: 'ytt-root',
  standalone: true,
  imports: rootComponentModules,
  templateUrl: './root.component.html',
  styleUrls: ['./root.component.scss'],
})
export class RootComponent {
  title = 'Yeah! Time tracking';

  links: Link[];

  constructor(protected authService: AuthService, private _router: Router) {
    this.links = [
      { href: 'dashboard', title: 'Dashboard' },
      { href: 'history', title: 'History' },
      { href: 'settings', title: 'Settings' },
    ];
  }

  goToHome(): void {
    this._router.navigate([this.links[0].href]);
  }
}