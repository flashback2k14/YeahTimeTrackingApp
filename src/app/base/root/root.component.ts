import { DomSanitizer } from '@angular/platform-browser';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { MatIconRegistry } from '@angular/material/icon';

import { AuthService } from 'src/app/core/auth.service';
import { rootComponentModules } from '@shared/modules';

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
  title: string;
  links: Link[];

  constructor(
    protected authService: AuthService,
    private _router: Router,
    private _iconRegistry: MatIconRegistry,
    private _sanitizer: DomSanitizer
  ) {
    this.title = 'Yeah! Time tracking';
    this.links = [
      { href: 'dashboard', title: 'Dashboard' },
      { href: 'history', title: 'History' },
      { href: 'settings', title: 'Settings' },
    ];

    this._initIcons();
  }

  goToHome(): void {
    this._router.navigate([this.links[0].href]);
  }

  private _initIcons(): void {
    this._iconRegistry.addSvgIcon(
      'download',
      this._sanitizer.bypassSecurityTrustResourceUrl(
        '../assets/svg/cloud-download-outline.svg'
      )
    );

    this._iconRegistry.addSvgIcon(
      'upload',
      this._sanitizer.bypassSecurityTrustResourceUrl(
        '../assets/svg/cloud-upload-outline.svg'
      )
    );

    this._iconRegistry.addSvgIcon(
      'save',
      this._sanitizer.bypassSecurityTrustResourceUrl(
        '../assets/svg/content-save-outline.svg'
      )
    );

    this._iconRegistry.addSvgIcon(
      'no-data',
      this._sanitizer.bypassSecurityTrustResourceUrl(
        '../assets/svg/database-off-outline.svg'
      )
    );

    this._iconRegistry.addSvgIcon(
      'delete',
      this._sanitizer.bypassSecurityTrustResourceUrl(
        '../assets/svg/delete-outline.svg'
      )
    );

    this._iconRegistry.addSvgIcon(
      'edit',
      this._sanitizer.bypassSecurityTrustResourceUrl(
        '../assets/svg/pencil-outline.svg'
      )
    );

    this._iconRegistry.addSvgIcon(
      'play',
      this._sanitizer.bypassSecurityTrustResourceUrl(
        '../assets/svg/timer-play-outline.svg'
      )
    );

    this._iconRegistry.addSvgIcon(
      'stop',
      this._sanitizer.bypassSecurityTrustResourceUrl(
        '../assets/svg/timer-stop-outline.svg'
      )
    );

    this._iconRegistry.addSvgIcon(
      'reload',
      this._sanitizer.bypassSecurityTrustResourceUrl('../assets/svg/reload.svg')
    );
  }
}