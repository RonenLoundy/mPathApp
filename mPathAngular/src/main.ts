import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { enableProdMode } from '@angular/core';
import { provideRouter } from '@angular/router';
import { RegisterComponent } from './app/register/register.component'; // Path to the Register Component
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

enableProdMode();

bootstrapApplication(AppComponent, appConfig).catch((err) => console.error(err));
