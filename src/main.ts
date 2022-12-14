import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { enableProdMode, importProvidersFrom } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { ServiceWorkerModule } from '@angular/service-worker';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { MatSnackBarModule } from '@angular/material/snack-bar';

import { RootComponent } from './app/base/root/root.component';
import { environment } from './environments/environment';
import { API_BASE_URL, APP_VERSION } from './app/shared';
import { APP_ROUTES } from './app/app.routes';

if (environment.production) {
  enableProdMode();
}

bootstrapApplication(RootComponent, {
  providers: [
    {
      provide: API_BASE_URL,
      useValue: environment.apiBaseUrl,
    },
    {
      provide: APP_VERSION,
      useValue: environment.appVersion,
    },
    importProvidersFrom(RouterModule.forRoot(APP_ROUTES)),
    importProvidersFrom(BrowserModule),
    importProvidersFrom(BrowserAnimationsModule),
    importProvidersFrom(HttpClientModule),
    importProvidersFrom(MatSnackBarModule),
    importProvidersFrom(
      ServiceWorkerModule.register('ngsw-worker.js', {
        enabled: environment.production,
        // Register the ServiceWorker as soon as the application is stable
        // or after 30 seconds (whichever comes first).
        registrationStrategy: 'registerWhenStable:30000',
      })
    ),
  ],
});