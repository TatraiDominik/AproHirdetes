import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { AdsComponent } from './components/ads/ads.component';

export const routes: Routes = [
  {
    path: 'login', component: LoginComponent
  },
  {
    path: 'registration', component: RegistrationComponent
  },
  {
    path: '', redirectTo: '', pathMatch: 'full'
  },
  {
    path: 'ads', component: AdsComponent
  },
];
