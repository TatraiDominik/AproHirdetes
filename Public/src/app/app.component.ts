import { CommonModule } from '@angular/common';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { AuthService } from './services/auth.service';
import { Subscription } from 'rxjs';

interface MenuItem {
  icon: string;
  label: string;
  routerLink: string;
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterModule, CommonModule, MatButtonModule, MatIconModule, MatMenuModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'Public';
  items: MenuItem[] = [];
  private authSubscription!: Subscription;
  private userSubscription!: Subscription;

  constructor(private authService: AuthService, public router: Router) {}

  ngOnInit() {
    this.authSubscription = this.authService.isLoggedIn$.subscribe(() => {
      this.updateMenu();
    });

    this.userSubscription = this.authService.userRole$.subscribe(() => {
      this.updateMenu();
    });

    this.updateMenu();
    
  }

  updateMenu() {
    const isLoggedIn = this.authService.isLoggedIn();
    const isAdmin = this.authService.isAdmin();

    this.items = [
      !isLoggedIn ? { icon: 'login', label: 'Bejelentkezés', routerLink: '/login' } : null,
      !isLoggedIn ? { icon: 'person_add', label: 'Regisztráció', routerLink: '/register' } : null,
      isLoggedIn ? { icon: 'view_list', label: 'Hirdetések', routerLink: '/ads' } : null,
      isLoggedIn ? { icon: 'person', label: 'Profil', routerLink: '/profile' } : null,
      isAdmin ? { icon: 'group', label: 'Felhasználók', routerLink: '/users' } : null,
      isAdmin ? { icon: 'business', label: 'Admin Hirdetések', routerLink: '/admin_ads' } : null,
      isLoggedIn ? { icon: 'logout', label: 'Kijelentkezés', routerLink: '' } : null
    ].filter(item => item !== null) as MenuItem[];
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
    this.updateMenu();
  }

  ngOnDestroy() {
    if (this.authSubscription) this.authSubscription.unsubscribe();
    if (this.userSubscription) this.userSubscription.unsubscribe();
  }
}
