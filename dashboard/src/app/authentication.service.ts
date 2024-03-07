// authentication.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);
  isAuthenticated$ = this.isAuthenticatedSubject.asObservable();
  private apiUrl = 'http://localhost:8080/api';


  // private apiUrl = 'https://360coder.com/node/api'





  constructor(private http: HttpClient) {
    // Initialize the authentication state based on the stored token
    this.isAuthenticatedSubject.next(this.getToken() !== null);
  }

  loginUser(credentials: { email: string; password: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, credentials).pipe(
      tap((res: any) => {
        if (res?.data?.role === 'admin' || res?.data?.role === 'instructor' && res?.token) {
          this.setToken(res.token);
          this.isAuthenticatedSubject.next(true); // User is authenticated
        } else {
          this.isAuthenticatedSubject.next(false); // User is not authenticated
        }
      })
    );
  }

  setToken(token: string | null): void {
    // Your implementation to store the token (e.g., in local storage)
    localStorage.setItem('authToken', token);
  }

  getToken(): string | null {
    // Your implementation to retrieve the token (e.g., from local storage)
    return localStorage.getItem('authToken');
  }

  // Other authentication-related methods...

  logout(): void {
    // Clear the token and update the authentication state
    this.setToken(null);
    this.isAuthenticatedSubject.next(false);
  }
}
