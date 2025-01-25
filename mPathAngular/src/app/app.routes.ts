import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RecommendationComponent } from './recommendation/recommendation.component';

export const routes: Routes = [
    {
        path: '',
        title: 'Home Page',
        component: HomeComponent,
    },
    {
        path: '/login',
        title: 'Login Page',
        component: LoginComponent,
    },
    {
        path: '/recommendation',
        title: 'Recommendation Page',
        component: RecommendationComponent,
    },
];
