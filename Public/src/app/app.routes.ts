import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { AdsComponent } from './components/ads/ads.component';
import { ProfileComponent } from './components/profile/profile.component';
import { UsersComponent } from './components/users/users.component';
import { AdminAdsComponent } from './components/admin-ads/admin-ads.component';
import { AuthGuard } from './guards/auth.guard';

export const routes: Routes = [
    // Unauthenticated user
    {path:'login', component:LoginComponent},
    {path:'register', component:RegisterComponent},
    // Authenticated user
    {path:'ads', component:AdsComponent, canActivate:[AuthGuard]},
    {path:'profile', component:ProfileComponent, canActivate:[AuthGuard]},
    // Admin
    {path:'users', component:UsersComponent, canActivate:[AuthGuard]},
    {path:'admin_ads', component:AdminAdsComponent, canActivate:[AuthGuard]}
];
