import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private server = 'http://localhost:3001/api'; 

  constructor(private http: HttpClient) {}

  private isLoggedInSubject = new BehaviorSubject<boolean>(this.getToken() !== null);
  isLoggedIn$ = this.isLoggedInSubject.asObservable();

  private userIdSubject = new BehaviorSubject<string | null>(this.getUserId());
  userId$ = this.userIdSubject.asObservable();

  private userNameSubject = new BehaviorSubject<string | null>(this.getUserName());
  userName$ = this.userNameSubject.asObservable();

  private userAddressSubject = new BehaviorSubject<string | null>(this.getUserAddress());
  userAddress$ = this.userAddressSubject.asObservable(); 

  private emailSubject = new BehaviorSubject<string | null>(this.getUserEmail()); 
  userEmail$ = this.emailSubject.asObservable();

  private roleSubject = new BehaviorSubject<string | null>(this.getUserRole()); 
  userRole$ = this.roleSubject.asObservable();

  setToken(token: string) {
    if (typeof window !== 'undefined') {
      localStorage.setItem('token', token);
      this.isLoggedInSubject.next(true);
      this.triggerAuthUpdate(); 
    }
  }

  getToken(): string | null {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('token');
    }
    return null;
  }

  setUserData(userId: string, name: string, address: string, email: string, role: string) {
    if (typeof window !== 'undefined') {
      console.log("Felhasználói adatok mentése:", { userId, name, address, email, role });
      localStorage.setItem('userId', userId);
      localStorage.setItem('username', name);
      localStorage.setItem('userAddress', address);
      localStorage.setItem('email', email);
      localStorage.setItem('role', role);  
      this.userIdSubject.next(userId);
      this.userNameSubject.next(name);
      this.userAddressSubject.next(address);
      this.emailSubject.next(email);
      this.roleSubject.next(role);
    }
  }

  getUserName(): string | null {
    return typeof window !== 'undefined' ? localStorage.getItem('username') : null;
  }

  getUserAddress(): string | null { 
    return typeof window !== 'undefined' ? localStorage.getItem('userAddress') : null;
  }

  getUserEmail(): string | null { 
    return typeof window !== 'undefined' ? localStorage.getItem('email') : null;
  }

  getUserRole(): string | null { 
    return typeof window !== 'undefined' ? localStorage.getItem('role') : null;
  }

  isLoggedIn(): boolean {
    return this.getToken() !== null;
  }

  isAdmin(): boolean {
    return this.getUserRole() === 'admin';
  }

  logout() {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('token');
      localStorage.removeItem('userId');
      localStorage.removeItem('username');
      localStorage.removeItem('userAddress');
      localStorage.removeItem('email');
      localStorage.removeItem('role');
      this.isLoggedInSubject.next(false);
      this.userNameSubject.next(null);
      this.userAddressSubject.next(null);
      this.emailSubject.next(null);
      this.roleSubject.next(null);
      this.triggerAuthUpdate(); 
    }
  }

  login(userData: { email: string; password: string }): Observable<any> {
    return this.http.post(`${this.server}/user/login`, userData).pipe(
      tap((response: any) => {
        this.setToken(response.token);
  
        const userId = response.user?.id;
        const userName = response.user?.name;
        const userAddress = response.user?.address;
        const userEmail = response.user?.email; 
        const userRole = response.user?.role;  

        console.log("Kapott felhasználói adatok:", { userId, userName, userAddress, userEmail, userRole });

        if (userId && userName && userAddress && userEmail && userRole) { 
          this.setUserData(userId, userName, userAddress, userEmail, userRole);
        }
      })
    );
  }

  register(userData: { name: string; email: string; password: string; address: string }): Observable<any> {
    return this.http.post(`${this.server}/user/register`, userData).pipe(
      tap((response: any) => {
        console.log("Regisztráció sikeres:", response);

        if (response.token) {
          this.setToken(response.token);
          this.setUserData(response.user.userID, response.user.name, response.user.address, response.user.email, response.user.role);
        }
      })
    );
  }

  getUserId(): string | null {
    return typeof window !== 'undefined' ? localStorage.getItem('userId') : null;
  }

  private decodeToken(token: string): any {
    try {
      const payload = token.split('.')[1];
      const decoded = atob(payload); 
      console.log("Dekódolt token:", decoded);  
      return JSON.parse(decoded); 
    } catch (error) {
      console.error('Hiba a token dekódolásakor:', error);
      return null;
    }
  }

  triggerAuthUpdate() {
    this.isLoggedInSubject.next(this.isLoggedIn());
    this.userNameSubject.next(this.getUserName());
    this.userAddressSubject.next(this.getUserAddress()); 
    this.emailSubject.next(this.getUserEmail()); 
    this.roleSubject.next(this.getUserRole()); 
  }
}
