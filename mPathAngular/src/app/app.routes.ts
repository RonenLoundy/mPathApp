import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from "./register/register.component";
import { PatientsComponent } from "./patients/patients.component";
import { PatientdetailsComponent } from "./patientdetails/patientdetails.component";

export const routes: Routes = [
    {
        path: '',
        title: 'Home Page',
        component: HomeComponent,
    },
    {
        path: 'login',
        title: 'Login Page',
        component: LoginComponent,
    },
    {
        path: 'register',
        title: 'Registration Page',
        component: RegisterComponent,
    },
    {
        path: 'patients',
        title: 'Patients Page',
        component: PatientsComponent,
    },
    {
        path: 'patients/:id',
        title: 'Patient Page',
        component: PatientdetailsComponent
    },
];
