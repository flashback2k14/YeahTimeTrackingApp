import { enableProdMode, importProvidersFrom } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';

import { RootComponent } from './app/base/root/root.component';
import { APP_ROUTES } from './app/app.routes';
import { API_BASE_URL } from './app/shared';

import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}

bootstrapApplication(RootComponent, {
  providers: [
    importProvidersFrom(RouterModule.forRoot(APP_ROUTES)),
    importProvidersFrom(BrowserModule),
    importProvidersFrom(BrowserAnimationsModule),
    {
      provide: API_BASE_URL,
      useValue: environment.apiBaseUrl,
    },
  ],
});