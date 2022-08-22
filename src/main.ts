import { enableProdMode, importProvidersFrom } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';

import { APP_ROUTES } from './app/app.routes';
import { RootComponent } from './app/base/root/root.component';

import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}

bootstrapApplication(RootComponent, {
  providers: [
    importProvidersFrom(RouterModule.forRoot(APP_ROUTES)),
    importProvidersFrom(BrowserModule),
    importProvidersFrom(BrowserAnimationsModule),
  ],
});