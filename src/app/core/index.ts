import { makeEnvironmentProviders } from '@angular/core';

import { AuthService } from './auth.service';
import { HttpService } from './http.service';
import { NotificationService } from './notification.service';

export function provideServices() {
  return makeEnvironmentProviders([
    AuthService,
    HttpService,
    NotificationService,
  ]);
}
