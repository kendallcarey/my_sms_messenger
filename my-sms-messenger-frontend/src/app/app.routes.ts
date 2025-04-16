import { Routes } from '@angular/router';
import {LoginFormComponent} from './forms/login-form/login-form.component';
import {HomeComponent} from './components/home/home.component';
import {RegisterFormComponent} from './components/register/register-form.component';
import {AuthGuard} from './auth.guard';

export const routes: Routes = [
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'auth/login', component: LoginFormComponent },
  { path: 'auth/register', component: RegisterFormComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full'},
];
