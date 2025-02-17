import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { AdsComponent } from './components/ads/ads.component';
import { AuthGuard } from './guards/auth.guard';
import { ProfileComponent } from './components/profile/profile.component';
import { UsersComponent } from './components/users/users.component';
import { AdsAdminComponent } from './components/ads-admin/ads-admin.component';

export const routes: Routes = [
  {
    path: 'login', component: LoginComponent
  },
  {
    path: 'registration', component: RegistrationComponent
  },
  { 
    path: 'ads', component: AdsComponent, canActivate: [AuthGuard] 
  },
  {
    path: 'profile', component: ProfileComponent, canActivate: [AuthGuard] 
  },
  {
    path: 'users', component: UsersComponent, canActivate: [AuthGuard] 
  },
  {
    path: 'adsAdmin', component: AdsAdminComponent, canActivate: [AuthGuard] 
  },
];
