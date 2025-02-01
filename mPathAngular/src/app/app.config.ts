import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, provideHttpClient, withFetch, withInterceptorsFromDi } from '@angular/common/http';
import { importProvidersFrom } from '@angular/core';
import { AuthInterceptor } from './interceptors/auth.interceptor'; // Your custom interceptor
import { HttpClientModule } from '@angular/common/http';
export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes), provideClientHydration(withEventReplay()),
  importProvidersFrom(HttpClientModule), // Make sure HttpClientModule is added here
  { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }, // Register your interceptor
  provideHttpClient(
    withFetch(),
    withInterceptorsFromDi()) // Automatically apply all interceptors from DI
  ]
};
