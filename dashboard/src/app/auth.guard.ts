// auth.guard.ts
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenticationService } from './authentication.service';
import { take, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthenticationService, private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    return this.authService.isAuthenticated$.pipe(
      take(1), // take only the first value emitted
      map((isAuthenticated) => {
        if (isAuthenticated) {
          return true;
        } else {
          // Redirect to the login page if not authenticated
          this.router.navigate(['/login']);
          return false;
        }
      })
    );
  }
}