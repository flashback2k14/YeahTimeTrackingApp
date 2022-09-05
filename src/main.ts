import { enableProdMode, importProvidersFrom } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { bootstrapApplication } from '@angular/platform-browser';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { MatSnackBarModule } from '@angular/material/snack-bar';

import { RootComponent } from './app/base/root/root.component';
import { environment } from './environments/environment';
import { APP_ROUTES } from './app/app.routes';
import { API_BASE_URL } from './app/shared';

if (environment.production) {
  enableProdMode();
}

bootstrapApplication(RootComponent, {
  providers: [
    {
      provide: API_BASE_URL,
      useValue: environment.apiBaseUrl,
    },
    importProvidersFrom(RouterModule.forRoot(APP_ROUTES)),
    importProvidersFrom(BrowserModule),
    importProvidersFrom(BrowserAnimationsModule),
    importProvidersFrom(HttpClientModule),
    importProvidersFrom(MatSnackBarModule),
  ],
});