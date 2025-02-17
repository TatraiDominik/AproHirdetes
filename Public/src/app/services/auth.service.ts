import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http'; // Ezt hozzáadjuk
import { Observable } from 'rxjs'; // Ezt is hozzáadjuk
import { tap } from 'rxjs/operators'; // A 'tap' operátor importálása

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private server = 'http://localhost:3000/api'; // API alap URL, amihez hozzáférsz a login kérésekhez

  constructor(private http: HttpClient) {}

  private isLoggedInSubject = new BehaviorSubject<boolean>(this.getToken() !== null);
  isLoggedIn$ = this.isLoggedInSubject.asObservable();

  private userIdSubject = new BehaviorSubject<string | null>(this.getUserId());
  userId$ = this.userIdSubject.asObservable();

  private userNameSubject = new BehaviorSubject<string | null>(this.getUserName());
  userName$ = this.userNameSubject.asObservable();

  private userEmailSubject = new BehaviorSubject<string | null>(this.getUserEmail());
  userEmail$ = this.userEmailSubject.asObservable();

  // Token mentése a localStorage-ba
  setToken(token: string) {
    if (typeof window !== 'undefined') {
      localStorage.setItem('token', token);
      this.isLoggedInSubject.next(true);
      this.triggerAuthUpdate(); 
    }
  }

  // Token lekérése
  getToken(): string | null {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('token');
    }
    return null;
  }

  // Felhasználói adatok mentése (id, name, email)
  setUserData(userId: string, name: string, email: string) {
    if (typeof window !== 'undefined') {
      console.log("Felhasználói adatok mentése:", { userId, name, email });
      localStorage.setItem('userId', userId);
      localStorage.setItem('username', name);
      localStorage.setItem('useremail', email);
      this.userIdSubject.next(userId);
      this.userNameSubject.next(name);
      this.userEmailSubject.next(email);
    }
  }

  // Felhasználó neve lekérése
  getUserName(): string | null {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('username');
    }
    return null;
  }

  // Felhasználó emailje lekérése
  getUserEmail(): string | null {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('useremail');
    }
    return null;
  }

  // Ellenőrzi, hogy be van-e jelentkezve
  isLoggedIn(): boolean {
    return this.getToken() !== null;
  }

  // Admin státusz ellenőrzése (ha admin státuszt kell kezelni, ezt később bővítheted)
  isAdmin(): boolean {
    return this.getUserName() === 'admin';
  }

  // Kilépés (logout)
  logout() {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('token');
      localStorage.removeItem('userId');
      localStorage.removeItem('username');
      localStorage.removeItem('useremail');
      this.isLoggedInSubject.next(false);
      this.userNameSubject.next(null);
      this.triggerAuthUpdate(); 
    }
  }

  // Bejelentkezés
  login(userData: { email: string; password: string }): Observable<any> {
    return this.http.post(`${this.server}/user/login`, userData).pipe(
      tap((response: any) => {
        // Token mentése
        this.setToken(response.token);

        // API válaszból való adatok kinyerése
        const userId = response.user?.id;  // Az id-t használjuk
        const userName = response.user?.name;
        const userEmail = response.user?.email;

        console.log("Kapott felhasználói adatok:", { userId, userName, userEmail });

        // Ha az adatok elérhetők, elmentjük őket
        if (userId && userName && userEmail) {
          this.setUserData(userId, userName, userEmail);
        }
      })
    );
  }

  // Felhasználói ID lekérése
  getUserId(): string | null {
    if (typeof window !== 'undefined') {
      const userId = localStorage.getItem('userId');
      console.log("Lekért userId a localStorage-ból:", userId);
      return userId;
    }
    return null;
  }

  // JWT token dekódolása (nem szükséges a felhasználói adatokat az autentikációs folyamatban használni, mivel a szerver küldi vissza őket)
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
    this.userEmailSubject.next(this.getUserEmail());
  }
}
