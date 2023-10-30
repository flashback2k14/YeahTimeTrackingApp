import { DomSanitizer } from '@angular/platform-browser';
import { Component, DestroyRef, OnInit, inject, signal } from '@angular/core';
import { Router } from '@angular/router';

import { MatIconRegistry } from '@angular/material/icon';

import { AuthService } from 'src/app/core/auth.service';
import { rootComponentModules } from '@shared/modules';
import { TranslocoService } from '@ngneat/transloco';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

type Link = {
  href: string;
  title: string;
};

@Component({
  selector: 'ytt-root',
  templateUrl: './root.component.html',
  styleUrls: ['./root.component.scss'],
  standalone: true,
  imports: rootComponentModules,
})
export class RootComponent implements OnInit {
  private readonly destroyRef = inject(DestroyRef);
  private readonly iconRegistry = inject(MatIconRegistry);
  private readonly router = inject(Router);
  private readonly sanitizer = inject(DomSanitizer);
  private readonly translator = inject(TranslocoService);

  protected authService = inject(AuthService);

  protected title = signal('Yeah! Time tracking');
  protected links = signal<Link[]>([]);

  ngOnInit(): void {
    this.translator
      .selectTranslation()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((value) => {
        this.links.set([
          {
            href: 'dashboard',
            title: value['nav.dashboard'],
          },
          {
            href: 'history',
            title: value['nav.history'],
          },
          {
            href: 'settings',
            title: value['nav.settings'],
          },
        ]);
      });

    this._initIcons();
  }

  goToHome(): void {
    this.router.navigate([this.links()[0].href]);
  }

  private _initIcons(): void {
    this.iconRegistry.addSvgIcon(
      'download',
      this.sanitizer.bypassSecurityTrustResourceUrl(
        '../assets/svg/cloud-download-outline.svg'
      )
    );

    this.iconRegistry.addSvgIcon(
      'upload',
      this.sanitizer.bypassSecurityTrustResourceUrl(
        '../assets/svg/cloud-upload-outline.svg'
      )
    );

    this.iconRegistry.addSvgIcon(
      'save',
      this.sanitizer.bypassSecurityTrustResourceUrl(
        '../assets/svg/content-save-outline.svg'
      )
    );

    this.iconRegistry.addSvgIcon(
      'no-data',
      this.sanitizer.bypassSecurityTrustResourceUrl(
        '../assets/svg/database-off-outline.svg'
      )
    );

    this.iconRegistry.addSvgIcon(
      'delete',
      this.sanitizer.bypassSecurityTrustResourceUrl(
        '../assets/svg/delete-outline.svg'
      )
    );

    this.iconRegistry.addSvgIcon(
      'edit',
      this.sanitizer.bypassSecurityTrustResourceUrl(
        '../assets/svg/pencil-outline.svg'
      )
    );

    this.iconRegistry.addSvgIcon(
      'play',
      this.sanitizer.bypassSecurityTrustResourceUrl(
        '../assets/svg/timer-play-outline.svg'
      )
    );

    this.iconRegistry.addSvgIcon(
      'stop',
      this.sanitizer.bypassSecurityTrustResourceUrl(
        '../assets/svg/timer-stop-outline.svg'
      )
    );

    this.iconRegistry.addSvgIcon(
      'reload',
      this.sanitizer.bypassSecurityTrustResourceUrl('../assets/svg/reload.svg')
    );
  }
}
